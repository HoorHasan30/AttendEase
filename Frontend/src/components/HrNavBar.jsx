import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function HrNavBar() {

  const { logout, user } = useAuth()

  return (
    <nav>
      {user?.role == "HR" && (
        <>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/punches'>Punches</Link>
          <Link to='/employees-records'>Employees Records</Link>
          <Link to='/rules'>Company Rules</Link>

          <button onClick={logout}>Sign Out</button>
        </>
      )}
    </nav>
  )
}

export default HrNavBar