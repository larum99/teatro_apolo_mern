const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/moviesRoutes");
const userRoutes = require("./routes/usersRoutes");
const roomsRoutes = require("./routes/roomsRoutes");
const seatsRoutes = require("./routes/seatsRoutes");
const showTimesRoutes = require("./routes/showTimesRoutes");
const ticketsRoutes = require("./routes/ticketsRoutes");
const connectDB = require("./config/db");
require("dotenv").config();

// Crear la app de Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Ruta principal para verificar la conexión
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API del Teatro Apolo" });
});

// Conectar a la base de datos y luego inicializar las rutas
(async () => {
  try {
    const connCinema = await connectDB();

    // Configuración de las rutas
    app.use("/movies", movieRoutes);
    app.use("/users", userRoutes(connCinema));
    app.use("/rooms", roomsRoutes);
    app.use("/seats", seatsRoutes);
    app.use("/showtimes", showTimesRoutes);
    app.use("/tickets", ticketsRoutes);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1);
  }
})();

module.exports = app;
