import { Form, Row, Col } from "react-bootstrap";

const Filter = (props) => {
    const {searchTerm, handleSearchChange, region, handleRegionChange} = props
    
    return (
        <Row className="mb-4">
          <Col xs={12} md={6}>
            <Form.Control
              type="text"
              placeholder="Search for a country..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Select value={region} onChange={handleRegionChange}>
              <option value="">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </Form.Select>
          </Col>
        </Row>
      );
}

export default Filter;