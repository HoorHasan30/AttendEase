// import { Link } from 'react-router'
import { NavLink } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Outlet } from "react-router";

import Nav from 'react-bootstrap/Nav'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Image from 'react-bootstrap/Image'

import '../index.css'

function CompanyNavBar() {

  const { logout, user } = useAuth()

  return (
    <>
      {user?.role === 'Company' && (
        <div className="sidebar">

          <div className="sidebar-brand">
             <Image src="/lightNavLogo.png" className="sidebar-logo" rounded /> 
          </div>

          <Nav className="flex-column">
            <Nav.Link
              as={NavLink}
              to="/hr-list"
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <i className="bi bi-people" />
              <span className="ms-2 d-none d-sm-inline">HR List</span>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/company-rules"
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <i className="bi bi-journal-text" />
              <span className="ms-2 d-none d-sm-inline">Company Rules</span>
            </Nav.Link>
          </Nav>

          <button className="sidebar-signout" onClick={logout}>
            <i className="bi bi-box-arrow-right" />
            <span className="ms-2 d-none d-sm-inline">Sign Out</span>
          </button>

        </div>
      )}

      <Outlet/>

    </>
  )
}

export default CompanyNavBar