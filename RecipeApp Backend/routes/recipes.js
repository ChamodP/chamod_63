const express = require("express");
const users = require("../models/userModel");
const recipes = require("../models/recipeModel");

const router = express.Router();

// get all recipes
router.get("/", async (req, res) => {
  try {
    const allRecipes = await recipes.find({}).sort({createdAt: -1});
    res.status(200).json(allRecipes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// add new recipe
router.post("/add", async (req, res) => {
  const { Title, userID, ingredients, timeToCook } = req.body;

  try {
    const newRecipe = await recipes.create({
      Title,
      userID,
      ingredients,
      timeToCook,
    });
    res.status(200).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get all recipes by a user
router.post("/user/:id", (req, res) => {});

// get one recipe by recipe id
router.post("/:id", (req, res) => {});
module.exports = router;
