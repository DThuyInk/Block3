import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useCart } from '../contexts/CartContext';
import PropTypes from 'prop-types';

const Navigation = ({ user, onLogout }) => {
  const { getTotalItems } = useCart();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/motorbikes">Motorbike Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/motorbikes">
              <Nav.Link>Motorbikes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/cart">
              <Nav.Link>
                Cart <Badge bg="secondary">{getTotalItems()}</Badge>
              </Nav.Link>
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
