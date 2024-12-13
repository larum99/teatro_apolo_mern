const Ticket = require('../models/Ticket');

// Función para crear un ticket
const createTicket = async (req, res) => {
    const { movieTitle, showtime, seats, total } = req.body;

    try {
        // Verificar que todos los campos necesarios estén presentes
        if (!movieTitle || !showtime || !seats || !total) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Crear un nuevo ticket con los datos recibidos
        const newTicket = new Ticket({
            movieTitle,
            showtime,
            seats,
            total,
        });

        // Guardar el ticket en la base de datos
        await newTicket.save();

        // Responder con éxito
        res.status(201).json({ message: 'Ticket creado con éxito', ticket: newTicket });
    } catch (error) {
        // Manejo de errores
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al guardar el ticket', details: error.message });
    }
};

module.exports = {
    createTicket,
};
