import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

import { registerCompany } from '../../services/authService'
import { setRules } from '../../services/rulesService';
import { useAuth } from '../../context/AuthContext'

import "../../index.css";


const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


function SignupPage() {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const { user, setUser } = useAuth()

  const [userFormData, setUserFormData] = useState({
    companyName: "",
    username: "",
    password: "",
    confirmPassword: ""
  })
  const { companyName, username, password, confirmPassword } = userFormData

  const [rulesFormData, setRulesFormData] = useState({
    shiftStart: "",
    shiftEnd: "",
    lateArrivalsAllowed: "",
    lateArrivalDuration: "",
    missedPunches: "",
    earlyArrivalOvertime: false,
    earlyLeaveShortage: false,
    workingDays: []
  })

  const { shiftStart, shiftEnd,
    lateArrivalsAllowed, lateArrivalDuration, missedPunches,
    earlyArrivalOvertime, earlyLeaveShortage, workingDays } = rulesFormData

  function handleUserFormChange(event) {
    setError("");
    const { name, type, value, checked } = event.target;

    setUserFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleRulesFormChange(event) {
    setError("");
    const { name, type, value, checked } = event.target;

    setRulesFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }


  function handleDayToggle(day) {
    setError("");
    setRulesFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day) ? prev.workingDays.filter(d => d !== day) : [...prev.workingDays, day]
    }))
  }

  function isUserFormValid() {
    return (companyName && username && password && password === confirmPassword)
  }

  function isRulesFormValid() {
    return (shiftStart && shiftEnd && lateArrivalsAllowed && lateArrivalDuration && missedPunches && workingDays.length > 0)
  }

  function handleNext(event) {
    event.preventDefault()
    if (!isUserFormValid()) {
      setError("Please fill out all fields and make sure passwords match")
      return
    }
    setError("")
    setStep(2)
  }

  function handleBack(event) {
    setError("")
    setStep(1)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isRulesFormValid()) {
      setError("Please fill out all attendance rule fields.");
      return;
    }

    try {
      setSubmitting(true)
      setError("")

      const newCompany = await registerCompany(userFormData)
      setUser(newCompany)

      await setRules({ ...rulesFormData, company: newCompany.company })
      setSubmitting(false)

      navigate('/hr-list')
    }
    catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Somthing went wrong!");
      setSubmitting(false)
    }
  }

  useEffect(
    () => {
      document.title = "Register Compnay"
    },
    []
  )

  return (
    <>
      {/* <h1 className="text-center">Sign Up</h1> */}

      

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-center align-items-center vh-95">
        <div className="border rounded p-4" style={{ maxWidth: "40rem", width: "100%" }}>

          {step === 1 && (
            <Form onSubmit={handleNext}>
              <ProgressBar now={50} className="mb-4" style={{ height: "0.5rem" }} />

              <h3 className='d-flex flex-column justify-content-center align-items-center'> 
                <Image src="src/assets/Logo.png" className="w-25 d-block mx-auto" style={{ margin: "0" }} rounded /> 
                Create Company Account</h3>

              <FloatingLabel controlId="floatingCompanyName" label="Company Name" className="mb-3">
                <Form.Control
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={handleUserFormChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleUserFormChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleUserFormChange}
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleUserFormChange}
                  required
                  isInvalid={confirmPassword.length > 0 && confirmPassword !== password}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              </FloatingLabel>

              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button type="submit" variant="primary" size="sm" className="w-50" active="true" >Next</Button>
              </div>
            </Form>
          )}

          {step === 2 && (
            <Form onSubmit={handleSubmit}>
              <ProgressBar now={100} className="mb-4" style={{ height: "0.5rem" }} />

              <h3 className='d-flex flex-column justify-content-center align-items-center'> 
                <Image src="src/assets/Logo.png" className="w-25 d-block mx-auto" style={{ margin: "0" }} rounded /> 
                Set Attendance Rules</h3>
                
              <Form.Text className="d-block mb-2">Working Hours - Use 24h Format Only</Form.Text>
              <Row>
                <Col>
                  <FloatingLabel controlId="shiftStart" label="Shift Start 00:00" className="mb-3">
                    <Form.Control
                      type="text"
                      name="shiftStart"
                      placeholder="Shift Start 00:00"
                      value={shiftStart}
                      onChange={handleRulesFormChange}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="shiftEnd" label="Shift End 00:00" className="mb-3">
                    <Form.Control
                      type="text"
                      name="shiftEnd"
                      placeholder="Shift End 00:00"
                      value={shiftEnd}
                      onChange={handleRulesFormChange}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>


              <Form.Text className="d-block mb-2">Arrival & Leave</Form.Text>
              <Row>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="earlyArrivalOvertime"
                    name="earlyArrivalOvertime"
                    label="Count Early Arrival as Overtime"
                    checked={earlyArrivalOvertime}
                    onChange={handleRulesFormChange}
                    className="mb-2"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    id="earlyLeaveShortage"
                    name="earlyLeaveShortage"
                    label="Count Early Leave as Shortage"
                    checked={earlyLeaveShortage}
                    onChange={handleRulesFormChange}
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
                      placeholder="Number of Late Arrivals Allowed"
                      value={lateArrivalsAllowed}
                      onChange={handleRulesFormChange}
                      min={0}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel controlId="lateArrivalDuration" label="Late Arrival Duration Allowed (Minutes)" className="mb-3">
                    <Form.Control
                      type="number"
                      name="lateArrivalDuration"
                      placeholder="Late Arrival Duration Allowed (Minutes)"
                      value={lateArrivalDuration}
                      onChange={handleRulesFormChange}
                      min={0}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <Form.Text className="d-block mb-2">Punches</Form.Text>
              <FloatingLabel controlId="missedPunches" label="Number of Missed Punches Allowed" className="mb-3">
                <Form.Control
                  type="number"
                  name="missedPunches"
                  placeholder="Number of Missed Punches Allowed"
                  value={missedPunches}
                  onChange={handleRulesFormChange}
                  min={0}
                  required
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
                    onChange={() => handleDayToggle(day)}
                  />
                ))}
              </div>

              <div className="d-flex justify-content-center gap-2 mt-3">
                <Button type="submit" variant="info" size="sm" active="true" className="w-25" onClick={handleBack}>Back</Button>
                <Button type="submit" variant="primary" size="sm" active="true" className="w-25" disabled={submitting}>
                  {submitting ? "Submitting..." : "Finish"}
                </Button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </>
  )
}

export default SignupPage