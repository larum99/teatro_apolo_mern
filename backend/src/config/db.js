const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    console.log("URI:", process.env.MONGO_URI_CINEMA.replace(/\/\/.*:.*@/, "//***:***@"));

    const connCinema = await mongoose.connect(process.env.MONGO_URI_CINEMA);

    console.log("Conectado:", connCinema.connection.host);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = connectDB;