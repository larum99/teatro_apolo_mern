const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connCinema = await mongoose.connect(process.env.MONGO_URI_CINEMA, {
      ssl: true,
    });
    console.log(`Conectado a la base de datos cinema en MongoDB Atlas: ${connCinema.connection.host}`);
    return connCinema; // Solo una conexión
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    throw error;
  }
};

module.exports = connectDB;
