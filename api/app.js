const express = require("express");
const cors = require("cors"); 
const database = require("./database");
const jwt = require("jsonwebtoken");
const clave = "miApp";

const usuarioController = require("./controllers/usuarioController");
const logroController = require("./controllers/logroController");
const ejercicioController = require("./controllers/ejercicioController");
const botonController = require("./controllers/botonController");

const app = express();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

// Conexión a la base de datos
database.on("error", () => {
  console.error("Error de conexion con MongoDB");
});

database.once("open", () => {
  console.log("Conexión con MongoDB exitosa");
});

// Utilidad para verificar el token
function tokenValidado(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ msg: "No se paso el token" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, clave, (error, decoded) => {
    if (error) {
      return res.status(403).json({ msg: "Token invalido" });
    }

    req.userId = decoded.userId;
    next();
  });
}

// Rutas
app.get("/", (req, res) => {
  res.send("<h1>Api Rest - Aplicaciones Hibridas & Proyecto Final</h1>");
});

// Usuarios
app.post("/api/login", usuarioController.autenticar);
app.post("/api/usuarios", usuarioController.crearUsuario);
app.get("/api/usuarios", usuarioController.obtenerUsuarios);
app.get("/api/usuarios/:idUsuario", usuarioController.obtenerUsuarioPorId);
app.put("/api/usuarios/:idUsuario", tokenValidado, usuarioController.actualizarUsuario);
app.delete("/api/usuarios/:idUsuario", tokenValidado, usuarioController.eliminarUsuario);

// Ejercicios
app.post("/api/ejercicios", tokenValidado, ejercicioController.crearEjercicio);
app.get("/api/ejercicios", ejercicioController.obtenerEjercicios);
app.get("/api/ejercicios/:idEjercicio", ejercicioController.obtenerEjercicioPorId);
app.put("/api/ejercicios/:idEjercicio", tokenValidado, ejercicioController.actualizarEjercicio);
app.delete("/api/ejercicios/:idEjercicio", tokenValidado, ejercicioController.eliminarEjercicio);

// Logros
app.post("/api/logros", tokenValidado, logroController.crearLogro);
app.get("/api/logros", logroController.obtenerLogrosDeUsuario);
app.get("/api/logros/:idLogro", logroController.obtenerLogroPorId);
app.put("/api/logros/:idLogro", tokenValidado, logroController.actualizarLogro);
app.delete("/api/logros/:idLogro", tokenValidado, logroController.eliminarLogro);

// Botones
app.post("/api/botones", tokenValidado, botonController.crearBoton);
app.get("/api/botones", botonController.obtenerBotones);
app.get("/api/botones/:idBoton", botonController.obtenerBotonPorId);
app.put("/api/botones/:idBoton", tokenValidado, botonController.actualizarBoton);
app.delete("/api/botones/:idBoton", tokenValidado, botonController.eliminarBoton);

app.listen(port, () => {
  console.log("Escuchando en el puerto ", port);
});
