const express = require("express");
const movieController = require("../controllers/movieController");
const router = express.Router();

router.get('/movie/:id', movieController.getSingleMovie);

router.get("/tmdb/all", movieController.getAllMoviesFromTMDb);

router.get('/now-playing', movieController.getNowPlayingMoviesFromTMDb);

module.exports = router;
