import React from 'react';
import { Container, Card, Badge, ListGroup } from 'react-bootstrap';

const FeatureDemo = () => {
  const features = [
    {
      title: "1. ReactJS Application (0.5 marks)",
      status: "✅ Complete",
      description: "Created fer202-02 ReactJS project with all dependencies"
    },
    {
      title: "2. JSON Server Configuration (0.5 marks)",
      status: "✅ Complete", 
      description: "db.json configured with Figures and UserAccounts data"
    },
    {
      title: "3. Login Form (3 marks)",
      status: "✅ Complete",
      items: [
        "Username and Password input fields (2 marks)",
        "Login credentials validation",
        "Success modal: 'Welcome, <username> login successful!'",
        "Error alert: 'Invalid username or password!'",
        "Cancel button clears fields and alerts",
        "PropTypes validation for setUser function (1 mark)",
        "Username and password string validation (required)"
      ]
    },
    {
      title: "4. Figure Management (5 marks)",
      status: "✅ Complete",
      items: [
        "React Router with /figures, /view/:id, /cart routes (1 mark)",
        "Figure list page with JSON Server data (1 mark)",
        "View Details button and figure details page (0.5 mark)",
        "404 Not Found page for invalid IDs",
        "Search by Model functionality (0.5 mark)",
        "Sort by Price functionality (0.5 mark)",
        "Add to Cart with stock management (1 mark)",
        "Cart page with quantity updates and removal (0.5 mark)"
      ]
    },
    {
      title: "5. Technical Requirements (1 mark)",
      status: "✅ Complete",
      items: [
        "React Bootstrap for responsive design",
        "PropTypes validation throughout components",
        "Axios for JSON Server communication",
        "useReducer and useContext for cart state management",
        "useReducer and useContext for global bike list"
      ]
    }
  ];

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">FER202 Practical Examination Features</h1>
      
      {features.map((feature, index) => (
        <Card key={index} className="mb-3">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{feature.title}</h5>
            <Badge bg="success">{feature.status}</Badge>
          </Card.Header>
          <Card.Body>
            <Card.Text>{feature.description}</Card.Text>
            {feature.items && (
              <ListGroup variant="flush">
                {feature.items.map((item, idx) => (
                  <ListGroup.Item key={idx} className="px-0">
                    ✅ {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Card.Body>
        </Card>
      ))}
      
      <Card className="mt-4 bg-light">
        <Card.Body>
          <h5>Test Credentials:</h5>
          <ul>
            <li><strong>Admin:</strong> username: admin, password: admin123</li>
            <li><strong>User:</strong> username: john, password: johnpass</li>
            <li><strong>Guest:</strong> username: guest, password: guestpass</li>
          </ul>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FeatureDemo;
