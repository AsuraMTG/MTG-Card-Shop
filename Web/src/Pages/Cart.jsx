import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Cart.css';

const CartPage = ({ cartItems = [] }) => {
  const navigate = useNavigate();

  // Function to handle removing an item from the cart
  const removeFromCart = (itemId) => {
    // Logic to remove the item from cartItems state
    // For now, let's assume cartItems is passed as a prop
    // You can implement state management (e.g., Redux or Context) later
    alert(`Item removed from cart!`);
    navigate('http://localhost:3000'); // Navigate back to the main page
  };

  return (
    <div className="cart-page">
      <h2>Kosár tartalma</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="cart-item-info">
                <p className="cart-item-name">{item.name}</p>
                <p className="cart-item-price">Fizetendő: {item.price}</p>
              </div>
              <div className="cart-item-actions">
                <button onClick={() => removeFromCart(item.id)} className="cart-remove-button">
                  töröl
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="empty-cart">A kosár üres.</p>
      )}
    </div>
  );
};

export default CartPage;