import React from 'react';
import { useCart } from '../components/CartContext';

function CartPages() {
  const { cartItems } = useCart();

  return (
    <div>
      <h1>Kosaram tartalma</h1>
      {cartItems.length === 0 ? (
        <p>A kosarad üres.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              <strong>{item.name}</strong> – {item.price} Ft
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartPages;
