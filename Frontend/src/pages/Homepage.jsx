import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router'

import '../index.css'

const FEATURES = [
  {
    icon: "bi-upload",
    title: "Upload Punches",
    text: "Import attendance files and process every clock-in and clock-out in one go.",
  },
  {
    icon: "bi-sliders",
    title: "Custom Company Rules",
    text: "Define shift hours and late arrival allowances that match your own policy.",
  },
  {
    icon: "bi-bar-chart-line",
    title: "Dashboard & Reports",
    text: "Track overtime and shortage trends by date range at a glance.",
  },
]

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
          {FEATURES.map((feature) => (
            <Col md={4} key={feature.title}>
              <div
                className="d-flex align-items-center justify-content-center bg-primary rounded mb-3"
                style={{ width: "56px", height: "56px" }}
              >
                <i className={`bi ${feature.icon} text-white fs-4`}></i>
              </div>
              <h2 className="h5 fw-bold mb-2">{feature.title}</h2>
              <p className="text-muted">{feature.text}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default Homepage