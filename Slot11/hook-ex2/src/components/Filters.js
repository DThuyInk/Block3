import React from 'react';

const Filters = ({search, setSearch, ageRange, setAgeRange, hasAvatar, setHasAvatar}) => (
  <div style={{display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap'}}>
    <input
      type="text"
      placeholder="Search by name/email..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #90caf9'}}
    />
    <div>
      <label style={{marginRight: '0.5rem'}}>Age range:</label>
      <select value={ageRange} onChange={e => setAgeRange(e.target.value)} style={{padding: '0.3rem'}}>
        <option value="all">All</option>
        <option value="lte20">≤20</option>
        <option value="21to25">21–25</option>
        <option value="gt25">&gt;25</option>
      </select>
    </div>
    <div>
      <label>
        <input type="checkbox" checked={hasAvatar} onChange={e => setHasAvatar(e.target.checked)} />
        <span style={{marginLeft: '0.5rem'}}>Has avatar</span>
      </label>
    </div>
  </div>
);

export default Filters;
