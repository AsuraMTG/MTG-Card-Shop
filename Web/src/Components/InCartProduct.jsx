import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="cart-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to="/cart" className="cart-button">
        🛒
        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
      </Link>

      {isHovered && (
        <div className="cart-dropdown">
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-price">Fizetendő: {item.price}</p>
                      <button
                        className="cart-remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        töröl
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-cart">Kosár üres</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
