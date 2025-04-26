import React from 'react';
import { useCart } from '../components/CartContext';
import './CartPage.css';

function CartPages() {
  const { cartItems, removeFromCart } = useCart();

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  console.log(cartItems);

  return (
    <div className="cart-page">
      <h1>Kosaram tartalma</h1>
      {cartItems.length === 0 ? (
        <p>A kosarad üres.</p>
      ) : (
        <ul className="cart-item-list">
          {cartItems.map((item) => (
            <li key={item.product_id} className="cart-item">
              <div className="cart-item-details">
                <strong>{item.name}</strong> – {item.price} Ft
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item.product_id)}>
                ❌ Törlés
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPages;