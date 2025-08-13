import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

function RecipeRequestFormModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaPaperPlane style={{ marginRight: 8, color: '#007bff' }} />
          Recipe Request Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formIngredient" className="mb-3">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control type="text" placeholder="Ví dụ: Chicken breast, tofu, ..." />
            <Form.Control.Feedback type="invalid">
              Please specify an ingredient
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPrepTime" className="mb-3">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select>
              <option value="">Select...</option>
              <option value="5">5 phút</option>
              <option value="10">10 phút</option>
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a prep time
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formNotes" className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Any additional notes..." />
            <Form.Control.Feedback type="invalid">
              Please add some notes
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit">
          <FaPaperPlane style={{ marginRight: 6 }} />
          Submit Request
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeRequestFormModal;