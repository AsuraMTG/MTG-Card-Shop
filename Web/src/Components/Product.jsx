import React from 'react';
import './Product.css';

function Product({ product, onAddToCart }) {
  const formattedPrice = Number(product.price)
  return (
    <div>
      <div className="product-card">
      <div className="product-image">
        <img src={`http://localhost:3000/image/${product.imageUrl}`}
         alt={product.name}
         onError={(e) => e.target.src = '/api/placeholder/200/200'} />
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">
        {new Intl.NumberFormat('hu-HU', {
          style: 'currency',
          currency: 'HUF',
        }).format(Number(product.price))}
      </p>
      <button 
        className="add-to-cart-button"
        onClick={() => onAddToCart(product)}
      >
        Kosárba
      </button>
    </div>
    </div>

  );
}

export default Product;