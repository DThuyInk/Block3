import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useMotorbikes } from '../contexts/MotorbikeContext';
import { useCart } from '../contexts/CartContext';

const MotorbikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { motorbikes, loading, updateMotorbikeStock } = useMotorbikes();
  const { addToCart } = useCart();
  
  const [motorbike, setMotorbike] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const foundMotorbike = motorbikes.find(m => m.id === parseInt(id));
    setMotorbike(foundMotorbike);
  }, [motorbikes, id]);

  const handleAddToCart = async () => {
    if (motorbike && motorbike.stock > 0) {
      try {
        await updateMotorbikeStock(motorbike.id, motorbike.stock - 1);
        addToCart(motorbike);
        setAlertMessage(`${motorbike.model} has been added to your cart.`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        setAlertMessage('Error adding to cart. Please try again.');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } else {
      setAlertMessage('This motorbike is out of stock.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleBackToList = () => {
    navigate('/motorbikes');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (!motorbike) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <h1>404 - Motorbike Not Found</h1>
          <p>The motorbike you are looking for does not exist.</p>
          <Button variant="primary" onClick={handleBackToList}>
            Back to Motorbike List
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Button variant="secondary" className="mb-3" onClick={handleBackToList}>
        ← Back to List
      </Button>

      {showAlert && (
        <Alert variant="success" className="mb-4">
          {alertMessage}
        </Alert>
      )}

      <Row>
        <Col lg={6}>
          <Card>
            <Card.Img 
              variant="top" 
              src={motorbike.image} 
              style={{ height: '400px', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = '/logo192.png'; // Fallback image
              }}
            />
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h2">{motorbike.brand} {motorbike.model}</Card.Title>
              <Card.Text className="h4 text-primary mb-3">{motorbike.price}</Card.Text>
              
              <div className="mb-3">
                <p><strong>Year:</strong> {motorbike.year}</p>
                <p><strong>Brand:</strong> {motorbike.brand}</p>
                <p><strong>Model:</strong> {motorbike.model}</p>
                <p><strong>Stock Available:</strong> {motorbike.stock}</p>
              </div>

              <div className="mb-4">
                <h5>Description</h5>
                <p>{motorbike.description}</p>
              </div>

              <div className="d-grid">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={motorbike.stock === 0}
                >
                  {motorbike.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MotorbikeDetails;
