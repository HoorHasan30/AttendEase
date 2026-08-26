import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function CompanyNavBar() {

    const { logout, user} = useAuth()

  return (
    <nav>
      {user.role == "Company"
      ? 
      (<>
      <Link to='/hr-list'>HR List</Link>
      <Link to='/company-rules'>Company Rules</Link>

      <button onClick={logout}>Sign Out</button>
      </>) : "" }
    </nav>
  )
}

export default CompanyNavBar