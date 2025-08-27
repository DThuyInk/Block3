import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Button, Form, Alert, Card } from 'react-bootstrap';

const LoginPage = () => {
	const { login, loading } = useAuth();
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		let errors = {};
		if (!email) errors.email = 'Vui lòng nhập email';
		if (!password) errors.password = 'Vui lòng nhập mật khẩu';
		setFieldErrors(errors);
		if (Object.keys(errors).length > 0) return;

		const result = await login(email, password);
		if (result.success) {
			setError('');
			navigate('/products');
		} else {
			setError(result.message);
		}
	};

	return (
		<div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
			<Card style={{ minWidth: 350, maxWidth: 400 }} className="shadow p-4">
				<h3 className="mb-4 text-center">Đăng nhập</h3>
				<Form onSubmit={handleSubmit}>
					<Form.Group className="mb-3" controlId="formEmail">
						<Form.Label>Email</Form.Label>
						<Form.Control
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							isInvalid={!!fieldErrors.email}
							placeholder="Nhập email"
						/>
						{fieldErrors.email && <Form.Control.Feedback type="invalid">{fieldErrors.email}</Form.Control.Feedback>}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formPassword">
						<Form.Label>Mật khẩu</Form.Label>
						<Form.Control
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							isInvalid={!!fieldErrors.password}
							placeholder="Nhập mật khẩu"
						/>
						{fieldErrors.password && <Form.Control.Feedback type="invalid">{fieldErrors.password}</Form.Control.Feedback>}
					</Form.Group>
					<Button type="submit" variant="primary" className="w-100" disabled={loading}>
						Đăng nhập
					</Button>
					{error && <Alert variant="danger" className="mt-3">{error}</Alert>}
				</Form>
			</Card>
		</div>
	);
};

export default LoginPage;
