import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MyNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    setExpanded(false);
    navigate("/search");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-theme");
  };

  return (
    <Navbar
      expand="sm"
      expanded={expanded}
      fixed="top"
      className="custom-navbar shadow-sm"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://aitr.ac.in/wp-content/uploads/2023/03/unnamed-1-2048x405.png"
            alt="Acropolis Logo"
          />
        </Navbar.Brand>

        {/* Toggle Button for Mobile */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : true)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active-link" : ""}
            >
              <i className="fa-solid fa-house"></i> Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/allbuses"
              className={location.pathname === "/allbuses" ? "active-link" : ""}
            >
              <i className="fa-solid fa-bus"></i> All Buses
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/search"
              className={location.pathname === "/search" ? "active-link" : ""}
              onClick={handleSearch}
            >
              <i className="fa-solid fa-magnifying-glass-location"></i> Search
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Dark Mode Toggle (Minimal) */}
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          <i className={darkMode ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i>
        </button>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
