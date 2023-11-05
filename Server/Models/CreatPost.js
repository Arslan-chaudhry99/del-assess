const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  model: {
    type: "string",
    require: true,
  },
  price: {
    type: "string",
    require: true,
  },
  phone: {
    type: "string",
    require: true,
  },
  location: {
    type: "string",
    require: true,
  },
  copies: {
    type: "string",
    require: true,
  },
  file: [],
});
const CreatPost = new mongoose.model("Post", PostSchema);
module.exports = CreatPost;
