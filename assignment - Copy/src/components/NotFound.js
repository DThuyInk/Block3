import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/figures');
  };

  return (
    <Container className="text-center py-5">
      <h1 className="display-1">404</h1>
      <h2>Page Not Found</h2>
      <p className="lead">The page you are looking for does not exist.</p>
      <Button variant="primary" onClick={handleGoHome}>
        Go to Figures
      </Button>
    </Container>
  );
};

export default NotFound;
