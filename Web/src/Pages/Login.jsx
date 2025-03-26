import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';


const Login = () => {
    const [username, setUsername] = useState('Pistike');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
          navigate('http://localhost:3000/web/register');
      
        // If logged in, show the login page
      /*  return (
          <div>
            {handleLogin}
          </div>
        ); */
      };

        /*try {
            const response = await axios(baseUrl, { method: 'POST', headers, body });
            const data = await response.json();
            console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
        } catch (error) {
            console.error("Registration failed", error);
        }*/ 
    const handleLogin = async () => {
        const baseUrl = 'http://localhost:3000/web/login';
        const body = JSON.stringify({ username, password });
        const headers = { 'Content-Type': 'application/json' };

        try {
            const response = await axios(baseUrl, { method: 'POST', headers, body });
            const data = await response.json();
            console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
        } catch (error) {
            console.error("Registration failed", error);
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
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="login-button">Login</button>
            </form>
          </div>
        </div>
      );
    /*return (
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleRegister}>Register</button>
        </form>
    );*/
};

export default Login;