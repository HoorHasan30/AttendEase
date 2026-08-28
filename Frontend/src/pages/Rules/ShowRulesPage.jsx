import React from 'react'
import { useEffect, useState } from "react";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { getRules } from '../../services/rulesService'

import '../../index.css'

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function ShowRulesPage() {

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    shiftStart: "",
    shiftEnd: "",
    lateArrivalsAllowed: "",
    lateArrivalDuration: "",
    missedPunches: "",
    countEarlyArraival: false,
    countEarlyLeave: false,
    workingDays: []
  })

  const { shiftStart, shiftEnd,
    lateArrivalsAllowed, lateArrivalDuration, missedPunches,
    countEarlyArraival, countEarlyLeave, workingDays } = formData

  async function loadCompanyRules() {
    try {
      setError("")
      const rules = await getRules()
      setFormData({
        ...rules,
        countEarlyArraival: rules.countEarlyArraival === true,
        countEarlyLeave: rules.countEarlyLeave,
        workingDays: rules.workingDays ?? []
      })
    }
    catch (err) {
      setError(err.response?.data?.message || "Somthing went wrong!");
    }
  }

  useEffect(
    () => {
      document.title = "Company Rules"
      loadCompanyRules()
    },
    []
  )

  return (
    <main className='main-content'>
      {error && <div className="alert alert-danger">{error}</div>}

      <h1>Company Rules</h1>

      <div className="d-flex justify-content-center align-items-center vh-95">
        <div className="border rounded p-4" style={{ maxWidth: "40rem", width: "100%" }}>

          <Form>
            <Form.Text className="d-block mb-2">Working Hours - 24h Format</Form.Text>
            <Row>
              <Col>
                <FloatingLabel controlId="shiftStart" label="Shift Start 00:00" className="mb-3">
                  <Form.Control
                    type="text"
                    name="shiftStart"
                    value={shiftStart}
                    disabled
                    readOnly
                    plaintext
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="shiftEnd" label="Shift End 00:00" className="mb-3">
                  <Form.Control
                    type="text"
                    name="shiftEnd"
                    value={shiftEnd}
                    disabled
                    readOnly
                    plaintext
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Form.Text className="d-block mb-2">Arrival & Leave</Form.Text>
            <Row>
              <Col>
                <Form.Check
                  type="checkbox"
                  id="countEarlyArraival"
                  name="countEarlyArraival"
                  label="Count Early Arrival as Overtime"
                  checked={countEarlyArraival}
                  disabled
                  readOnly
                  className="mb-2"
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  id="countEarlyLeave"
                  name="countEarlyLeave"
                  label="Count Early Leave as Shortage"
                  checked={countEarlyLeave}
                  disabled
                  readOnly
                  className="mb-3"
                />
              </Col>
            </Row>

            <Form.Text className="d-block mb-2">Late Arrival</Form.Text>
            <Row>
              <Col>
                <FloatingLabel controlId="lateArrivalsAllowed" label="Number of Late Arrivals Allowed" className="mb-3">
                  <Form.Control
                    type="number"
                    name="lateArrivalsAllowed"
                    value={lateArrivalsAllowed}
                    disabled
                    readOnly
                    plaintext
                  />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="lateArrivalDuration" label="Late Arrival Duration Allowed (Minutes)" className="mb-3">
                  <Form.Control
                    type="number"
                    name="lateArrivalDuration"
                    value={lateArrivalDuration}
                    disabled
                    readOnly
                    plaintext
                  />
                </FloatingLabel>
              </Col>
            </Row>

            <Form.Text className="d-block mb-2">Punches</Form.Text>
            <FloatingLabel controlId="missedPunches" label="Number of Missed Punches Allowed" className="mb-3">
              <Form.Control
                type="number"
                name="missedPunches"
                value={missedPunches}
                disabled
                readOnly
                plaintext
              />
            </FloatingLabel>

            <Form.Text className="d-block mb-2">Working Days</Form.Text>
            <div className="mb-3">
              {DAYS.map((day) => (
                <Form.Check
                  key={day}
                  type="checkbox"
                  id={`day-${day}`}
                  label={day}
                  inline
                  checked={workingDays.includes(day)}
                  disabled
                  readOnly
                />
              ))}
            </div>
          </Form>
        </div>
      </div>
    </main>
  )
}

export default ShowRulesPage