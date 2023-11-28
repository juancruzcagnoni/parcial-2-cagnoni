const mongoose = require("mongoose");

const ejercicioSchema = new mongoose.Schema({
  nivel: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  palabra: {
    type: String,
    required: true,
  },
  completado: {
    type: Boolean,
  }
});

const Ejercicio = mongoose.model("Ejercicio", ejercicioSchema);

module.exports = Ejercicio;
