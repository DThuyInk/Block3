import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../contexts/CartContext';
import PropTypes from 'prop-types';

const Navigation = ({ user, onLogout }) => {
  const { getTotalItems } = useCart();

  if (!user) {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <LinkContainer to="/figures">
            <Navbar.Brand>Figure Shop</Navbar.Brand>
          </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/login">
              <Nav.Link>Figures</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                Cart
              </Nav.Link>
            </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>Favourites</Nav.Link>
              </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/login" className="me-3">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register" className="me-3">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/figures">
          <Navbar.Brand>Figure Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/figures">
              <Nav.Link>Figures</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                Cart <Badge bg="secondary">{getTotalItems()}</Badge>
              </Nav.Link>
            </LinkContainer>
              <LinkContainer to="/favourites">
                <Nav.Link style={{ color: 'red' }}>Favourites</Nav.Link>
              </LinkContainer>
          </Nav>
          <Nav>
            {user && (
              <>
                <Navbar.Text className="me-3">
                  Welcome, {user.username}
                </Navbar.Text>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default Navigation;
