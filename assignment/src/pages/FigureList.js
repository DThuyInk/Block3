import React, { useState, useMemo } from 'react';
import Footer from '../components/Footer';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFigures } from '../contexts/FigureContext';
import { useCart } from '../contexts/CartContext';
import Carousel from '../components/Carousel';

const FigureList = () => {
	const navigate = useNavigate();
	const { figures, loading, error, updateFigureStock, addFavourite, removeFavourite, favourites } = useFigures();
	const { addToCart } = useCart();
	const handleAddFavourite = (figure) => {
		addFavourite(figure);
		setAlertMessage(`${figure.name} added to Favourites.`);
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 2000);
	};
	const handleRemoveFavourite = (figure) => {
		removeFavourite(figure.id);
		setAlertMessage(`${figure.name} removed from Favourites.`);
		setShowAlert(true);
		setTimeout(() => setShowAlert(false), 2000);
	};
  
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');

	// Filter and sort figures
	const filteredAndSortedFigures = useMemo(() => {
		let filtered = figures.filter(figure =>
			figure.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		if (sortOrder === 'lowToHigh') {
			filtered.sort((a, b) => Number(a.price.replace(/[^\d]/g, '')) - Number(b.price.replace(/[^\d]/g, '')));
		} else if (sortOrder === 'highToLow') {
			filtered.sort((a, b) => Number(b.price.replace(/[^\d]/g, '')) - Number(a.price.replace(/[^\d]/g, '')));
		} else if (sortOrder === 'nameAZ') {
			filtered.sort((a, b) => a.name.localeCompare(b.name));
		} else if (sortOrder === 'nameZA') {
			filtered.sort((a, b) => b.name.localeCompare(a.name));
		}

		return filtered;
	}, [figures, searchTerm, sortOrder]);

	const handleViewDetails = (id) => {
		navigate(`/view/${id}`);
	};

	const handleAddToCart = async (figure) => {
		if (figure.stock > 0) {
			try {
				await updateFigureStock(figure.id, figure.stock - 1);
				addToCart(figure);
				setAlertMessage(`${figure.name} has been added to your cart.`);
				setShowAlert(true);
				setTimeout(() => setShowAlert(false), 3000);
			} catch (error) {
				setAlertMessage('Error adding to cart. Please try again.');
				setShowAlert(true);
				setTimeout(() => setShowAlert(false), 3000);
			}
		} else {
			setAlertMessage('This figure is out of stock.');
			setShowAlert(true);
			setTimeout(() => setShowAlert(false), 3000);
		}
	};

	if (loading) {
		return (
			<Container className="d-flex justify-content-center align-items-center min-vh-100">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</Container>
		);
	}

	if (error) {
		return (
			<Container className="mt-5">
				<Alert variant="danger">{error}</Alert>
			</Container>
		);
	}

	   return (
		   <>
			   <Container className="mt-5">
				   {/* Carousel Banner */}
				   <Row className="mb-4">
					   <Col xs={12}>
						   <Carousel
							   figures={figures.slice(0, 4).map(f => ({
								   ...f,
								   alt: `${f.name} - ${f.brand}`
							   }))}
						   />
					   </Col>
				   </Row>
				   <Row className="mb-3">
					   <Col md={6}>
						   <Form.Control
							   type="text"
							   placeholder="Search figures..."
							   value={searchTerm}
							   onChange={e => setSearchTerm(e.target.value)}
						   />
					   </Col>
					   <Col md={6} className="d-flex justify-content-end">
						   <Form.Select
							   value={sortOrder}
							   onChange={e => setSortOrder(e.target.value)}
							   style={{ maxWidth: '200px' }}
						   >
							   <option value="">Sort by...</option>
							   <option value="lowToHigh">Price Low to High</option>
							   <option value="highToLow">Price High to Low</option>
							   <option value="nameAZ">Name A → Z</option>
							   <option value="nameZA">Name Z → A</option>
						   </Form.Select>
					   </Col>
				   </Row>
				   <Row>
					   {filteredAndSortedFigures.map(figure => (
						   <Col key={figure.id} lg={3} md={6} className="mb-4">
							   <Card>
								   <Card.Img 
									   variant="top" 
									   src={figure.image} 
									   style={{ height: '200px', objectFit: 'cover', objectPosition: 'top' }}
									   onError={(e) => {
										   e.target.src = '/logo192.png'; // Fallback image
									   }} 
								   />
								   <Card.Body>
									   <Card.Title>{figure.name} {figure.type}</Card.Title>
									   <Card.Text>
										   <strong>Brand:</strong> {figure.brand}<br />
										   <strong>Price:</strong> {figure.price}<br />
										   <strong>Stock:</strong> {figure.stock}
									   </Card.Text>
									   <div className="mt-auto">
										   <div className="d-grid gap-2">
											   <Button 
												   variant="primary" 
												   onClick={() => handleViewDetails(figure.id)}
											   >
												   View Details
											   </Button>
											   <Button 
												   variant="success" 
												   onClick={() => handleAddToCart(figure)}
												   disabled={figure.stock === 0}
											   >
												   Add to Cart
											   </Button>
											   {favourites.includes(figure.id) ? (
												   <Button
													   variant="secondary"
													   onClick={() => handleRemoveFavourite(figure)}
												   >
													   Remove from Favourites
												   </Button>
											   ) : (
												   <Button
													   variant="danger"
													   onClick={() => handleAddFavourite(figure)}
												   >
													   Add to Favourites
												   </Button>
											   )}
										   </div>
									   </div>
								   </Card.Body>
							   </Card>
						   </Col>
					   ))}
				   </Row>
				   {showAlert && <Alert variant="info" className="mt-3">{alertMessage}</Alert>}
			   </Container>
			   <Footer />
		   </>
	   );
};

export default FigureList;
