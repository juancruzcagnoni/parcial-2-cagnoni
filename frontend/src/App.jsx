import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import Home from "../pages/home/Home";
import Registro from "../pages/registro/Registro";
import Login from "../pages/login/Login";
import Botones from "../pages/botones/Botones";
import Ejercicios from "../pages/ejercicios/Ejercicios";
import Panel from "../pages/panel/Panel";
import { UsuarioProvider } from "../pages/panel/UsuarioContext";

function App() {
  return (
    <UsuarioProvider>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/botones" element={<Botones />} />
          <Route path="/ejercicios" element={<Ejercicios />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/panel" element={<Panel />} />
        </Routes>
        <Footer />
      </div>
    </UsuarioProvider>
  );
}

export default App;
