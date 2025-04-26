import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (product) => {
    try {
      // Küldés a backendnek
      const response = await axios.post('http://localhost:3000/order-items', {
        product_id: product.product_id,
        quantity: 1, // alapértelmezett 1 darab
        price_at_order: product.price
      });

      const newOrderItem = response.data;

      // Hozzáadjuk a kosárhoz az új tételt
      setCartItems((prevItems) => [...prevItems, { ...product, order_item_id: newOrderItem.order_item_id }]);
      
    } catch (error) {
      console.error('Hiba a kosárhoz adáskor:', error);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.product_id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, setCartItems, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);