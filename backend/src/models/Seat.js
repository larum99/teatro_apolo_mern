const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  row: { type: String, required: true },
  number: { type: Number, required: true },
  status: { type: String, enum: ['available', 'occupied', 'reserved'], default: 'available' },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true }
});

module.exports = mongoose.model('Seat', seatSchema);
