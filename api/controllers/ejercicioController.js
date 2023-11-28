const Ejercicio = require("../models/ejercicio"); 

// Controlador para crear un nuevo ejercicio
exports.crearEjercicio = async (req, res) => {
  try {
    const nuevoEjercicio = new Ejercicio(req.body);
    await nuevoEjercicio.save();
    res.status(201).json({ mensaje: "Ejercicio creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Hubo un error al crear el ejercicio" });
  }
};

// Controlador para obtener la lista de todos los ejercicios
exports.obtenerEjercicios = async (req, res) => {
  try {
    const ejercicios = await Ejercicio.find();
    res.status(200).json(ejercicios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hubo un error al obtener la lista de ejercicios" });
  }
};

// Controlador para obtener información de un ejercicio por su ID
exports.obtenerEjercicioPorId = async (req, res) => {
  try {
    const ejercicio = await Ejercicio.findById(req.params.idEjercicio);
    if (!ejercicio) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }
    res.status(200).json(ejercicio);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener el ejercicio" });
  }
};

// Controlador para actualizar la información de un ejercicio por su ID
exports.actualizarEjercicio = async (req, res) => {
  try {
    const ejercicioActualizado = await Ejercicio.findByIdAndUpdate(
      req.params.idEjercicio,
      req.body,
      { new: true }
    );
    if (!ejercicioActualizado) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }
    res.status(200).json(ejercicioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al actualizar el ejercicio" });
  }
};

// Controlador para eliminar un ejercicio por su ID
exports.eliminarEjercicio = async (req, res) => {
  try {
    const ejercicioEliminado = await Ejercicio.findByIdAndRemove(req.params.idEjercicio);
    if (!ejercicioEliminado) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }
    res.status(200).json({ mensaje: "Ejercicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al eliminar el ejercicio" });
  }
};
