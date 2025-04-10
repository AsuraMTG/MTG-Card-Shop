import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';
import { CartProvider } from './CartContext';

function Product({ product, onAddToCart }) {
  const navigate = useNavigate();

  const kivalasztas = () => {
    navigate(`/products/${product.product_id}`);
  };

  return (
    <div>
      <div className="product-card" onClick={kivalasztas}>
        <div className="product-image">
          <img
            src={`http://localhost:3000/image/${product.imageUrl}`}
            alt={product.name}
            onError={(e) => (e.target.src = '/api/placeholder/200/200')}
          />
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
          onClick={(e) => {
            e.stopPropagation(); // Ez megakadályozza, hogy a kosárba gomb kattintása navigálást is okozzon
            onAddToCart(product);
          }}
        >
          Kosárba
        </button>
      </div>
    </div>
  );
}

export default Product;