import React from "react";
import { Navbar, Offcanvas, Container, Nav, Button } from "react-bootstrap";
import "../styles/NavBar.css";
import { Link } from "react-router-dom";
function NavBar({ expand }) {
  return (
    <>
      {["md"].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="navBar  bg-body-tertiary fixed-top pe-5 ps-5"
          variant="light"
        >
          <Container>
            <Navbar.Brand
              as={Link}
              to="/"
              className="h1 ms-5 ps-4 justify-content-center"
            >
              JW
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  as={Link}
                  to="/"
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                >
                  Job Wizard
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-4 me-5">
                  <Nav.Link as={Link} to="/" className="pe-4">
                    Home
                  </Nav.Link>

                  <Nav.Link as={Link} to="/about" className="pe-4">
                    About
                  </Nav.Link>
                  <Nav.Link as={Link} to="/contactUs" className="pe-4">
                    Contact
                  </Nav.Link>
                  {/* <Nav.Link as={Link} to="/">Explore</Nav.Link> */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;
