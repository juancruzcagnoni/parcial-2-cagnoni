import React, { useEffect, useState } from "react";
import "./styles.css";
import Popup from "../../components/popup/PopUp";

function Botones() {
  const [datosBotones, setDatosBotones] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMensaje, setPopupMensaje] = useState("");

  useEffect(() => {
    obtenerDatosBotones();
  }, []);

  const obtenerDatosBotones = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/botones");
      if (response.ok) {
        const datos = await response.json();
        setDatosBotones(datos);
      } else {
        console.error(
          "Error al obtener datos de botones:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
    }
  };

  const reproducirSonido = (sonido) => {
    const audio = new Audio(sonido);
    audio.play();
  };

  const mostrarInformacion = () => {
    setPopupMensaje("Explora esta serie de botones diseñados para facilitar la comunicación. Al hacer clic en cada uno, reproducirán un audio con la frase correspondiente escrita en ellos. ¡Comienza ahora y mejora tu experiencia de comunicación!");
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  if (!datosBotones) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-5">
      {popupVisible && (
        <Popup
          className="button-modal"
          closePopup={closePopup}
          mensaje={popupMensaje}
        />
      )}
      <button className="button-modal" onClick={mostrarInformacion}>
        Mostrar Información
      </button>
      <h1 className="section_title mt-5">Botones</h1>
      <div className="button-container container">
        {datosBotones.map((boton) => (
          <div className="btn-container">
            <button
              key={boton._id}
              className="button-botones"
              onClick={() => reproducirSonido(boton.sonido, boton.nombre)}
            >
              <img src={boton.imagen} alt="" />
              <p className="m-0">{boton.nombre}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Botones;
