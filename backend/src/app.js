const cors = require("cors");
const express = require("express");
require("dotenv").config();

const movieRoutes = require("./routes/moviesRoutes");
const userRoutes = require("./routes/usersRoutes");
const roomsRoutes = require("./routes/roomsRoutes");
const seatsRoutes = require("./routes/seatsRoutes");
const showTimesRoutes = require("./routes/showTimesRoutes");
const ticketsRoutes = require("./routes/ticketsRoutes");

const connectDB = require("./config/db");

const app = express();

const allowedOrigins = [
  "https://teatro-apolo-mern-frontend.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());


// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a la API del Teatro Apolo",
  });
});


// Registrar todas las rutas inmediatamente
app.use("/movies", movieRoutes);
app.use("/users", userRoutes);
app.use("/rooms", roomsRoutes);
app.use("/seats", seatsRoutes);
app.use("/showtimes", showTimesRoutes);
app.use("/tickets", ticketsRoutes);


// Conexión a MongoDB
connectDB()
  .then((connCinema) => {
    console.log(
      `MongoDB conectado: ${connCinema.connection.host}`
    );
  })
  .catch((error) => {
    console.error(
      "Error MongoDB:",
      error.message
    );
  });


// Rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});


module.exports = app;