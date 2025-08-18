import React from 'react';

const SortDropdown = ({sortType, setSortType}) => (
  <div>
    <label style={{marginRight: '0.5rem'}}>Sort:</label>
    <select value={sortType} onChange={e => setSortType(e.target.value)} style={{padding: '0.3rem'}}>
      <option value="none">Default</option>
      <option value="ageAsc">Age ↑</option>
      <option value="ageDesc">Age ↓</option>
      <option value="nameAsc">Name A→Z</option>
      <option value="nameDesc">Name Z→A</option>
    </select>
  </div>
);

export default SortDropdown;
