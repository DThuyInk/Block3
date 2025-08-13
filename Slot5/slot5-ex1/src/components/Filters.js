import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';

function Filters({ prepFilter, setPrepFilter, cookFilter, setCookFilter, searchTerm, setSearchTerm }) {
  return (
    <Row className="mb-5">
      <Col xs={12} md={6} className="d-flex align-items-center" style={{ justifyContent: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '16px', width: '400px' }}>
          <Form.Select
            value={prepFilter}
            onChange={e => setPrepFilter(e.target.value)}
            style={{ width: '190px' }}
          >
            <option value="all">Max Prep Time</option>
            <option value="0-5">0-5 mins</option>
            <option value="6-10">6-10 mins</option>
            <option value="11+">11+ mins</option>
          </Form.Select>
          <Form.Select
            value={cookFilter}
            onChange={e => setCookFilter(e.target.value)}
            style={{ width: '190px' }}
          >
            <option value="all">Max Cook Time</option>
            <option value="0-5">0-5 mins</option>
            <option value="6-15">6-15 mins</option>
            <option value="16+">16+ mins</option>
          </Form.Select>
        </div>
      </Col>
      <Col xs={12} md={6} className="d-flex align-items-center" style={{ justifyContent: 'flex-end' }}>
        <div style={{ width: '320px' }}>
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