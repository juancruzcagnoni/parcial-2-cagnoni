import React, { createContext, useContext, useState } from "react";

const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const iniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <UsuarioContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  );
};

const useUsuarioContext = () => {
  return useContext(UsuarioContext);
};

export { UsuarioProvider, useUsuarioContext };
