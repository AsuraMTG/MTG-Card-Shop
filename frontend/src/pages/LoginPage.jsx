import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

import './AuthPages.css';

function LoginPage() {
  const { login } = useAuth();
  
 const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/customers/login',
        { username, password }, 
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200 && response.data.auth) {
        // Sikeres bejelentkezés
        console.log('Bejelentkezés sikeres:', response.data);
        login(response.data.result); // Átadjuk a felhasználói adatokat a szülő komponensnek
        localStorage.setItem('user', JSON.stringify(response.data.result)); // Mentjük a felhasználói adatokat a helyi tárolóba 
        navigate('/');
      } else {
        setErrorMessage('Hibás felhasználónév vagy jelszó!');
      }
    } catch (error) {
      console.error('Bejelentkezés sikertelen:', error);
      setErrorMessage('Hálózati vagy szerverhiba történt.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card auth-card shadow-sm p-4" style={{ maxWidth: "500px" }}>
        <h2 className="mb-4">Bejelentkezés</h2>
        {errorMessage && (
          <div className="alert alert-danger mb-3" role="alert">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Felhasználónév</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Pl. johndoe"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Jelszó</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn w-100">Belépés</button>
        </form>
        <div className="mt-3">
          <span>Nincs még fiókod? </span>
          <a className="btn btn-outline-secondary btn-sm" href="/register">Regisztráció</a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
