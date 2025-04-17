import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import Navigation from '../layout/Navigation';
import './ProductsPage.css';
import { Button } from 'react-bootstrap';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products/');
        setProducts(response.data);
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

  if (products.length === 0) {
    return (
      <Container className="mt-5">
        <Alert variant="info">No products found.</Alert>
      </Container>
    );
  }

  return (
    <>
      <h1>Jelenleg elérhető kártyák</h1>
      <Container className="mt-4">
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {products.map((product) => (
            <Col key={product.product_id}>
              <Card className="h-100" onClick={() => navigate(`/products/${product.product_id}`)} style={{ cursor: 'pointer' }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:3000/image/${product.imageUrl}`}
                  onError={(e) => (e.target.src = '/api/placeholder/400/400')}
                  style={{ objectFit: 'cover', height: '200px' }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description.slice(0, 120)}...
                  </Card.Text>
                  <div className="mb-2">
                    <strong>
                      {new Intl.NumberFormat('hu-HU', {
                        style: 'currency',
                        currency: 'HUF',
                      }).format(product.price)}
                    </strong>
                  </div>
                  <Button variant="primary">Kiválasztom</Button>
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