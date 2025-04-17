import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductPage.css';
import { useCart } from '../components/CartContext';

function ProductPage() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { addToCart } = useCart(); // a komponens belsejében

  const handleAddToCart = () => {
    addToCart(product);
    console.log('Termék hozzáadva a kosárhoz:', product);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch {
        setError('Termék betöltése sikertelen.');
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Termék nem található</div>;
  }
  
  return (
    <div className="product-page-container">
      <button onClick={() => navigate(-1)} className="back-button">Vissza</button>
      <div className="product-card">
        <div className="product-image">
          <img
            src={`http://localhost:3000/image/${product.imageUrl}`}
            alt={product.name}
            onError={(e) => (e.target.src = '/api/placeholder/200/200')}
          />
        </div>
        <div className="product-details">
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
            onClick={handleAddToCart}
          >
            Kosárba
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;