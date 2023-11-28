import React from "react";
import "./styles.css";

function Popup({ closePopup, mensaje }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <p>{mensaje}</p>
        <button onClick={closePopup} className="button-modal" >Cerrar</button>
      </div>
    </div>
  );
}   

export default Popup;
