const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  logrosObtenidos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Logro",
    },
  ],
  botonesFavoritos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Boton",
    },
  ],
  creada: {
    type: Date,
    default: Date.now,
  },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;
