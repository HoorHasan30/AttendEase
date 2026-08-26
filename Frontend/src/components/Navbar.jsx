import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { logout, user} = useAuth()
  
  return (
    <nav>
      {user
        ? " " :
        (<>
          <Link to='/'>Home</Link>
          <Link to='/sign-up-company'>Sign Up</Link>
          <Link to='/sign-in'>Sign In</Link>
        </>)}
    </nav>
  )
}

export default Navbar