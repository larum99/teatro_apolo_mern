const express = require('express');
const { getAvailableSeats, reserveSeat } = require('../controllers/seatController');
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/:roomName', authMiddleware, getAvailableSeats);

router.put('/reserve/:seatId', authMiddleware, reserveSeat);

module.exports = router;
