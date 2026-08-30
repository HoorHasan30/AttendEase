import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router'

import '../index.css'

function Homepage() {
  return (
    <div>
      <div className="bg-dark text-white text-center py-5">
        <Container className="py-5">
          <h1 className="display-4 fw-bold mb-4">
            Attendance Tracking,<br />Made Effortless
          </h1>
          <p className="lead text-white-50 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Upload punches, set your shift rules, and let the system handle late
            arrivals, missed punches, overtime, and shortages automatically.
          </p>
          <div className="d-flex justify-content-center">
            <Link to="/sign-up-company">
              <Button variant="info" className='w-100'>Get Started!</Button>
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        <Row className="g-4">
          <Col md={4}>
            <div
              className="d-flex align-items-center justify-content-center bg-primary rounded mb-3"
              style={{ width: "56px", height: "56px" }}
            >
              <i className="bi bi-upload text-white fs-4"></i>
            </div>
            <h2 className="h5 fw-bold mb-2">Upload Punches</h2>
            <p className="text-muted">
              Import attendance files and process every clock-in and clock-out in one go.
            </p>
          </Col>

          <Col md={4}>
            <div
              className="d-flex align-items-center justify-content-center bg-primary rounded mb-3"
              style={{ width: "56px", height: "56px" }}
            >
              <i className="bi bi-sliders text-white fs-4"></i>
            </div>
            <h2 className="h5 fw-bold mb-2">Custom Company Rules</h2>
            <p className="text-muted">
              Define shift hours and late arrival allowances that match your own policy.
            </p>
          </Col>

          <Col md={4}>
            <div
              className="d-flex align-items-center justify-content-center bg-primary rounded mb-3"
              style={{ width: "56px", height: "56px" }}
            >
              <i className="bi bi-bar-chart-line text-white fs-4"></i>
            </div>
            <h2 className="h5 fw-bold mb-2">Dashboard & Reports</h2>
            <p className="text-muted">
              Track overtime and shortage trends by date range at a glance.
            </p>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Homepage