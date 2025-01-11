require("dotenv").config();
const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

// Controlador para obtener una sola película
const getSingleMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es-ES',
      },
    });

    const movies = response.data.results;
    if (movies.length > 0) {
      res.json(movies[0]); // Devuelve la primera película en cartelera
    } else {
      res.status(404).json({ message: 'No se encontraron películas.' });
    }
  } catch (error) {
    console.error('Error al obtener datos de TMDB:', error);
    res.status(500).json({ message: 'Error al comunicarse con TMDB.' });
  }
};

// Obtener todas las películas de TMDb utilizando el endpoint now_playing
const getNowPlayingMoviesFromTMDb = async (req, res) => {
  try {
    // Hacer la solicitud a TMDb para obtener las películas en cartelera (now_playing)
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'es-ES',
        page: 1,
      }
    });

    const movies = response.data.results;

    if (movies.length > 0) {
      res.json(movies);  // Devuelve las películas en cartelera
    } else {
      res.status(404).json({ message: "No se encontraron películas en cartelera." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllMoviesFromTMDb = async (req, res) => {
  try {
    // Hacer la solicitud a TMDb para obtener todas las películas
    const response = await axios.get(`${process.env.TMDB_BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        language: 'es-ES',
        page: 1,
        sort_by: 'popularity.desc'
      }
    });

    const movies = response.data.results;

    if (movies.length > 0) {
      res.json(movies);  // Devuelve las películas de TMDb
    } else {
      res.status(404).json({ message: "No se encontraron películas." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {   getAllMoviesFromTMDb, getNowPlayingMoviesFromTMDb, getSingleMovie };
