import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFigures } from '../contexts/FigureContext';
import { useCart } from '../contexts/CartContext';

const Favourites = () => {
  const { favourites, removeFavourite, updateFigureStock, figures } = useFigures();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleViewDetails = (id) => {
    navigate(`/view/${id}`);
  };

  const handleAddToCart = async (figure) => {
    if (figure.stock > 0) {
      try {
        await updateFigureStock(figure.id, figure.stock - 1);
        addToCart({ ...figure, stock: figure.stock - 1 });
        setAlertMessage(`${figure.name} added to cart.`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      } catch (error) {
        setAlertMessage('Error adding to cart.');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 2000);
      }
    } else {
      setAlertMessage('This figure is out of stock.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };

  const handleRemoveFavourite = (figure) => {
    removeFavourite(figure.id);
    setAlertMessage(`${figure.name} removed from Favourites.`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Favourites</h2>
      {favourites.length === 0 ? (
        <Alert variant="info">No favourite figures yet.</Alert>
      ) : (
        <Row>
          {favourites.map((id, idx) => {
            const figure = figures.find(f => f.id === id);
            if (!figure) return null;
            return (
              <Col key={figure.id} lg={3} md={6} className="mb-4">
                <Card>
                  <Card.Img 
                    variant="top" 
                    src={figure.image} 
                    style={{ height: '200px', objectFit: 'cover', objectPosition: 'top' }}
                    onError={(e) => {
                      e.target.src = '/logo192.png';
                    }} 
                  />
                  <Card.Body>
                    <Card.Title>{figure.name} {figure.type}</Card.Title>
                    <Card.Text>
                      <strong>Brand:</strong> {figure.brand}<br />
                      <strong>Price:</strong> {figure.price}<br />
                      <strong>Stock:</strong> {figure.stock}
                    </Card.Text>
                    <div className="d-grid gap-2">
                      <Button 
                        variant="primary" 
                        onClick={() => handleViewDetails(figure.id)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="success" 
                        onClick={() => handleAddToCart(figure)}
                        disabled={figure.stock === 0}
                      >
                        Add to Cart
                      </Button>
                      <Button 
                        variant="secondary" 
                        onClick={() => handleRemoveFavourite(figure)}
                      >
                        Remove from Favourites
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
      {showAlert && <Alert variant="info" className="mt-3">{alertMessage}</Alert>}
    </Container>
  );
};

export default Favourites;
