const mongoose = require("mongoose");

const logroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  imagen: {
    type: String, 
    required: true,
  },
  ejercicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ejercicio",
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

const Logro = mongoose.model("Logro", logroSchema);

module.exports = Logro;
