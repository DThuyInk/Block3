import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

function RecipeRequestFormModal({ show, handleClose }) {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    const data = {
      name: form.formName.value,
      email: form.formEmail.value,
      ingredient: form.formIngredient.value,
      prepTime: form.formPrepTime.value,
      notes: form.formNotes.value,
    };
    console.log('Form data:', data);

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaPaperPlane style={{ marginRight: 8, color: '#007bff' }} />
          Recipe Request Form
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formIngredient" className="mb-3">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ví dụ: Chicken breast, tofu, ..."
              required
            />
            <Form.Control.Feedback type="invalid">
              Please specify an ingredient
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPrepTime" className="mb-3">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select required>
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
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Any additional notes..."
              required
            />
            <Form.Control.Feedback type="invalid">
              Please add some notes
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              <FaPaperPlane style={{ marginRight: 6 }} />
              Submit Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RecipeRequestFormModal;