import React from 'react';
import { Form } from 'react-bootstrap';

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name A→Z' },
  { value: 'name-desc', label: 'Name Z→A' },
  { value: 'prep-asc', label: 'Prep ↑' },
  { value: 'prep-desc', label: 'Prep ↓' },
  { value: 'cook-asc', label: 'Cook ↑' },
  { value: 'cook-desc', label: 'Cook ↓' },
];

function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="sort-dropdown" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
      <Form.Label
        htmlFor="sort-select"
        style={{
          marginRight: '8px',
          fontWeight: '500',
          marginBottom: 0,
          whiteSpace: 'nowrap'
        }}
      >
        Sort by:
      </Form.Label>
      <Form.Select
        id="sort-select"
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        style={{ width: '150px' }}
        className="filter-select"
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default SortDropdown;
