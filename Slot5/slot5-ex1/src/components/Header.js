import React, { useState } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import RecipeRequestFormModal from './RecipeRequestFormModal';

function Header() {
  const [showRequestModal, setShowRequestModal] = useState(false);

  return (
    <>
      <Navbar bg="white" expand="md" className="shadow-sm" style={{ borderRadius: '0 0 18px 18px', padding: '0.5rem 0' }}>
        <Container>
          {/* Logo + tên trang web bên trái */}
          <Navbar.Brand href="#" className="d-flex align-items-center" style={{ fontWeight: 600, fontSize: '1.25rem', color: '#234e3c' }}>
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ height: 32, marginRight: 12 }}
            />
            Healthy Recipe Finder
          </Navbar.Brand>
          {/* Tabs ở giữa */}
          <Nav className="mx-auto" style={{ fontSize: '1.05rem', alignItems: 'center', gap: '0' }}>
            <Nav.Link href="#" style={{ color: '#222', margin: '0 12px' }}>Home</Nav.Link>
            <Nav.Link href="#" style={{ color: '#222', margin: '0 12px' }}>About</Nav.Link>
            <Nav.Link href="#" style={{ color: '#234e3c', margin: '0 12px', borderBottom: '2px solid #e9a96b', paddingBottom: 2 }}>Recipes</Nav.Link>
            {/* Recipe Request Form nằm cạnh Recipes */}
            <Nav.Link
              href="#"
              style={{
                color: '#234e3c',
                margin: '0 12px',
                display: 'block',
                fontWeight: 500
              }}
              onClick={() => setShowRequestModal(true)}
            >
              Recipe Request Form
            </Nav.Link>
          </Nav>
          {/* Browse recipes button bên phải */}
          <Button
            variant="success"
            style={{
              background: '#234e3c',
              border: 'none',
              borderRadius: '12px',
              fontWeight: 500,
              fontSize: '1.05rem',
              padding: '6px 22px'
            }}
          >
            Browse recipes
          </Button>
        </Container>
      </Navbar>

      {/* Modal cho Recipe Request Form */}
      <RecipeRequestFormModal
        show={showRequestModal}
        handleClose={() => setShowRequestModal(false)}
      />
    </>
  );
}

export default Header;