import React, { useState } from 'react';
import { Container, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import Footer from '../components/Footer';

const Login = () => {
	const { login } = useAuth();
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
						login(user);
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
			  <div className="w-100" style={{ maxWidth: '400px' }}>
				<div className="card shadow">
				  <div className="card-body">
					<h2 className="text-center mb-4">Login</h2>
					
					<Form onSubmit={handleSubmit} autoComplete="off">
					  <Form.Group className="mb-3">
						<Form.Label>Username</Form.Label>
						<Form.Control
						  type="text"
						  value={username}
						  onChange={(e) => setUsername(e.target.value)}
						  required
						  placeholder="Enter username"
						  isInvalid={showAlert && !username}
						  autoComplete="username"
						/>
						<Form.Control.Feedback type="invalid">
						  Username is required
						</Form.Control.Feedback>
					  </Form.Group>
		
					  <Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
						  type="password"
						  value={password}
						  onChange={(e) => setPassword(e.target.value)}
						  required
						  placeholder="Enter password"
						  isInvalid={showAlert && !password}
						  autoComplete="current-password"
						/>
						<Form.Control.Feedback type="invalid">
						  Password is required
						</Form.Control.Feedback>
					  </Form.Group>
		
					  {showAlert && (
						<Alert variant="danger" className="mb-3">
						  {alertMessage}
						</Alert>
					  )}
		
					  <div className="d-grid gap-2">
						<Button variant="primary" type="submit">
						  Login
						</Button>
						<Button variant="secondary" type="button" onClick={handleCancel}>
						  Cancel
						</Button>
					  </div>
					</Form>
				  </div>
				</div>
		
				{/* Success Modal */}
				<Modal show={showModal} onHide={() => setShowModal(false)} centered>
				  <Modal.Header closeButton>
					<Modal.Title>Login Successful</Modal.Title>
				  </Modal.Header>
				  <Modal.Body>
					Welcome, {username} login successful!
				  </Modal.Body>
				  <Modal.Footer>
					<Button variant="primary" onClick={() => {
					  setShowModal(false);
					  navigate('/figures');
					}}>
					  OK
					</Button>
				  </Modal.Footer>
				</Modal>
			  </div>
			<Footer />
			</Container>
	);
};



export default Login;
