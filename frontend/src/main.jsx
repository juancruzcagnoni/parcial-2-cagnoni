import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { UsuarioProvider } from "../pages/panel/UsuarioContext";
import App from "./App";
import './App.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsuarioProvider>
      <Router>
        <App />
      </Router>
    </UsuarioProvider>
  </React.StrictMode>
);
