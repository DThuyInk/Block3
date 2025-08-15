
import React, { useState } from 'react';
import { Form, Button, Toast, ToastContainer } from 'react-bootstrap';
import { allGenres } from '../data/movie';

const initialState = {
  title: '',
  genre: '',
  year: '',
  duration: '',
  description: ''
};

const MovieRequestForm = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required.';
    if (!form.genre) newErrors.genre = 'Genre is required.';
    if (!form.year || isNaN(form.year) || Number(form.year) <= 1900) newErrors.year = 'Year must be > 1900.';
    if (!form.duration || isNaN(form.duration) || Number(form.duration) <= 0) newErrors.duration = 'Duration must be > 0.';
    if (!form.description || form.description.length < 30) newErrors.description = 'Description must be at least 30 characters.';
    return newErrors;
  };

  const handleChange = e => {
    const newForm = { ...form, [e.target.name]: e.target.value };
    setForm(newForm);
    setErrors(validate(newForm));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShowToast(true);
      setForm(initialState);
      setErrors({});
    }
  };

  return (
    <div style={{ paddingTop: '70px', maxWidth: 500, margin: '0 auto' }}>
      <h2>Movie Request Form</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Select
            name="genre"
            value={form.genre}
            onChange={handleChange}
            isInvalid={!!errors.genre}
          >
            <option value="">Select genre</option>
            {allGenres.filter(g => g !== 'All').map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </Form.Select>
          <Form.Control.Feedback type="invalid">{errors.genre}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formYear">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            isInvalid={!!errors.year}
          />
          <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDuration">
          <Form.Label>Duration (minutes)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            isInvalid={!!errors.duration}
          />
          <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={Object.keys(errors).length > 0}>
          Submit
        </Button>
      </Form>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide bg="success">
          <Toast.Body>Request submitted. Thank you!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default MovieRequestForm;
