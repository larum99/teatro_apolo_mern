const express = require("express");
const { registerUser, loginUser, getAllUsers } = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/authMiddleware")
const router = express.Router();

module.exports = (connCinema) => {
  const User = connCinema.model("User", require("../models/User").schema);

  router.post("/register", (req, res) => registerUser(req, res, User));

  router.post("/login", (req, res) => loginUser(req, res, User));

  router.get("/", authMiddleware, (req, res) => getAllUsers(req, res, User));

  return router;
};
