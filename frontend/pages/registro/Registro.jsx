import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, contrasena }),
      });

      if (response.ok) {
        navigate('/login')
        setMensajeExito('Usuario registrado exitosamente');
        setError('');
      } else {
        setError('Error al registrar usuario');
        setMensajeExito('');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud', error);
      setError('Error de conexión');
      setMensajeExito('');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className='form-title'>Crea tu cuenta</h1>
      {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form>
        <div className="mb-3 input">
          <label htmlFor="nombre" className="form-label">Nombre de usuario</label>
          <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="mb-3 input">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-5 input">
          <label htmlFor="contrasena" className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </div>
        <button type="button" className="button" onClick={handleRegister}>Registrar</button>
      </form>
    </div>
  );
}

export default Registro;
