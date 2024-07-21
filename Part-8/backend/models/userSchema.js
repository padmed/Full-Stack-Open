const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const model = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 4,
  },
});

mongoose.plugin(uniqueValidator);
module.exports = mongoose.model("User", model);
