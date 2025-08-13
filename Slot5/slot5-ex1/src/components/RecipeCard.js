import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function RecipeCard({ recipe, onView, onAddFavourite, favourites }) {
  const isFavourited = favourites?.some(r => r.id === recipe.id);
  return (
    <Card
      className="mb-4 shadow-sm h-100 d-flex flex-column"
      style={{
        borderRadius: '14px',
        overflow: 'hidden',
        maxWidth: '320px', // Giới hạn chiều rộng card
        margin: '0 auto'
      }}
    >
      <Card.Img
        variant="top"
        src={recipe.image}
        alt={recipe.title}
        style={{ height: '140px', objectFit: 'cover' }} // Giảm chiều cao ảnh
      />
      <Card.Body className="d-flex flex-column px-2 pb-2 pt-2"> {/* Giảm padding */}
        <Card.Title
          className="mb-1"
          style={{
            fontWeight: 600,
            fontSize: '1.1rem', // Giảm font
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
        <Card.Text className="mb-2" style={{ color: '#555', fontSize: '0.92rem', textAlign: 'center' }}>
          {recipe.description}
        </Card.Text>
        <div className="mb-2" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            marginTop: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '2px' }}>
              <span style={{ fontWeight: 500, fontSize: '1rem', color: '#234e3c' }}>🍽</span>
              <span style={{ fontWeight: 500, fontSize: '1rem', color: '#234e3c' }}>Servings</span>
              <span style={{ fontSize: '1rem', color: '#222', marginLeft: '4px', fontWeight: 400 }}>{recipe.servings}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '2px' }}>
              <span style={{ fontWeight: 500, fontSize: '1rem', color: '#234e3c' }}>⏱</span>
              <span style={{ fontWeight: 500, fontSize: '1rem', color: '#234e3c' }}>Prep</span>
              <span style={{ fontSize: '1rem', color: '#222', marginLeft: '4px', fontWeight: 400 }}>{recipe.prep} mins</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '2px' }}>
              <span style={{ fontWeight: 500, fontSize: '1rem', color: '#234e3c' }}>🍳</span>
              <span style={{ fontWeight: 500, fontSize: '1rem', color: '#234e3c' }}>Cook</span>
              <span style={{ fontSize: '1rem', color: '#222', marginLeft: '4px', fontWeight: 400 }}>{recipe.cook} mins</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-2 mt-auto">
          <Button
            variant={isFavourited ? "danger" : "outline-danger"}
            onClick={() => onAddFavourite(recipe)}
            className="w-100 d-flex align-items-center justify-content-center"
            style={{
              borderRadius: '12px',
              fontWeight: 500,
              fontSize: '0.98rem',
              padding: '7px 0'
            }}
            disabled={isFavourited}
          >
            <span style={{ fontSize: '1.1rem', marginRight: '6px' }}>♡</span>
            Add to Favourite
            {isFavourited && <Badge bg="danger" style={{ marginLeft: '6px' }}>Added</Badge>}
          </Button>
          <Button
            variant="success"
            onClick={() => onView(recipe)}
            className="w-100"
            style={{
              borderRadius: '12px',
              background: '#234e3c',
              border: 'none',
              fontWeight: 500,
              fontSize: '0.98rem',
              padding: '7px 0'
            }}
          >
            View Recipe
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default RecipeCard;