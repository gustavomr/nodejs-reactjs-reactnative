const mongoose = require("mongoose");
require("dotenv").config();
const Spot = new mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

Spot.virtual("thumbnail_url").get(function() {
  return process.env.HOST + ":" + process.env.PORT + `/files/${this.thumbnail}`;
});

module.exports = mongoose.model("Spot", Spot);
