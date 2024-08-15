import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import {
  Navbar,
  Container,
  Offcanvas,
  Nav,
  Button,
  Row,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const handleProfile = () => {
    props.showProfile ? props.onHideProfile() : props.onShowProfile();
  }
  const logOutHandler = () => {
    authCtx.logout();
    navigate("/auth/login");
  }
  return (
    <Navbar expand="sm" sticky="top" className="shadow">
      <Container>
        <Navbar.Brand>
          {isLoggedIn ? "Weclcome to Expense Tracker" : "Expense Tracker"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {isLoggedIn ? "Weclcome to Expense Tracker" : "Expense Tracker"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="mx-auto">
              {!isLoggedIn && (
                <Nav.Link as={NavLink} to="/auth/login">
                  <Button variant="primary">Login</Button>
                </Nav.Link>
              )}
              {!isLoggedIn && (
                <Nav.Link as={NavLink} to="/auth/signup">
                  <Button variant="outline-primary">Signup</Button>
                </Nav.Link>
              )}
              {isLoggedIn && (
                <Nav.Link>
                  <Button variant="primary" onClick={handleProfile}>
                    Edit Profile
                  </Button>
                </Nav.Link>
              )}
              {isLoggedIn && (
                <Nav.Link>
                  <Button variant="danger" onClick={logOutHandler}>Logout</Button>
                </Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
