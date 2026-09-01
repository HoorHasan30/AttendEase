import React, { useState, useEffect } from 'react'

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col'

import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'

import { dashboardData } from '../../services/recordService'
import { useAuth } from '../../context/AuthContext';

import '../../index.css'

function DashboardPage() {

  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({ from: "", to: "" })
  const { from, to } = formData

  const [summary, setSummary] = useState(null)

  const { user } = useAuth()

  function handleChange(event) {
    setError("");
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function loadData(event) {
    event?.preventDefault();

    try {
      setError("")
      setSubmitting(true)

      const data = await dashboardData(formData)
      setSummary(data)
    }
    catch (err) {
      setError(err?.response?.data?.message || "Failed to load dashboard data.");
    }
    finally {
      setSubmitting(false)
    }
  }

  // set date to this month automatically
  function getMonthRange() {
    const now = new Date()
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const toISODate = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

    return {
      from: toISODate(firstDay),
      to: toISODate(lastDay),
    }
  }

  useEffect(
    () => {
      document.title = "Dashboard"
      setFormData(getMonthRange())
    },
    []
  )

  useEffect(
    () => {
      if (from && to) {
        loadData()
      }
    },
    [from, to]
  )

  return (
    <main className='main-content'>
      {error && <div className="alert alert-danger">{error}</div>}

      <h1>Welcome {user.username}!</h1>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title as="h5" className="mb-3">Filter By Date</Card.Title>
          <Form onSubmit={loadData}>
            <Row>
              <Col md={4}>
                <Form.Text className="d-block mb-2">From</Form.Text>
                <Form.Control
                  type="date"
                  name="from"
                  value={from}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={4}>
                <Form.Text className="d-block mb-2">To</Form.Text>
                <Form.Control
                  type="date"
                  name="to"
                  value={to}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={4} className="d-flex align-items-end">
                <Button type="submit" variant="primary" className="w-50" disabled={submitting}>{submitting ? "Filtering..." : "Filter"}</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {summary && (
        <Row>
          <Col md={4} className="g-1">
            <Row className="m-0">
              <Col>
                <Card className="shadow-sm text-center">
                  <Card.Body>
                    <Card.Title as="h6" className="text-muted mb-2">Total Employees</Card.Title>
                    <p className="display-6 fw-bold text-primary mb-0">{summary.totalEmployees}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="g-3 mt-2 m-0">
              <Col>
                <Card className="shadow-sm text-center">
                  <Card.Body>
                    <Card.Title as="h6" className="text-muted mb-2">Total Shortage</Card.Title>
                    <p className="display-6 fw-bold text-danger mb-0">{summary.totalShortage} min</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="g-3 mt-2 m-0 mb-3">
              <Col>
                <Card className="shadow-sm text-center">
                  <Card.Body>
                    <Card.Title as="h6" className="text-muted mb-2">Total Overtime</Card.Title>
                    <p className="display-6 fw-bold text-success mb-0">{summary.totalOvertime} min</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title as="h5" className="mb-3">Shortage & Overtime</Card.Title>
                {summary.trendChartData?.length > 0 ? (
                  <Line
                    data={{
                      labels: summary.trendChartData.map(d => d.date),
                      datasets: [
                        { label: "Shortage", data: summary.trendChartData.map(d => d.shortage), borderColor: "#a13d3d" },
                        { label: "Overtime", data: summary.trendChartData.map(d => d.overtime), borderColor: "#4f7a63" },
                      ],
                    }}
                  />
                ) : (
                  <p className="text-muted mb-0">No data available for the selected date range.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
          
        </Row>
      )}

    </main>
  )
}

export default DashboardPage