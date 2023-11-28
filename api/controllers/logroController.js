const Logro = require("../models/logro"); 

// Controlador para crear un nuevo logro
exports.crearLogro = async (req, res) => {
  try {
    const nuevoLogro = new Logro(req.body);
    await nuevoLogro.save();
    res.status(201).json({ mensaje: "Logro creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Hubo un error al crear el logro" });
  }
};

// Controlador para obtener la lista de logros de un usuario específico
exports.obtenerLogrosDeUsuario = async (req, res) => {
  try {
    const logros = await Logro.find({ usuario: req.params.idLogro });
    res.status(200).json(logros);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hubo un error al obtener los logros del usuario" });
  }
};

// Controlador para obtener información detallada de un logro por su ID
exports.obtenerLogroPorId = async (req, res) => {
  try {
    const logro = await Logro.findById(req.params.idLogro);
    if (!logro) {
      return res.status(404).json({ error: "Logro no encontrado" });
    }
    res.status(200).json(logro);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener el logro" });
  }
};

// Controlador para actualizar la información de un logro por su ID
exports.actualizarLogro = async (req, res) => {
  try {
    const logroActualizado = await Logro.findByIdAndUpdate(
      req.params.idLogro,
      req.body,
      { new: true }
    );
    if (!logroActualizado) {
      return res.status(404).json({ error: "Logro no encontrado" });
    }
    res.status(200).json(logroActualizado);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al actualizar el logro" });
  }
};

// Controlador para eliminar un logro por su ID
exports.eliminarLogro = async (req, res) => {
  try {
    const logroEliminado = await Logro.findByIdAndRemove(req.params.idLogro);
    if (!logroEliminado) {
      return res.status(404).json({ error: "Logro no encontrado" });
    }
    res.status(200).json({ mensaje: "Logro eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al eliminar el logro" });
  }
};
