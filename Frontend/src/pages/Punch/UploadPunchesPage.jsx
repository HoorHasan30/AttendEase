import React, { useState, useEffect } from 'react'

import { uploadPunches, calculateData } from '../../services/punchService'

import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

function UploadPunchesPage() {

  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [file, setFile] = useState(null)

  // const [formData, setFormData] = useState([])
  // const { punchData } = formData


  async function handleSubmit(event) {
    event.preventDefault()

    if (!file) {
      setError("Please select a file to upload.")
      return
    }

    try {
      setSubmitting(true)
      setError("")
      setSuccess(false)

      const data = new FormData()
      data.append("punchData", file)

      await uploadPunches(data)
      await calculateData()

      setSuccess(true)
      setFile(null)
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
    finally {
      setSubmitting(false)
    }
  }

  function handleChange(event) {
    setFile(event.target.files[0])
  }


  useEffect(
    () => {
      document.title = "Upload Attendance File";
    },
    []
  )

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  return (
    <main className='main-content'>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Calculation Complete Succesfully!</div>}

      <h1>Upload Attendance File</h1>

      <div className="d-flex justify-content-center align-items-center vh-97">
        <div className="border rounded p-4" style={{ maxWidth: "40rem", width: "100%" }}>

          <Form onSubmit={handleSubmit}>
            <Form.Text className="d-block mb-2">Upload the file that contains the attendance punches</Form.Text>

            <Form.Control
              type="file"
              name="punchData"
              accept=".xlsx"
              onChange={handleChange}
            />

            <div className="d-flex justify-content-center gap-2 mt-3">
              <Button type="submit" variant="primary" size="sm" className="w-50" disabled={submitting} >{submitting ? "Calculating..." : "Upload"}</Button>
            </div>

          </Form>

        </div>
      </div>



    </main>
  )
}

export default UploadPunchesPage