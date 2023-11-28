const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const salt = 10;
const secretKey = "miApp";

// Controlador para crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, email, contrasena } = req.body;
    const contrasenaHash = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = new Usuario({
      nombre: nombre,
      email,
      contrasena: contrasenaHash,
    });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Hubo un error al crear el usuario" });
  }
};

// Controlador para autenticar el usuario
exports.autenticar = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "El usuario no existe" });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, user.contrasena);
    if (!contrasenaValida) {
      return res.status(401).json({ msg: "Credenciales invalidas" });
    }

    // Generamos el JWT
    const token = jwt.sign({ user: email }, secretKey, {
      expiresIn: "1h",
    });

    // Incluimos el nombre de usuario en la respuesta
    res
      .status(201)
      .json({
        msg: "Autenticación exitosa",
        token: token,
        nombreUsuario: user.nombre,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener la lista de todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hubo un error al obtener la lista de usuarios" });
  }
};

// Controlador para obtener información de un usuario por su ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.idUsuario);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al obtener el usuario" });
  }
};

// Controlador para actualizar la información de un usuario por su ID
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.idUsuario,
      req.body,
      { new: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al actualizar el usuario" });
  }
};

// Controlador para eliminar un usuario por su ID
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndRemove(
      req.params.idUsuario
    );
    if (!usuarioEliminado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Hubo un error al eliminar el usuario" });
  }
};
