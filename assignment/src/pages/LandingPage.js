import React, { useState, useMemo } from 'react';
import { FaFire } from 'react-icons/fa';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFigures } from '../contexts/FigureContext';
import Footer from '../components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();
  const { loading, error, figures } = useFigures();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Hero section
  const Hero = () => (
    <section className="hero" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', background: '#f5f5f5', padding: '2rem 0', marginBottom: '2rem'
    }}>
      <img
        src={process.env.PUBLIC_URL + '/logo.png'}
        alt="Figure Shop Logo"
        style={{ width: '180px', height: 'auto', marginBottom: '1.5rem' }}
      />
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#222', marginBottom: '1rem' }}>
        Welcome to Figure Shop
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', maxWidth: '500px', textAlign: 'center' }}>
        Discover and collect your favorite figures from anime, games, and more!
      </p>
    </section>
  );

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

  // Handler for buttons that should redirect to Login with redirect_url
  const handleLoginRedirect = () => {
    navigate(`/login?redirect_url=${encodeURIComponent(window.location.pathname)}`);
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
        <Hero />
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
            {filteredAndSortedFigures.map((figure) => {
              const isSale = figure.tags && figure.tags.includes('sale');
              const isHot = figure.tags && figure.tags.includes('hot');
              return (
                <Col lg={3} md={6} sm={12} key={figure.id} className="mb-4">
                  <div style={{ position: 'relative' }}>
                    {isHot && (
                      <span style={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        zIndex: 2,
                        background: 'red',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '4px 10px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '1rem'
                      }}>
                        <FaFire style={{ marginRight: 4 }} /> Hot
                      </span>
                    )}
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
                          <strong>Price:</strong> {isSale && figure.salePrice ? (
                            <>
                              <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>{figure.price}</span>{' '}
                              <span style={{ color: 'red', fontWeight: 'bold' }}>{figure.salePrice}</span>
                            </>
                          ) : (
                            <span>{figure.price}</span>
                          )}<br />
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
                  </div>
                </Col>
              );
            })}
          </Row>
          <Footer />
        </Container>
      </>
  );
};

export default LandingPage;
