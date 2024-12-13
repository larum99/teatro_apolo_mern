const express = require('express');
const router = express.Router();
const { getOrGenerateShowtimes } = require('../controllers/showTimeController');
const { authMiddleware } = require('../middlewares/authMiddleware')

router.get('/:tmdbId', authMiddleware, getOrGenerateShowtimes);

module.exports = router;
