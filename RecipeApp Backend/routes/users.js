const express = require("express");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

// JWT token creation 
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

// signup
router.post("/signup", async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;

  try {
    const newUser = await users.signup(firstName, lastName, userName, password);

    // create a token
    const token = createToken(newUser._id);

    res.status(200).json(userName, token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// login
router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const loggedUser = await users.login(userName, password);

    // create a token
    const token = createToken(loggedUser._id);

    res.status(200).json({ userName, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get one user by user id
router.post("user/:id", (req, res) => {});

module.exports = router;
