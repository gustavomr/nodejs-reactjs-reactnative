const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { email, password } = req.body;
    let base64Pass = Buffer.from(password).toString("base64");

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, password: base64Pass });
    } else {
      return res.status(401).send({ message: "User already registered." });
    }
    var userObj = user.toObject();
    delete userObj.password;
    return res.json(userObj);
  }
};
