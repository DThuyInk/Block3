import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function RecipeModal({ show, handleClose, recipe }) {
  if (!recipe) return null;
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{recipe.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={recipe.image} alt={recipe.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
        <p>{recipe.description}</p>
        <p><strong>Servings:</strong> {recipe.servings}</p>
        <p><strong>Prep Time:</strong> {recipe.prep} mins</p>
        <p><strong>Cook Time:</strong> {recipe.cook} mins</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;