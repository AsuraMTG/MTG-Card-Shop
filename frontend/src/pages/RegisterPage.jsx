import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('A jelszavak nem egyeznek!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/customers/register', {
        name, email, address, phone_number, password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        setError(response.data.message || 'A regisztráció nem sikerült.');
      }
    } catch (err) {
      setError('Hiba történt a regisztráció során.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4 text-center">Regisztráció</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Felhasználónév</label>
            <input
              type="text"
              className="form-control"
              placeholder="Pl. johndoe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">E-mail cím</label>
            <input
              type="email"
              className="form-control"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Lakcím</label>
            <input
              type="text"
              className="form-control"
              placeholder="Cím"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Telefonszám</label>
            <input
              type="tel"
              className="form-control"
              placeholder="06 30 123 4567"
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Jelszó</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label">Jelszó megerősítése</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Regisztráció</button>
        </form>
        <div className="text-center mt-3">
          Már van fiókod? <a href="/login" className="btn btn-outline-primary btn-sm">Belépés</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;