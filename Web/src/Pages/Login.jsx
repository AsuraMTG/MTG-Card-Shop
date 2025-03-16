import { useState } from "react";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const baseUrl = 'http://localhost:3000/Register';
        const body = JSON.stringify({ username, password });
        const headers = { 'Content-Type': 'application/json' };

        try {
            const response = await fetch(baseUrl, { method: 'POST', headers, body });
            const data = await response.json();
            console.log(data);
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
        } catch (error) {
            console.error("Registration failed", error);
        }
    };
    const handleLogin = async () => {
        const baseUrl = 'http://localhost:3000/Login';
        const body = JSON.stringify({ username, password });
        const headers = { 'Content-Type': 'application/json' };

        try {
            const response = await fetch(baseUrl, { method: 'POST', headers, body });
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
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />

            <button type="submit" onClick={handleLogin}>Login</button>
            <button type="button" onClick={handleRegister}>Register</button>
        </form>
    );
};

export default Login;