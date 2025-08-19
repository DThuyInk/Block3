import React from 'react';
import StudentCard from './StudentCard';

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1rem',
  marginTop: '1rem',
  justifyContent: 'center',
  width: '80%',
  margin: '0 auto',
};

const cardWrapperStyle = {
  width: '100%',
  margin: '0 auto',
};

const StudentGrid = ({students, onViewDetails}) => (
  <div style={gridStyle}>
    {students.map(s => (
      <div style={cardWrapperStyle} key={s.id}>
        <StudentCard student={s} onViewDetails={onViewDetails} />
      </div>
    ))}
  </div>
);

export default StudentGrid;
