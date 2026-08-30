import React, { useState } from 'react'

function UploadPunchesPage() {

  const [error, setError] = useState("")

  return (
    <main className='main-content'>
      {error && <div className="alert alert-danger">{error}</div>}

      <h1>Upload Attendance File</h1>

      
    </main>
  )
}

export default UploadPunchesPage