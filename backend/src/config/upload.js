const multer = require("multer");
const path = require("path");

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      filename1 = file.originalname.replace(/\s/g, "");
      const ext = path.extname(filename1);
      const name = path.basename(filename1, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    }
  })
};
