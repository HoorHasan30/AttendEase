import React from 'react'
import { useState, useEffect } from 'react';

import { getAllCompanyRecords } from '../../services/recordService';

import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import '../../index.css'

function EmployeeRecordsPage() {
  const [error, setError] = useState("")

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
      selector: row => row.workedHours
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


  useEffect(
    () => {
      document.title = "Emp Records"
      loadData()
    },
    []
  )
  
  return (
    <main className='main-content'>
      {error && <div className="alert alert-danger">{error}</div>}

      <h1>Employees Records</h1>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-end align-items-center mb-3">
            <Form.Control
              type="text"
              placeholder="Search by Employee Id..."
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
            noDataComponent="No records found."
          />
        </Card.Body>
      </Card>
    </main>
  )
}

export default EmployeeRecordsPage