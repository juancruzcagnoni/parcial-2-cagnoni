const mongoose = require('mongoose');

const botonSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  sonido: {
    type: String,
    required: true,
  },
});

const Boton = mongoose.model('Boton', botonSchema);

module.exports = Boton;
