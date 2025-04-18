import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import axios from 'axios'
//import mysql from 'mysql2'
//import { jwt, sign } from 'jsonwebtoken'
//import { bcrypt, hash } from "bcrypt" 
import "@saeris/typeface-beleren-bold"


import './App.css'

// pages import!
import { CartProvider } from './Components/CartContext'
import MainPage from './Pages/MainPage'
import CartPage from './Pages/Cart'
import Protected from './Pages/Protected'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProductPage from './Pages/ProductPage';
import Calendar from './Pages/Calendar'

const baseURL = "http://localhost:3000"

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated on component mount
    const checkAuth = async () => {
      //localStorage.removeItem("token");
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      
      try {
        // Verify token validity with your backend
        const response = await axios.get(`${baseURL}/api/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid or expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  // Login handler function
  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };


  if (loading) {
    return <div>Loading...</div>;
  }


  
  return (
    <>
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />
        } />
        <Route path='/cart' element={
          isAuthenticated ? <Navigate to="/cart" /> : <CartPage /> 
        } />
        <Route path="/web/login" element={
          isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
        } />
        <Route path="/web/register" element={
          isAuthenticated ? <Navigate to="/" /> : <Register />
        } />
        <Route path="/products/:id" element={
          <ProductPage />
        } />
        <Route path="/calendar" element={
          <Calendar />
        } />
        <Route path="/" element={
          isAuthenticated ? (
            <div>
              {/* Your main app content */}
              
              {/* Other components */}
            </div>
          ) : (
            <Navigate to="/web/login" />
          )
        } />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
    </CartProvider>
    </>
  );



}

export default App