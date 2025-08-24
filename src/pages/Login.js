import React, { useState } from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = ({ setUser }) => {
	const navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [showModal, setShowModal] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
    
		try {
			const response = await axios.get('http://localhost:3001/UserAccounts');
			const users = response.data;
      
			const user = users.find(u => u.username === username && u.password === password);
      
			if (user) {
				setUser(user);
				setShowModal(true);
				setShowAlert(false);
        
				// Redirect after modal closes
				setTimeout(() => {
					setShowModal(false);
					navigate('/figures');
				}, 2000);
			} else {
				setAlertMessage('Invalid username or password!');
				setShowAlert(true);
			}
		} catch (error) {
			setAlertMessage('Error connecting to server');
			setShowAlert(true);
		}
	};

	const handleCancel = () => {
		setUsername('');
		setPassword('');
		setShowAlert(false);
	};

	return (
		<Container className="d-flex justify-content-center align-items-center min-vh-100">
			<Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: '400px' }}>
				<h2 className="mb-4">Login</h2>
				{showAlert && <Alert variant="danger">{alertMessage}</Alert>}
				<Form.Group className="mb-3" controlId="formUsername">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</Form.Group>
				<div className="d-flex justify-content-between">
					<Button variant="primary" type="submit">Login</Button>
					<Button variant="secondary" type="button" onClick={handleCancel}>Cancel</Button>
				</div>
			</Form>
			<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				<Modal.Body>Login successful! Redirecting...</Modal.Body>
			</Modal>
		</Container>
	);
};

Login.propTypes = {
	setUser: PropTypes.func.isRequired,
};

export default Login;
