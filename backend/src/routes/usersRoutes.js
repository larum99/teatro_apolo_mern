const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/userController");

const { authMiddleware } = require("../middlewares/authMiddleware");

const User = require("../models/User");

const router = express.Router();


router.post("/register", (req, res) =>
  registerUser(req, res, User)
);


router.post("/login", (req, res) =>
  loginUser(req, res, User)
);


router.get("/", authMiddleware, (req, res) =>
  getAllUsers(req, res, User)
);


module.exports = router;