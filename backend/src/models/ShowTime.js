const mongoose = require('mongoose');

const showTimeSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  showDate: { type: String, required: true },
  showTime: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
});

module.exports = mongoose.model('ShowTime', showTimeSchema);
