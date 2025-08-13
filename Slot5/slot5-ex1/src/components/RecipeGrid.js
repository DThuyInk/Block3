import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

function RecipeGrid({ recipes, onView }) {
  return (
    <Row xs={1} md={2} lg={3} className="g-5">
      {recipes.length > 0 ? (
        recipes.map((recipe, idx) => (
          <Col key={idx}>
            <RecipeCard recipe={recipe} onView={onView} />
          </Col>
        ))
      ) : (
        <Col>
          <div className="text-center text-muted py-5">No recipes found.</div>
        </Col>
      )}
    </Row>
  );
}

export default RecipeGrid;