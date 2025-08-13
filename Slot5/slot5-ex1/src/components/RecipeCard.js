import React from 'react';
import { Card, Button } from 'react-bootstrap';

const info = [
  {
    icon: <span style={{ fontSize: '2.2rem', display: 'block' }} role="img" aria-label="servings">🍽️</span>,
    label: 'Servings:',
    value: (recipe) => recipe.servings
  },
  {
    icon: <span style={{ fontSize: '2.2rem', display: 'block' }} role="img" aria-label="prep">⏱️</span>,
    label: 'Prep:',
    value: (recipe) => `${recipe.prep} mins`
  },
  {
    icon: <span style={{ fontSize: '2.2rem', display: 'block' }} role="img" aria-label="cook">🍳</span>,
    label: 'Cook:',
    value: (recipe) => `${recipe.cook} mins`
  }
];

function RecipeCard({ recipe, onView }) {
  return (
    <Card className="mb-4 shadow-sm h-100 d-flex flex-column" style={{ borderRadius: '18px', overflow: 'hidden' }}>
      <Card.Img
        variant="top"
        src={recipe.image}
        alt={recipe.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column px-3 pb-3 pt-2">
        <Card.Title
          className="mb-1"
          style={{
            fontWeight: 600,
            fontSize: '1.25rem',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
            width: '100%',
            color: '#234e3c'
          }}
          title={recipe.title}
        >
          {recipe.title}
        </Card.Title>
        <Card.Text className="mb-2" style={{ color: '#555', fontSize: '0.97rem', textAlign: 'center' }}>
          {recipe.description}
        </Card.Text>
        <div className="mb-3" style={{ width: '100%' }}>
          {/* Icons row */}
          <div className="d-flex justify-content-center" style={{ gap: '32px' }}>
            {info.map((item, idx) => (
              <div key={idx} style={{ width: 110, textAlign: 'center' }}>
                {item.icon}
              </div>
            ))}
          </div>
          {/* Labels row */}
          <div className="d-flex justify-content-center" style={{ gap: '32px', marginTop: '-2px' }}>
            {info.map((item, idx) => (
              <div key={idx} style={{ width: 110, textAlign: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '1.25rem' }}>{item.label}</span>
              </div>
            ))}
          </div>
          {/* Values row */}
          <div className="d-flex justify-content-center" style={{ gap: '32px', marginTop: '-2px' }}>
            {info.map((item, idx) => (
              <div key={idx} style={{ width: 110, textAlign: 'center' }}>
                <span style={{ fontSize: '1.15rem' }}>{item.value(recipe)}</span>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="success"
          onClick={() => onView(recipe)}
          className="mt-auto w-100"
          style={{
            borderRadius: '16px',
            background: '#234e3c',
            border: 'none',
            fontWeight: 500,
            fontSize: '1.05rem',
            padding: '10px 0'
          }}
        >
          View Recipe
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;