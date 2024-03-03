const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const recipeRoute = require("./routes/recipes");
const userRoute = require("./routes/users");

const app = express();

// Midlleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  //   authentication
  console.log("Auth");
  next();
});


// routes
app.use("/api/recipes", authenticateToken ,recipeRoute);
app.use("/api/users", userRoute);

// connecting to db
mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });


// authentication of JWT Token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    if (token == null) {
      return res.status(403).json({
        status: false,
        err: "unauthorized access to the database",
      });
    }
  
    jwt.verify(token, process.env.SECRET, (err, userId) => {
      if (err) {
        return res.status(403).json({
          status: false,
          err: "unauthorized access to the database",
        });
      }
      req.userId = userId
      next()
    });
  }  
