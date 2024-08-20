import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Container, Offcanvas, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { authActions } from "../../store/auth";
import { themeActions } from "../../store/theme";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const expenses = useSelector((state) => state.expense.items);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isPremium = useSelector((state) => state.theme.isPremium);
  const totalExpense = expenses.reduce(
    (acc, item) => (acc = acc + Number(item.amount)),
    0
  );
  useEffect(() => {
    if (totalExpense < 10000) {
      dispatch(themeActions.removePremium());
    }
    if(!isLoggedIn){
      dispatch(themeActions.removePremium());
    }
  }, [totalExpense, dispatch, isLoggedIn]);
  
  const handleToggle = () => {
    dispatch(themeActions.toggleTheme());
  };
  const addPremium = () => {
    dispatch(themeActions.addPremium());
  };
  
  const handleProfile = () => {
    props.showProfile ? props.onHideProfile() : props.onShowProfile();
  };
  const logOutHandler = () => {
    dispatch(authActions.logout());
    navigate("/auth/login");
  };

  const downloadCSV = () => {
    const csvHeader = "Amount,Description,Category\n";
    const csvData = expenses
      .map(
        (expense) =>
          `${expense.amount},${expense.description},${expense.category}`
      )
      .join("\n");

    const csvContent = csvHeader + csvData;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <Navbar
      expand="lg"
      sticky="top"
      bg={darkMode ? "dark" : "light"}
      data-bs-theme={darkMode ? "dark" : "light"}
      className="shadow"
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          {isLoggedIn ? "Weclcome to Expense Tracker" : "Expense Tracker"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
        <Navbar.Offcanvas
          placement="end"
          bg={darkMode ? "dark" : "light"}
          data-bs-theme={darkMode ? "dark" : "light"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {isLoggedIn ? "Weclcome to Expense Tracker" : "Expense Tracker"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="mx-auto my-auto">
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
              {totalExpense >= 10000 && !isPremium && isLoggedIn && (
                <Nav.Link>
                  <Button variant="warning" onClick={addPremium}>
                    Go Premium
                  </Button>
                </Nav.Link>
              )}
              {isPremium && (
                <Nav.Link>
                  <Button
                    variant={darkMode ? "light" : "dark"}
                    onClick={handleToggle}
                  >
                    {darkMode
                      ? "Switch to Light Theme"
                      : "Switch to Dark Theme"}
                  </Button>
                </Nav.Link>
              )}
              {isLoggedIn && isPremium && (
                <Nav.Link>
                  <Button variant="warning" onClick={downloadCSV}>
                    Download Expenses
                  </Button>
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
