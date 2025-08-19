import React from 'react';
import PropTypes from 'prop-types';

const StudentCard = ({student, onViewDetails}) => (
  <div
    style={{
      border: '1px solid #e0e0e0',
      borderRadius: '16px',
      padding: '1.5rem',
      background: 'linear-gradient(135deg, #f8fafc 80%, #e3f2fd 100%)',
      boxShadow: '0 4px 24px rgba(33, 150, 243, 0.10)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      transition: 'box-shadow 0.2s',
      width: '300px',
      height: '220px'
    }}
    onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(33,150,243,0.18)')}
    onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 24px rgba(33,150,243,0.10)')}
  >
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 1}}>
      <div style={{display: 'inline-block', marginRight: '1rem'}}>
  <img src={student.avatar} alt={student.name} style={{width: '115px', height: '160px', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 2px 8px #e3f2fd', display: 'block'}} />
      </div>
      <div style={{flex: 1, textAlign: 'left'}}>
        <h3 style={{margin: '0 0 0.5rem 0', fontWeight: 700, fontSize: '1.25rem', color: '#1976d2'}}>{student.name}</h3>
        <div style={{fontSize: '1rem', color: '#333', lineHeight: 1.5}}>
          <div><strong>ID:</strong> {student.id}</div>
          <div><strong>Email:</strong> {student.email}</div>
          <div><strong>Age:</strong> {student.age}</div>
        </div>
      </div>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '1.5rem'}}>
      <button
        onClick={() => onViewDetails(student)}
        style={{
          padding: '0.7rem 2rem',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #e3f2fd',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#1565c0')}
        onMouseLeave={e => (e.currentTarget.style.background = '#1976d2')}
      >
        View Details
      </button>
    </div>
  </div>
);

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default StudentCard;
