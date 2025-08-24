import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useMotorbikes } from '../contexts/MotorbikeContext';
import { useCart } from '../contexts/CartContext';

const MotorbikeList = () => {
  const navigate = useNavigate();
  const { motorbikes, loading, error, updateMotorbikeStock } = useMotorbikes();
  const { addToCart, getTotalItems } = useCart();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Filter and sort motorbikes
  const filteredAndSortedMotorbikes = useMemo(() => {
    let filtered = motorbikes.filter(motorbike =>
      motorbike.model.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return priceA - priceB;
      });
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return priceB - priceA;
      });
    }

    return filtered;
  }, [motorbikes, searchTerm, sortOrder]);

  const handleViewDetails = (id) => {
    navigate(`/view/${id}`);
  };

  const handleAddToCart = async (motorbike) => {
    if (motorbike.stock > 0) {
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

  const handleViewCart = () => {
    navigate('/cart');
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

  if (error) {
    return (
      <Container>
        <Alert variant="danger">Error: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Motorbike List</h1>
        <Button variant="info" onClick={handleViewCart}>
          View Cart ({getTotalItems()})
        </Button>
      </div>

      {showAlert && (
        <Alert variant="success" className="mb-4">
          {alertMessage}
        </Alert>
      )}

      {/* Search and Sort Controls */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by model"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Motorbike Grid */}
      <Row>
        {filteredAndSortedMotorbikes.map((motorbike) => (
          <Col key={motorbike.id} lg={3} md={6} className="mb-4">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={motorbike.image} 
                style={{ height: '200px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.src = '/logo192.png'; // Fallback image
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{motorbike.brand} {motorbike.model}</Card.Title>
                <Card.Text>
                  <strong>Year:</strong> {motorbike.year}<br />
                  <strong>Price:</strong> {motorbike.price}<br />
                  <strong>Stock:</strong> {motorbike.stock}
                </Card.Text>
                <div className="mt-auto">
                  <div className="d-grid gap-2">
                    <Button 
                      variant="primary" 
                      onClick={() => handleViewDetails(motorbike.id)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="success" 
                      onClick={() => handleAddToCart(motorbike)}
                      disabled={motorbike.stock === 0}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredAndSortedMotorbikes.length === 0 && (
        <div className="text-center py-5">
          <h4>No motorbikes found matching your search criteria.</h4>
        </div>
      )}
    </Container>
  );
};

export default MotorbikeList;
