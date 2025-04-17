import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import "@saeris/typeface-beleren-bold"
import { AuthProvider, useAuth } from './AuthContext';

import './App.css'

// pages import!
import { CartProvider } from './components/CartContext'
import MainPage from './pages/MainPage'
import CartPage from './pages/CartPages'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductPage from './pages/ProductPage';
import CalendarPage from './pages/CalendarPage'
import AboutPage from './pages/AboutPage'
import ProductsPage from './pages/ProductsPage';

import Header from './layout/Header'
import Navigation from './layout/Navigation'
import Footer from './layout/Footer'

function App() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated on component mount
    const checkAuth = async () => {
      //localStorage.removeItem("token");
      //const storedUser = localStorage.getItem('user');
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-container">
      <CartProvider>
        <Header />
        <Navigation />
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/" />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </div>
        <Footer />
      </CartProvider>
    </div>
  );
}


function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Root;