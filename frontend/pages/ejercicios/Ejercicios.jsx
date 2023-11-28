import React, { useEffect, useState } from "react";
import "./styles.css";
import Popup from "../../components/popup/PopUp";

function Ejercicios() {
  const [datosEjercicios, setDatosEjercicios] = useState(null);
  const [indiceEjercicio, setIndiceEjercicio] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMensaje, setPopupMensaje] = useState("");

  const mostrarSiguienteEjercicio = () => {
    setIndiceEjercicio((prevIndice) =>
      prevIndice < datosEjercicios.length - 1 ? prevIndice + 1 : 0
    );
  };

  const mostrarEjercicioAnterior = () => {
    setIndiceEjercicio((prevIndice) =>
      prevIndice > 0 ? prevIndice - 1 : datosEjercicios.length - 1
    );
  };

  useEffect(() => {
    obtenerDatosEjercicios();
  }, []);

  const obtenerDatosEjercicios = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/ejercicios");
      if (response.ok) {
        const datos = await response.json();
        setDatosEjercicios(datos);
      } else {
        console.error(
          "Error al obtener datos de ejercicios:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al realizar la solicitud", error);
    }
  };

  const mostrarInformacion = () => {
    setPopupMensaje(
      "Aquí te presento una serie de ejercicios diseñados para mejorar tu habilidad en el habla. Estos ejercicios se dividen en varios niveles, y a medida que completes cada uno de ellos, podrás avanzar al siguiente utilizando los botones ubicados más abajo. La mayoría de los ejercicios incluyen imágenes y palabras separadas por sílabas, lo que facilitará el proceso de aprendizaje al pronunciarlas. ¡Comienza ahora mismo y fortalece tus habilidades de expresión oral!"
    );
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  if (!datosEjercicios) {
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
      <div className="ejercicios d-flex justify-content-center align-items-center flex-column">
        <div className="text-center">
          <p className="nivel">
            Nivel: {datosEjercicios[indiceEjercicio].nivel}
          </p>
          <p className="imagen">
            Imagen: {datosEjercicios[indiceEjercicio].imagen}
          </p>
          <p className="palabra">
            Palabra: {datosEjercicios[indiceEjercicio].palabra}
          </p>
        </div>
        <div className="d-flex">
          <button className="button mx-1" onClick={mostrarEjercicioAnterior}>
            Anterior
          </button>
          <button className="button mx-1" onClick={mostrarSiguienteEjercicio}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Ejercicios;
