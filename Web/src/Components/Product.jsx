import React from 'react';
import './Product.css';

function Product({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">{product.price}</p>
      <button 
        className="add-to-cart-button"
        onClick={() => onAddToCart(product)}
      >
        Kosárba
      </button>
    </div>
  );
}

export default Product;