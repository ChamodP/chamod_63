const mongoose = require("mongoose");
const user = require('./userModel')

const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    userID: {
      type: mongoose.ObjectId,
      ref: 'user',
      required: true,
    },
    ingredients: [
      {
        type: String,
      },
    ],
    // likes: { type: Number, default: 0 },
    timeToCook: { type: Number, required: true },
  },
  { timeseries: true }
);

module.exports = mongoose.model("recipe", recipeSchema);
