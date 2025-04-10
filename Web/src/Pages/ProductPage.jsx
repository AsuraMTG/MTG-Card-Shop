import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductPage.css';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="loading-state">Loading product details...</div>;
  }

  if (error) {
    return <div className="error-state">{error}</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  const formattedPrice = Number(product.price);

  return (
    <div className="product-page">
      <div className="product-page-details">
        <Link to={`/products/${product.id}`} className="product-page-link">
          <div className="product-page-image">
            <img
              src={`http://localhost:3000/image/${product.imageUrl}`}
              alt={product.name}
              onError={(e) => (e.target.src = '/api/placeholder/400/400')}
            />
          </div>
        </Link>

        <div className="product-page-info">
          <h2 className="product-page-name">{product.name}</h2>
          <p className="product-page-description">{product.description}</p>
          <div className="product-page-price">
            <span>Ár:</span>
            <strong>
              {new Intl.NumberFormat('hu-HU', {
                style: 'currency',
                currency: 'HUF',
              }).format(formattedPrice)}
            </strong>
          </div>
          <div className="quantity-selector">
            <label>Készleten:</label>
            <input type="number" value="1" min="1" max={product.stock} />
            <button className="close-button">X</button>
          </div>
          <button className="product-page-add-to-cart-button">Kosárba</button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
