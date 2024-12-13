const express = require('express');
const { createTicket } = require('../controllers/ticketController');
const { authMiddleware, verifyRole } = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/', authMiddleware, verifyRole(["user"]), createTicket);

module.exports = router;
