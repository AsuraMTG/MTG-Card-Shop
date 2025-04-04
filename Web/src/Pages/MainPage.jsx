import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Product from '../Components/Product'; // Import the Product component
import Cart from '../Components/InCartProduct';
import './MainPage.css';

function MainPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [activeTheme, setActiveTheme] = useState('default'); // 'default', 'dark', 'nature'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {

        axios.get("http://localhost:3000/products")
        .then((response) => {
          setProducts(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error getting products", error);
          setError("Failed to load products");
          setLoading(false);
        });
      
        // In a real application, use your actual API endpoint
        // const response = await fetch('http://your-api.com/products');
        // const data = await response.json();
        
        // For demo purposes, simulating API fetch with a delay
        const mockFetch = new Promise((resolve) => {
          setTimeout(() => {
            resolve([
              { id: 1, name: 'Termék neve', description: 'Termék leírása', price: 'xy /FT', image: "http://localhost:3000/image/1742041837443.jpg" },
              { id: 2, name: 'Termék neve', description: 'Termék leírása', price: 'xy /FT', image: '/api/placeholder/200/200' },
              { id: 3, name: 'Termék neve', description: 'Termék leírása', price: 'xy /FT', image: '/api/placeholder/200/200' },
              { id: 4, name: 'Termék neve', description: 'Termék leírása', price: 'xy /FT', image: '/api/placeholder/200/200' }
              // Your database products would be here
            ]);
          }, 500);
        });
        
        const data = await mockFetch;
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
    
    // Load cart items from localStorage on component mount
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCart);
  }, []);

  // Handle search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (newItem) => {
    const updatedCart = [...cartItems, newItem];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  // Theme switcher function
  const changeTheme = (theme) => {
    setActiveTheme(theme);
    document.body.className = `theme-${theme}`;
    // Optionally save theme preference to localStorage
    localStorage.setItem('preferredTheme', theme);
  };

  return (
    <div className={`main-page theme-${activeTheme}`}>
      {/* Header with logo and search */}
      <header className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
        
        {/* Theme switcher */}
        <div className="theme-switcher">
          <button onClick={() => changeTheme('default')} className={activeTheme === 'default' ? 'active' : ''}>Default</button>
          <button onClick={() => changeTheme('dark')} className={activeTheme === 'dark' ? 'active' : ''}>Dark</button>
          <button onClick={() => changeTheme('nature')} className={activeTheme === 'nature' ? 'active' : ''}>Nature</button>
        </div>
        
        {/* Cart icon with counter */}
        <div className="cart-icon">
          <Cart cartItems={cartItems}/>  
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
              key={product.id || index}  // Use index as a fallback if id is not available or not unique
              product={product} 
              onAddToCart={addToCart} 
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