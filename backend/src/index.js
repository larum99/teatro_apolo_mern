const app = require("./app");

const PORT = process.env.PORT || 4200;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
