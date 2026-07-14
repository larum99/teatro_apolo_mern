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

// Crear aplicación Express
const app = express();

// Configuración CORS
const allowedOrigins = [
  "https://teatro-apolo-mern-frontend.vercel.app",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Solicitud desde origen:", origin);

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

// Middlewares
app.use(express.json());


// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a la API del Teatro Apolo",
  });
});


// Registrar rutas ANTES de conectar BD
app.use("/movies", movieRoutes);
app.use("/rooms", roomsRoutes);
app.use("/seats", seatsRoutes);
app.use("/showtimes", showTimesRoutes);
app.use("/tickets", ticketsRoutes);


// Usuarios depende de la conexión
let cinemaConnection;

connectDB()
  .then((connCinema) => {
    cinemaConnection = connCinema;
    console.log(
      `Conectado a MongoDB Atlas: ${connCinema.connection.host}`
    );

    app.use("/users", userRoutes(cinemaConnection));
  })
  .catch((error) => {
    console.error(
      "Error al conectar a la base de datos:",
      error.message
    );
  });


// Middleware para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
});


module.exports = app;