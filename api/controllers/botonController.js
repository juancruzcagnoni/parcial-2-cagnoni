const Boton = require("../models/boton");

// Controlador para crear un nuevo boton
exports.crearBoton = async (req, res) => {
  try {
    const nuevoBoton = new Boton(req.body);
    await nuevoBoton.save();
    res.status(201).json({ mensaje: "Boton creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Hubo un error al crear el boton" });
  }
};

// Controlador para obtener la lista de todos los botones
exports.obtenerBotones = async (req, res) => {
  try {
    const boton = await Boton.find();
    res.status(200).json(boton);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hubo un error al obtener la lista de botones" });
  }
};

// Controlador para obtener información de un boton por su ID
exports.obtenerBotonPorId = async (req, res) => {
  try {
    const boton = await Boton.findById(req.params.idBoton);
    if (!boton) {
      return res.status(404).json({ error: "Boton no encontrado" });
    }
    res.status(200).json(boton);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener el boton" });
  }
};

// Controlador para actualizar la información de un boton por su ID
exports.actualizarBoton = async (req, res) => {
  try {
    const botonActualizado = await Boton.findByIdAndUpdate(
      req.params.idBoton,
      req.body,
      { new: true }
    );
    if (!botonActualizado) {
      return res.status(404).json({ error: "Boton no encontrado" });
    }
    res.status(200).json(botonActualizado);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al actualizar el boton" });
  }
};

// Controlador para eliminar un botón por su ID
exports.eliminarBoton = async (req, res) => {
  try {
    const botonEliminado = await Boton.findByIdAndRemove(req.params.idBoton);
    if (!botonEliminado) {
      return res.status(404).json({ error: "Botón no encontrado" });
    }
    res.status(200).json({ mensaje: "Botón eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el botón:", error);
    res.status(500).json({ error: "Hubo un error al eliminar el botón" });
  }
};

