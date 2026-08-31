import React from 'react'
import { useState, useEffect } from 'react';

import { getAllCompanyRecords } from '../../services/recordService';
import { uploadPunches, calculateData } from '../../services/punchService'

import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col'

import * as XLSX from 'xlsx';

import '../../index.css'

function EmployeeRecordsPage() {
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [file, setFile] = useState(null)

  const columns = [
    {
      name: "Employee Id",
      selector: row => row.punchRecord.employeeId,
      sortable: true
    },
    {
      name: "Date",
      selector: row => row.punchRecord.date.split("T")[0],
      sortable: true
    },
    {
      name: "Worked Hours",
      selector: row => row.workedHours,
      sortable: true
    },
    {
      name: "Shortage in Minutes",
      selector: row => row.shortage,
      sortable: true
    },
    {
      name: "Overtime in Minutes",
      selector: row => row.overtime,
      sortable: true
    },
    {
      name: "Notes",
      cell: row => {
        if (!row.notes) return <span>-</span>;

        if (Array.isArray(row.notes)) {
          return row.notes.length > 0 ? (
            <ul className="mb-0 ps-3">
              {row.notes.map((note, i) => (
                <li key={i}>{note}</li>
              ))}
            </ul>
          )
            : <span>-</span>;
        }

        return <span>{row.notes}</span>;
      },
      wrap: true,
    }
  ]

  const [tableData, setTableData] = useState([])
  const [records, setRecords] = useState(tableData)
  const [search, setSearch] = useState("")

  const customStyles = {
    table: {
      style: {
        borderRadius: '0.375rem',
        overflow: 'hidden',
      },
    },
    headRow: {
      style: {
        backgroundColor: 'var(--bs-primary)',
        color: 'var(--bs-body-bg)',
        borderBottom: '1px solid var(--bs-info)',
      },
    },
    rows: {
      style: {
        backgroundColor: 'none',
      },
      highlightOnHoverStyle: {
        backgroundColor: 'var(--bs-info)',
      },
    },
  };

  async function loadData() {
    try {
      setError("")

      const res = await getAllCompanyRecords()
      setTableData(res)
      setRecords(res)
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
  }

  function handleFilter(event) {
    const searchedWord = event.target.value
    setSearch(searchedWord)

    const newData = tableData.filter(row =>
      row.punchRecord?.employeeId.toLowerCase().includes(searchedWord.toLowerCase())
    )

    setRecords(newData)
  }

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
      await loadData()

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

  function handleExportExcel() {
    if (records.length === 0) {
      setError("No records to export!")
      return
    }

    const exportData = records.map(row => ({
      "Employee Id": row.punchRecord.employeeId,
      "Date": row.punchRecord.date.split("T")[0],
      "Worked Hours": row.workedHours,
      "Shortage in Minutes": row.shortage,
      "Overtime in Minutes": row.overtime,
      "Notes": Array.isArray(row.notes) ? row.notes.join("; ") : (row.notes || "-")
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employee Records")

    const dateStr = new Date().toISOString().split("T")[0]
    XLSX.writeFile(workbook, `EmployeeRecords_${dateStr}.xlsx`)
  }



  useEffect(
    () => {
      document.title = "Emp Records"
      loadData()
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

      <h1>Employees Records</h1>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title as="h5" className="mb-3">Attendance</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Text className="d-block mb-2">Upload the file that contains the attendance punches (.xlsx only)</Form.Text>
            <Row>
              <Col md={4}>
                <Form.Control
                  type="file"
                  name="punchData"
                  accept=".xlsx"
                  onChange={handleChange}
                />
              </Col>
              <Col md={4} className="d-flex">
                <Button type="submit" variant="primary" size="sm" className="w-50" disabled={submitting} >{submitting ? "Calculating..." : "Upload"}</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col>
              <div className="d-flex justify-content-strat align-items-center mb-3">
                <Form.Control
                  type="text"
                  placeholder="Search by Employee Id..."
                  value={search}
                  onChange={handleFilter}
                  style={{ maxWidth: "16rem" }}
                />
              </div>
            </Col>
            <Col md={4}>
              <div className="d-flex justify-content-end align-items-center">
                <Button type="submit" variant="info" onClick={handleExportExcel} className="w-50">
                  <i class="bi bi-printer"/>
                  <span className="ms-2 d-none d-sm-inline">Export as Excel</span>
                </Button>
              </div>
            </Col>
          </Row>



          <DataTable
            columns={columns}
            data={records}
            customStyles={customStyles}
            fixedHeader
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent="No records found."
          />
        </Card.Body>
      </Card>
    </main>
  )
}

export default EmployeeRecordsPage