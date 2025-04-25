import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../layout/Navigation';
import './ProductsPage.css';
import { Button } from 'react-bootstrap';
import { useCart } from '../components/CartContext';

function ProductsPage() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart(); // a komponens belsejében
  
  const handleAddToCart = (product) => {
    addToCart(product);
    console.log('Termék hozzáadva a kosárhoz:', product);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products/');
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (product.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">No products found.</Alert>
      </Container>
    );
  }

  return (
    <>
      <h1>Jelenlegi termékeink</h1>
      <Container className="mt-4">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {product.map((product) => (
            <Col key={product.product_id}>
              <Card className="product-card">
                <Card.Img
                  onClick={() => navigate(`/products/${product.product_id}`)} style={{ cursor: 'pointer', objectFit: 'cover', height: '200px'  }}
                  variant="top"
                  src={`http://localhost:3000/image/${product.imageUrl}`}
                  onError={(e) => (e.target.src = '/api/placeholder/400/400')}
                />
                <Card.Body>
                  <Card.Title className='product-name'>{product.name}</Card.Title>
                  <Card.Text className='product-description'>
                    {product.description.slice(0, 120)}...
                  </Card.Text>
                  <div className="product-price">
                    <strong>
                      {new Intl.NumberFormat('hu-HU', {
                        style: 'currency',
                        currency: 'HUF',
                      }).format(product.price)}
                    </strong>
                  </div>
                  <Button
                    className="add-to-cart-button"
                    onClick={() => handleAddToCart(product)}
                  >
                  Kosárba
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );

}

export default ProductsPage;