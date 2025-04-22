import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../Components/InCartProduct';
import { useCart } from './CartContext';
import './Navbar.css';

function Navbar({ isAuthenticated })  {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);

  return (
    <>
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/login" className="nav-icon" title="Login">
          </Link>
          <Link to="/home" className="nav-link">Nyitó lap</Link>
          <Link to="/products" className="nav-link">Termékeink</Link>
        </div>
        
        <div className="navbar-right">
          <Link to="/cart" className="nav-icon" title="Cart">
            <div className="cart-icon-container">
              {cartItems && cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </div>
          </Link>
          <Link to="/calendar" className="nav-icon" title="Calendar">
          </Link>
        </div>
      </div>
    </nav>
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
    </>
  );
};

export default Navbar;