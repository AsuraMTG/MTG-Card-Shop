import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import './Cart.css';
import { useCart } from '../Components/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();


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
      <button className="back-button" onClick={() => navigate('/')}>
        Vissza a főoldalra
      </button>
    </div>
  );
};

export default CartPage;