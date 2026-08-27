import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

import { signIn } from '../../services/authService';
import { useAuth } from '../../context/AuthContext'

import "../../index.css";

function SigninPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false)

  const { user, setUser } = useAuth()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  })
  const { username, password } = formData

  function handleChange(event) {
    setError("");
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function isFormValid() {
    return (username && password)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!isFormValid) {
      setError("Please fill out all the fields.");
      return;
    }

    try {
      setSubmitting(true)
      setError("")

      const signedInUser = await signIn(formData)
      setUser(signedInUser)

      setSubmitting(false)

      if (signedInUser.role == "Company") {
        navigate('/hr-list')
      }
      else if (signedInUser.role == "HR") {
        navigate('/dashboard')
      }

    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
  }

  useEffect(
    () => {
      document.title = "SignIn"
    },
    []
  )

  return (
    <>
      {/* <h1 className="text-center">Sign Up</h1> */}
      <Image src="src/assets/Logo.png" className="col-2 d-block mx-auto" style={{ margin: "0" }} rounded />

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-flex justify-content-center align-items-center flex-column vh-95">

        <div className="border rounded p-4" style={{ maxWidth: "40rem", width: "100%" }}>
          <Form onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                required
              />
            </FloatingLabel>

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button type="submit" variant="primary" size="sm" active="true" className="w-25" disabled={submitting}>
                {submitting ? "Submitting..." : "Sign In"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default SigninPage