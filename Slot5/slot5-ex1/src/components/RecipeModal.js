import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function RecipeModal({ show, handleClose, recipe }) {
  if (!recipe) return null;
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ borderBottom: 'none', background: '#f7f7f7' }}>
        <Modal.Title style={{
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontWeight: 700,
          fontSize: '1.6rem',
          color: '#234e3c',
          textAlign: 'center',
          width: '100%'
        }}>
          {recipe.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#f7f7f7', padding: '2rem 2rem 1.5rem 2rem' }}>
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: '100%',
            borderRadius: '18px',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 16px rgba(0,0,0,0.10)'
          }}
        />
        <p style={{
          fontFamily: 'Montserrat, Arial, sans-serif',
          fontSize: '1.13rem',
          color: '#234e3c',
          textAlign: 'center',
          marginBottom: '1.2rem'
        }}>
          {recipe.description}
        </p>
        <div className="d-flex justify-content-center mb-2" style={{ gap: '32px' }}>
          <div className="text-center" style={{ minWidth: 90 }}>
            <span style={{ fontSize: '1.5rem' }} role="img" aria-label="servings">🍽️</span>
            <div style={{ fontWeight: 600, fontSize: '1.05rem', marginTop: 2 }}>Servings</div>
            <div style={{ fontSize: '1.05rem' }}>{recipe.servings}</div>
          </div>
          <div className="text-center" style={{ minWidth: 90 }}>
            <span style={{ fontSize: '1.5rem' }} role="img" aria-label="prep">⏱️</span>
            <div style={{ fontWeight: 600, fontSize: '1.05rem', marginTop: 2 }}>Prep</div>
            <div style={{ fontSize: '1.05rem' }}>{recipe.prep} mins</div>
          </div>
          <div className="text-center" style={{ minWidth: 90 }}>
            <span style={{ fontSize: '1.5rem' }} role="img" aria-label="cook">🍳</span>
            <div style={{ fontWeight: 600, fontSize: '1.05rem', marginTop: 2 }}>Cook</div>
            <div style={{ fontSize: '1.05rem' }}>{recipe.cook} mins</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer style={{ background: '#f7f7f7', borderTop: 'none', justifyContent: 'center' }}>
        <Button
          variant="secondary"
          onClick={handleClose}
          style={{
            borderRadius: '12px',
            fontWeight: 500,
            padding: '8px 32px',
            fontSize: '1.07rem'
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;