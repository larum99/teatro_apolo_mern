const mongoose = require('mongoose');

// Esquema de Ticket
const ticketSchema = new mongoose.Schema({
    movieTitle: { type: String, required: true },
    showtime: { type: String, required: true },
    seats: [{ type: String, required: true }],
    total: { type: Number, required: true },
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
