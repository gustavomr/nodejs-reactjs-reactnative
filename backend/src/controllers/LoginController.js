const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;

    let base64Pass = Buffer.from(password).toString("base64");

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: "User does not exist." });
    }
    if (user.password != base64Pass) {
      return res.status(401).send({ message: "Password does not match." });
    }
    var token = jwt.sign({ user: user }, process.env.SECRET_API, {
      expiresIn: 10000 // expires in 5min
    });
    user.token = token;
    var userObj = user.toObject();
    delete userObj.password;
    return res.json(userObj);
  },

  async verifyJWT(req, res, next) {
    let token = req.headers.authorization;

    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }

    if (!token) {
      return res
        .status(401)
        .send({ auth: false, message: "No token provided." });
    } else {
      jwt.verify(token, process.env.SECRET_API, function(err, decoded) {
        if (err) {
          if (err.message == "jwt expired") {
            return res
              .status(401)
              .send({ auth: false, message: "Token expired." });
          } else {
            return res
              .status(401)
              .send({ auth: false, message: "Failed to authenticate token." });
          }
        } else {
          next();
        }
      });
    }
  }
};
