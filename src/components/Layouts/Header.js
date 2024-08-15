import React from "react";

import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  Button,
  Badge,
} from "react-bootstrap";


const Header = (props) => {
  return (
    <Navbar
      expand="sm"
      sticky="top"
      className="shadow-lg"
    >
      <Container>
        <Navbar.Brand>
          E commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>E commerce</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="mx-auto my-auto">
              <Nav.Link>
                HOME
              </Nav.Link>
              <Nav.Link>
                STORE
              </Nav.Link>
              <Nav.Link>
                ABOUT
              </Nav.Link>
              <Nav.Link>
                CONTACT
              </Nav.Link>
            </Nav>
            <Nav className="d-flex flex-row justify-content-between align-items-center">
              <Nav.Link>
                <Button variant="primary">Login</Button>
              </Nav.Link>
              <Nav.Link>
                <Button variant="outline-primary">Signup</Button>
              </Nav.Link>
              <Nav.Link>
                <Button variant="danger">Logout</Button>
              </Nav.Link>

              <Nav.Link>
                <Button variant="primary" onClick={props.onShow}>
                  Cart <Badge bg="dark">0</Badge>
                </Button>
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
