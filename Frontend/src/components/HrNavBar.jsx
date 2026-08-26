import React from 'react'

function HrNavBar() {
  return (
    <nav>
      {user.role == "HR"
      ? 
      (<>
      <Link to='/hr-list'>HR List</Link>
      <Link to='/company-rules'>Company Rules</Link>

      <button onClick={logout}>Sign Out</button>
      </>) : "" }
    </nav>
  )
}

export default HrNavBar