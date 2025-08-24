import React from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useFigures } from '../contexts/FigureContext';
import axios from 'axios';
import Footer from '../components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getTotalAmount, clearCart } = useCart();
  const { updateFigureStock } = useFigures();

  const handleQuantityChange = async (id, newQuantity) => {
    const item = cartItems.find(item => item.id === id);
    if (item && newQuantity > 0) {
      const quantityDiff = item.quantity - newQuantity;
      updateQuantity(id, newQuantity);
      
      // Update stock in the database (restore the difference)
      try {
        const currentFigure = await axios.get(`http://localhost:3001/Figures/${id}`);
        const newStock = currentFigure.data.stock + quantityDiff;
        await updateFigureStock(id, newStock);
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    }
  };

  const handleRemove = async (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      try {
        // Get current stock from database and restore the cart quantity
        const currentFigure = await axios.get(`http://localhost:3001/Figures/${id}`);
        const newStock = currentFigure.data.stock + item.quantity;
        await updateFigureStock(id, newStock);
        removeFromCart(id);
      } catch (error) {
        console.error('Error restoring stock:', error);
        // Still remove from cart even if stock update fails
        removeFromCart(id);
      }
    }
  };

  const handleBackToList = () => {
    navigate('/figures');
  };

  const handleCheckout = () => {
    // Clear cart after checkout
    clearCart();
    alert('Order placed successfully!');
    navigate('/figures');
  };

  if (cartItems.length === 0) {
    return (
  <Container className="py-4" style={{ paddingBottom: '60px' }}>
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p>Add some figures to your cart to see them here.</p>
          <Button variant="primary" onClick={handleBackToList}>
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      
      <Container className="py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Your Cart</h1>
          <Button variant="secondary" onClick={handleBackToList}>
            Continue Shopping
        </Button>
      </div>

      <Row>
        <Col lg={8}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Type</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img 
                        src={item.image} 
                        alt={item.model}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '10px' }}
                        onError={(e) => {
                          e.target.src = '/logo192.png';
                        }}
                      />
                      <div>
                        <strong>{item.brand} {item.model}</strong>
                        <br />
                        <small className="text-muted">Year: {item.year}</small>
                      </div>
                    </div>
                  </td>
                  <td>${parseFloat(item.price.replace('$', '')).toFixed(2)}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                      style={{ width: '80px' }}
                    />
                  </td>
                  <td>
                    ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col lg={4}>
          <div className="card">
            <div className="card-body">
              <h4>Order Summary</h4>
              <hr />
              
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({cartItems.reduce((total, item) => total + item.quantity, 0)}):</span>
                <span>${getTotalAmount().toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <strong>Total: ${getTotalAmount().toFixed(2)}</strong>
              </div>
              
              <div className="d-grid">
                <Button variant="success" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row> 
      <Footer />     
    </Container>
    </>
  );
};

export default Cart;
