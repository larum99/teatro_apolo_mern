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

// Configurar CORS
const allowedOrigins = [
  "https://teatro-apolo-mern-frontend.vercel.app", // URL del frontend en producción
  "http://localhost:X", // Para pruebas en desarrollo
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // Permite el acceso
      } else {
        callback(new Error("CORS: Origen no permitido"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
    credentials: true, // Permitir envío de cookies y credenciales
  })
);

// Middleware para procesar JSON
app.use(express.json());

// Ruta principal para verificar la conexión
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a la API del Teatro Apolo" });
});

// Conectar a la base de datos y luego inicializar las rutas
(async () => {
  try {
    const connCinema = await connectDB();

    // Configuración de las rutas
    app.use("/movies", movieRoutes); // Rutas de películas
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

// Exportar la app
module.exports = app;
