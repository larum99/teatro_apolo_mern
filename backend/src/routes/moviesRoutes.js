const express = require("express");
const movieController = require("../controllers/movieController");
const router = express.Router();

// Definir las rutas relacionadas con películas
router.get('/movie/:id', movieController.getSingleMovie);  // Obtener una película por su ID
router.get("/tmdb/all", movieController.getAllMoviesFromTMDb);  // Obtener todas las películas de TMDb
router.get('/now-playing', movieController.getNowPlayingMoviesFromTMDb);  // Obtener películas en cartelera

module.exports = router;
