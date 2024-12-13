const express = require("express");
const { getAllRooms, getSeatsByRoom } = require("../controllers/roomController");
const { authMiddleware } = require("../middlewares/authMiddleware")

const router = express.Router();

router.get("/", authMiddleware, getAllRooms);
router.get("/:roomId/seats", authMiddleware, getSeatsByRoom);

module.exports = router;
