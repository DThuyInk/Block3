import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFigures } from '../contexts/FigureContext';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

const LandingPage = () => {
  const navigate = useNavigate();
  const { loading, error, figures } = useFigures();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Filter and sort figures
  const filteredAndSortedFigures = useMemo(() => {
        let filtered = figures.filter(figure =>
            figure.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
  
        if (sortOrder === 'lowToHigh') {
            filtered.sort((a, b) => Number(a.price.replace(/[^\d]/g, '')) - Number(b.price.replace(/[^\d]/g, '')));
        } else if (sortOrder === 'highToLow') {
            filtered.sort((a, b) => Number(b.price.replace(/[^\d]/g, '')) - Number(a.price.replace(/[^\d]/g, '')));
        } else if (sortOrder === 'nameAZ') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === 'nameZA') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }
  
        return filtered;
    }, [figures, searchTerm, sortOrder]);

  // Handler for buttons that should redirect to Login
  const handleLoginRedirect = () => {
    navigate('/login');
  };
  const handleViewDetails = (id) => {
    navigate(`/view/${id}`);
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
            <Container className="mt-5">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }
      return (
        <>
          <Navigation user={null} onLogout={() => {}} />
          <Container className="py-4">
            {/* Search & Sort */}
            <Row className="mb-3">
              <Col md={6}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search figures..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <select
                  className="form-select"
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  style={{ maxWidth: '200px' }}
                >
                  <option value="">Sort by...</option>
                  <option value="lowToHigh">Price Low to High</option>
                  <option value="highToLow">Price High to Low</option>
                  <option value="nameAZ">Name A → Z</option>
                  <option value="nameZA">Name Z → A</option>
                </select>
              </Col>
            </Row>
            {/* List Figures dạng Grid 4 cột */}
            <Row>
              {filteredAndSortedFigures.map((figure) => (
                <Col lg={3} md={6} sm={12} key={figure.id} className="mb-4">
                  <Card>
                    <Card.Img 
                      variant="top" 
                      src={figure.image} 
                      style={{ height: '200px', objectFit: 'cover', objectPosition: 'top' }}
                      onError={(e) => {
                        e.target.src = '/logo192.png'; // Fallback image
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
                          onClick={handleLoginRedirect}
                        >
                          Add to Cart
                        </Button>
                        <Button 
                          variant="danger" 
                          onClick={handleLoginRedirect}
                        >
                          Add to Favourites
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Footer />
          </Container>
        </>
  );
};

export default LandingPage;
