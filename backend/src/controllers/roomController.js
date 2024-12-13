const mongoose = require("mongoose");
const Room = require("../models/Room");
const Seat = require("../models/Seat");

// Obtener todas las salas
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al obtener las salas", error: err.message });
  }
};

// Crear una nueva sala
const createRoom = async (req, res) => {
  const { name, capacity } = req.body;

  try {
    const newRoom = new Room({ name, capacity });
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al crear la sala", error: err.message });
  }
};

// Obtener asientos de una sala específica
const getSeatsByRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    // Verifica que el ID sea válido
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res
        .status(400)
        .json({ message: "El ID de la sala no es válido." });
    }

    // Busca los asientos asociados a la sala
    const seats = await Seat.find({ room: new mongoose.Types.ObjectId(roomId) });

    if (seats.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron asientos para esta sala." });
    }

    res.status(200).json(seats);
  } catch (error) {
    console.error("Error en getSeatsByRoom:", error);
    res.status(500).json({ message: "Error al obtener los asientos.", error: error.message });
  }
};

module.exports = { getAllRooms, createRoom, getSeatsByRoom };
