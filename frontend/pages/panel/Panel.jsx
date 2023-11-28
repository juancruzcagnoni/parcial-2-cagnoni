import React, { useState, useEffect } from "react";
import "./styles.css";
import { useUsuarioContext } from "./UsuarioContext";

function Panel() {
  const [tipo, setTipo] = useState("botone");
  const [nombre, setNombre] = useState("");
  const [imagen, setImagen] = useState("");
  const [sonido, setSonido] = useState("");
  const [nivel, setNivel] = useState(1);
  const [palabra, setPalabra] = useState("");
  const [completado, setCompletado] = useState(false);
  const [elementos, setElementos] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const obtenerElementos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/${tipo}s`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setElementos(data);
      } else {
        console.error(
          "Error al obtener la lista de elementos:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
    }
  };

  useEffect(() => {
    obtenerElementos();
  }, [tipo, token]);

  const handleAgregar = async () => {
    let nuevoElemento;

    if (tipo === "botone") {
      nuevoElemento = { tipo, nombre, imagen, sonido };
    } else if (tipo === "ejercicio") {
      nuevoElemento = { tipo, imagen, sonido, nivel, palabra, completado };
    }

    try {
      const response = await fetch(`http://localhost:3000/api/${tipo}s`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoElemento),
      });

      if (!response.ok) {
        console.error("Error al agregar el elemento:", response.status);
      } else {
        obtenerElementos();
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
    }

    setTipo("botone");
    setNombre("");
    setImagen("");
    setSonido("");
    setNivel(1);
    setPalabra("");
    setCompletado(false);
  };

  const renderCamposEjercicio = () => {
    if (tipo === "ejercicio") {
      return (
        <>
          <label>
            Nivel:
            <input
              type="number"
              value={nivel}
              onChange={(e) => setNivel(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            Palabra:
            <input
              type="text"
              value={palabra}
              onChange={(e) => setPalabra(e.target.value)}
            />
          </label>
          <br />
          <label>
            Completado:
            <input
              type="checkbox"
              checked={completado}
              onChange={(e) => setCompletado(e.target.checked)}
            />
          </label>
          <br />
        </>
      );
    }

    return null;
  };

  const { usuario } = useUsuarioContext();

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <p className="section_title">Panel de Creación</p>
        {usuario && <h1 className="section_title">Hola, {usuario.nombre}!</h1>}
      </div>

      <div className="form">
        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="botone">Botón</option>
            <option value="ejercicio">Ejercicio</option>
          </select>
        </label>
        <br />
        {tipo !== "ejercicio" && (
          <>
            <label>
              Nombre:
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </label>
            <br />
            <label>
              Sonido (URL):
              <input
                type="text"
                value={sonido}
                onChange={(e) => setSonido(e.target.value)}
              />
            </label>
            <br />
          </>
        )}
        <label>
          Imagen (URL):
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </label>
        <br />
        {renderCamposEjercicio()}
        <br />
        <button className="button" onClick={handleAgregar}>
          Agregar
        </button>
      </div>

      <div className="lista">
        <h2 className="section_title">
          Lista de {tipo === "botone" ? "Botones" : "Ejercicios"}
        </h2>
        {elementos.map((elemento, index) => (
          <div key={index}>
            {Object.entries(elemento).map(([key, value]) => (
              <p key={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}: {value.toString()}
              </p>
            ))}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Panel;
