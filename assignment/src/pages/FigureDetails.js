import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useFigures } from '../contexts/FigureContext';
import { useCart } from '../contexts/CartContext';
import Footer from '../components/Footer';

const FigureDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { figures, loading, updateFigureStock, addFavourite, removeFavourite, favourites } = useFigures();
  // ...existing code...
  const handleAddFavourite = () => {
    if (figure) {
      addFavourite(figure);
      setAlertMessage(`${figure.name} added to Favourites.`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };
  const handleRemoveFavourite = () => {
    if (figure) {
      removeFavourite(figure.id);
      setAlertMessage(`${figure.name} removed from Favourites.`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    }
  };
  const { addToCart } = useCart();

  const [figure, setFigure] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const foundFigure = figures.find(f => f.id === id);
    setFigure(foundFigure);
  }, [figures, id]);

  const handleAddToCart = async () => {
    if (figure && figure.stock > 0) {
      try {
        await updateFigureStock(figure.id, figure.stock - 1);
        addToCart(figure);
        setAlertMessage(`${figure.model} has been added to your cart.`);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } catch (error) {
        setAlertMessage('Error adding to cart. Please try again.');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      }
    } else {
      setAlertMessage('This figure is out of stock.');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleBackToList = () => {
    navigate('/figures');
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

  if (!figure) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <h1>404 - Figure Not Found</h1>
          <p>The figure you are looking for does not exist.</p>
          <Button variant="primary" onClick={handleBackToList}>
            Back to Figure List
          </Button>
        </div>
      </Container>
    );
  }

  const isFavourite = figure && favourites.some(f => f.id === figure.id);
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
              src={figure.image} 
              style={{ height: '500px', objectFit: 'cover', objectPosition: 'top' }}
              onError={(e) => {
                e.target.src = '/logo192.png'; // Fallback image
              }}
            />
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h2">{figure.brand} {figure.model}</Card.Title>
              <Card.Text className="h4 text-primary mb-3">{figure.price}</Card.Text>

              <div className="mb-3">
                <p><strong>Name:</strong> {figure.name}</p>
                <p><strong>Year:</strong> {figure.year}</p>
                <p><strong>Brand:</strong> {figure.brand}</p>
                <p><strong>Type:</strong> {figure.type}</p>
                <p><strong>Stock Available:</strong> {figure.stock}</p>
              </div>

              <div className="mb-4">
                <h5>Description</h5>
                <p>{figure.description}</p>
              </div>

              <div className="d-grid gap-2">
                <Button 
                  variant="success" 
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={figure.stock === 0}
                >
                  {figure.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
                {isFavourite ? (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleRemoveFavourite}
                  >
                    Remove from Favourites
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    size="lg"
                    onClick={handleAddFavourite}
                  >
                    Add to Favourites
                  </Button>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
        <Footer />
    </Container>
  );
};

export default FigureDetails;
