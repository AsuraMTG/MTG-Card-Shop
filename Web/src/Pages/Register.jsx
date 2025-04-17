import axios from 'axios';
import { useState } from 'react';

function Register() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [error, setError] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:3000/customers/register', {
        name, email, address, phone_number, password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
      
     // const data = await response.json();
      
      if (response.status === 201) {
        // Redirect to login page or handle successful registration
        window.location.href = '/login';
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="user-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input 
              type="text"
              placeholder='Username'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input 
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required  
            />
          </div>
          <div className='form-group'>
            <input 
              type='text'
              placeholder='Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required  
            />
          </div>
          <div className='form-group'>
            <input 
              type='tel'
              placeholder='Telephone Number'
              value={phone_number}
              onChange={(e) => setPhone_number(e.target.value)}
              required  
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Register</button>
        </form>
        <div className="login-link">
          Already registered? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}

export default Register;