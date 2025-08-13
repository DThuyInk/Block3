import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import SortDropdown from './SortDropdown';

function Filters({ prepFilter, setPrepFilter, cookFilter, setCookFilter, searchTerm, setSearchTerm, sortBy, setSortBy }) {
  return (
    <Row className="mb-5">
      <Col xs={12} md={7} className="d-flex align-items-center" style={{ justifyContent: 'flex-start', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px', width: '480px' }}>
          <Form.Select
            value={prepFilter}
            onChange={e => setPrepFilter(e.target.value)}
            style={{ width: '200px' }}
            className="filter-select"
          >
            <option value="all">Max Prep Time</option>
            <option value="0-5">0-5 mins</option>
            <option value="6-10">6-10 mins</option>
            <option value="11+">11+ mins</option>
          </Form.Select>
          <Form.Select
            value={cookFilter}
            onChange={e => setCookFilter(e.target.value)}
            style={{ width: '200px' }}
            className="filter-select"
          >
            <option value="all">Max Cook Time</option>
            <option value="0-5">0-5 mins</option>
            <option value="6-15">6-15 mins</option>
            <option value="16+">16+ mins</option>
          </Form.Select>
        </div>
        <div style={{ marginLeft: '16px', minWidth: '180px', display: 'flex', alignItems: 'center' }}>
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </Col>
      <Col xs={12} md={5} className="d-flex align-items-center" style={{ justifyContent: 'flex-end' }}>
        <div style={{ width: '320px', marginLeft: 'auto' }}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by name or ingredient..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </InputGroup>
        </div>
      </Col>
    </Row>
  );
}

export default Filters;