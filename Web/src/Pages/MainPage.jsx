import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Product from '../Components/Product'; // Import the Product component
import Cart from '../Components/InCartProduct';
import './MainPage.css';
import { useCart } from '../Components/CartContext';
import Navbar from '../Components/Navbar';

function MainPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTheme, setActiveTheme] = useState('default'); // 'default', 'dark', 'nature'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error getting products", error);
        setError("Failed to load products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Theme switcher function
  const changeTheme = (theme) => {
    setActiveTheme(theme);
    document.body.className = `theme-${theme}`;
    // Optionally save theme preference to localStorage
    localStorage.setItem('preferredTheme', theme);
  };

  // Use useCart hook to access the global cart state and addToCart function
  const { cartItems, addToCart } = useCart();

  return (
    <div className={`main-page theme-${activeTheme}`}>
      <Navbar/>
      <header className="header">
        <div className="theme-switcher">
          <button onClick={() => changeTheme('default')} className={activeTheme === 'default' ? 'active' : ''}>Default</button>
          <button onClick={() => changeTheme('dark')} className={activeTheme === 'dark' ? 'active' : ''}>Dark</button>
          <button onClick={() => changeTheme('nature')} className={activeTheme === 'nature' ? 'active' : ''}>Nature</button>
        </div>        
        <div className="cart-icon">
          <Cart cartItems={cartItems} removeFromCart={() => {}} /> {/* Placeholder for now */}
          {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
        </div>
      </header>

      {/* Logo background */}
      <div className="logo-background">
        <div className="logo-glow"></div>
      </div>

      {/* Product grid with loading and error states */}
      <main className="product-container">
        {loading ? (
          <div className="loading-state">Loading products...</div>
        ) : error ? (
          <div className="error-state">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products">No products match your search.</div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product, index) => (
              <Product 
                key={product.id || index} // Use index as a fallback if id is not available or not unique
                product={product} 
                onAddToCart={() => addToCart(product)} // Pass addToCart here
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 MTG CardShop</p>
      </footer>
    </div>
  );
}

export default MainPage;
