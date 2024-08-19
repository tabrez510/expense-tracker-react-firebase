import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Offcanvas, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { authActions, expenseActions } from "../../store/auth";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const items = useSelector((state) => state.expense.items);
  const totalExpense = items.reduce(
    (acc, item) => (acc = acc + Number(item.amount)),
    0
  );
  console.log(totalExpense);
  const isLoggedIn = !!token;
  const handleProfile = () => {
    props.showProfile ? props.onHideProfile() : props.onShowProfile();
  };
  const darkMode = useSelector((state) => state.theme.darkMode);
  const logOutHandler = () => {
    dispatch(authActions.logout());
    navigate("/auth/login");
  };
  return (
    <Navbar expand="sm" sticky="top" bg={darkMode?'dark':'light'} data-bs-theme={darkMode?'dark':'light'}  className="shadow">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
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
              {totalExpense >= 10000 && (
                <Nav.Link>
                  <Button variant="warning">Go Premium</Button>
                </Nav.Link>
              )}
              {isLoggedIn && location.pathname === "/dashboard" && (
                <Nav.Link>
                  <Button variant="primary" onClick={handleProfile}>
                    Edit Profile
                  </Button>
                </Nav.Link>
              )}
              {isLoggedIn && location.pathname !== "/dashboard" && (
                <Nav.Link as={NavLink} to="/dashboard">
                  <Button variant="outline-primary">Dashboard</Button>
                </Nav.Link>
              )}
              {isLoggedIn && (
                <Nav.Link>
                  <Button variant="danger" onClick={logOutHandler}>
                    Logout
                  </Button>
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
