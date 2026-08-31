import React from 'react'
import { useEffect, useState } from "react";

import { getHr, registerHr, deleteHr } from '../../services/authService'

import Swal from 'sweetalert2'

import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import '../../index.css'


function HrListPage() {

  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const { username, password } = formData

  const columns = [
    {
      name: "Username",
      selector: row => row.username,
      sortable: true
    },
    {
      name: "Role",
      selector: row => row.role
    },
    {
      name: "Created On",
      selector: row => row.createdAt.split("T")[0],
      sortable: true
    },
    {
      name: "",
      cell: row => (
        <Button variant="danger" size="sm" onClick={() => handleDelete(row._id, row.username)}>
          Delete
        </Button>
      ),
      ignoreRowClick: true,
      button: true,
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

  async function loadList() {
    try {
      setError("")

      const res = await getHr()
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
      row.username?.toLowerCase().includes(searchedWord.toLowerCase())
    )

    setRecords(newData)
  }

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true)
      setError("")
      setSuccessMsg("")

      await registerHr(formData)
      setFormData({ username: "", password: "" })
      await loadList()

      setSuccessMsg("New HR Added Successfully!")
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
    finally {
      setSubmitting(false)
    }
  };

  function handleClear() {
    setFormData({
      username: "",
      password: ""
    })
  }

  async function handleDelete(id, username) {
    const result = await Swal.fire({
      title: "Delete this HR account?",
      text: `This will permanently remove "${username}".`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--bs-primary)",
      cancelButtonColor: "var(--bs-info)",
      confirmButtonText: "Yes, delete"
    })

    if (!result.isConfirmed) return

    try {
      setError("")
      setSuccessMsg("")

      await deleteHr(id)
      await loadList()

      setSuccessMsg("HR Account Deleted Successfully!")
    }
    catch (err) {
      setError(err?.response?.data?.message);
    }
  }

  useEffect(
    () => {
      document.title = "Company HR"
      loadList()
    },
    []
  )

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(""), 3000)
      return () => clearTimeout(timer)
    }
  }, [successMsg])

  return (
    <main className='main-content'>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <h1>HR List</h1>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title as="h5" className="mb-3">Add HR</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Row className="align-items-center g-2">
              <Col md={4}>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={username}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={4} className="d-flex gap-2">
                <Button type="button" variant="info" size="sm" className="w-25" onClick={handleClear}>Clear</Button>
                <Button type="submit" variant="primary" className="w-25" disabled={submitting} >
                  {submitting ? "Adding..." : "Add"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title as="h5" className="mb-0">All HR Members</Card.Title>
            <Form.Control
              type="text"
              placeholder="Search by username..."
              value={search}
              onChange={handleFilter}
              style={{ maxWidth: "16rem" }}
            />
          </div>

          <DataTable
            columns={columns}
            data={records}
            customStyles={customStyles}
            fixedHeader
            pagination
            highlightOnHover
            striped
            responsive
            noDataComponent="No HR members found."
          />
        </Card.Body>
      </Card>


    </main>
  )
}

export default HrListPage