const mongoose = require("mongoose");
const Seat = require("../models/Seat");
const Room = require("../models/Room");

const getAvailableSeats = async (req, res) => {
  const roomName = req.params.roomName; // Aquí recibes "Sala 1"

  try {
    // Buscar el ObjectId de la sala por su nombre
    const room = await Room.findOne({ name: roomName });

    if (!room) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    // Buscar los asientos utilizando el ObjectId de la sala
    const availableSeats = await Seat.find({ room: room._id });

    res.json(availableSeats);
  } catch (error) {
    console.error("Error al obtener los asientos:", error);
    res.status(500).json({ message: "Error al obtener los asientos" });
  }
};

// Reservar un asiento
const reserveSeat = async (req, res) => {
  const { seatId } = req.params;

  try {
    console.log(`Buscando asiento ${seatId}`);

    const seat = await Seat.findById(seatId);
    if (!seat) {
      console.log("Asiento no encontrado.");
      return res.status(404).json({
        message: "Asiento no encontrado.",
      });
    }

    if (seat.status === "reserved") {
      console.log("El asiento ya está reservado.");
      return res
        .status(400)
        .json({ message: "Este asiento ya está reservado." });
    }

    seat.status = "reserved";
    await seat.save();

    console.log("Asiento reservado con éxito.");
    res.status(200).json({ message: "Asiento reservado con éxito.", seat });
  } catch (error) {
    console.error("Error al reservar el asiento:", error);
    res.status(500).json({ message: "Error al reservar el asiento." });
  }
};

module.exports = { getAvailableSeats, reserveSeat };
