import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

function RecipeRequestForm({ show, onClose }) {
  if (!show) return null;
  return (
    <div className="request-form-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 9999 }}>
      <div className="request-form-modal" style={{ maxWidth: 420, margin: '60px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', padding: 32, position: 'relative' }}>
        <h4 className="mb-4" style={{ textAlign: 'center', fontWeight: 600 }}>Recipe Request Form</h4>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" />
            <Form.Control.Feedback type="invalid">Please enter your name</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
            <Form.Control.Feedback type="invalid">Please provide a valid email</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formIngredient">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control type="text" placeholder="E.g. chicken breast, tofu, spinach..." />
            <Form.Control.Feedback type="invalid">Please specify an ingredient</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrepTime">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select>
              <option value="">Select...</option>
              <option value="5">5 phút</option>
              <option value="10">10 phút</option>
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please select a prep time</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" rows={4} placeholder="Any additional notes..." />
            <Form.Control.Feedback type="invalid">Please add some notes</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 d-flex align-items-center justify-content-center gap-2">
            <FaPaperPlane /> Submit Request
          </Button>
          <Button variant="link" onClick={onClose} className="w-100 mt-2">Close</Button>
        </Form>
      </div>
    </div>
  );
}

export default RecipeRequestForm;
