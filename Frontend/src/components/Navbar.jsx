import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { Outlet } from "react-router";


import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import BsNavbar from 'react-bootstrap/Navbar'

function Navbar() {
  const { logout, user } = useAuth()

  return (
    <>
      {!user && (
        <BsNavbar expand="lg" className="bg-primary" data-bs-theme="dark">
          <Container fluid>
            <BsNavbar.Brand as={Link} to="/">AttendEase</BsNavbar.Brand>
            <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
            <BsNavbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/sign-up-company">Sign Up</Nav.Link>
                <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
              </Nav>
            </BsNavbar.Collapse>
          </Container>
        </BsNavbar>
      )}
    </>
  )
}

export default Navbar