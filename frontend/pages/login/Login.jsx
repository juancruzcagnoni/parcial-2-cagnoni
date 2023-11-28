import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioContext } from "../panel/UsuarioContext";

function Login() {
  const [email, setNombreUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { iniciarSesion } = useUsuarioContext();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, contrasena }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del servidor:", data);

        const token = data.token;
        const nombreUsuario = data.nombreUsuario; 

        localStorage.setItem("token", token);
        localStorage.setItem("nombreUsuario", nombreUsuario); 

        console.log("Nombre de usuario:", nombreUsuario); 

        setMensajeExito("Inicio de sesión exitoso");
        setError("");

        iniciarSesion({ nombre: nombreUsuario });

        navigate("/panel");
      } else {
        setError("Credenciales incorrectas");
        setMensajeExito("");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
      setError("Error de conexión");
      setMensajeExito("");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="form-title">Iniciar Sesión</h1>
      {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <div className="mb-3 input">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setNombreUsuario(e.target.value)}
          />
        </div>
        <div className="mb-5 input">
          <label htmlFor="contrasena" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <button type="button" className="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;
