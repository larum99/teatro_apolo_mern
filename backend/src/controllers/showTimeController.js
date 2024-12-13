
const ShowTime = require("../models/ShowTime");
const Room = require('../models/Room');

const getOrGenerateShowtimes = async (req, res) => {
    const { tmdbId } = req.params;

    try {
        let showtimes = await ShowTime.find({ movieId: tmdbId })
            .populate("roomId")
            .lean();

        if (showtimes.length === 0) {
            const defaultTimes = ["12:00", "15:00", "18:00", "21:00"];
            const today = new Date().toISOString().split("T")[0];

            const rooms = await Room.find();
            showtimes = [];

            rooms.forEach((room) => {
                defaultTimes.forEach((time) => {
                    showtimes.push({
                        movieId: tmdbId,
                        roomId: room._id,
                        showDate: today,
                        showTime: time,
                        seatsAvailable: room.capacity,
                    });
                });
            });

            await ShowTime.insertMany(showtimes);
        }

        const groupedByRoom = showtimes.reduce((acc, showtime) => {
            const roomName = showtime.roomId.name;
            if (!acc[roomName]) {
                acc[roomName] = [];
            }
            acc[roomName].push({
                _id: showtime._id,
                showDate: showtime.showDate,
                showTime: showtime.showTime,
                seatsAvailable: showtime.seatsAvailable,
            });
            return acc;
        }, {});

        res.status(200).json(groupedByRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al generar o recuperar horarios." });
    }
};

module.exports = { getOrGenerateShowtimes };
