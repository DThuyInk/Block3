import React from 'react';

const StudentDetailModal = ({student, onClose}) => {
  if (!student) return null;
  return (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000}}>
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 80%, #e3f2fd 100%)',
          padding: '1.5rem',
          borderRadius: '16px',
          minWidth: '340px',
          maxWidth: '90vw',
          boxShadow: '0 4px 24px rgba(33, 150, 243, 0.10)',
        }}
      >
        <h2 style={{marginBottom: '1.2rem', color: '#1976d2'}}>Student Details</h2>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
            onClick={onClose}
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailModal;
