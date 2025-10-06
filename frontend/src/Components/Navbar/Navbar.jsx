import { useState,useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "./Navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TransportContacts from "../TransportContacts/TransportContacts";

function MyNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [isAdmin,setIsAdmin]=useState(()=>!!localStorage.getItem('admintoken'));
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setIsAdmin(!!localStorage.getItem("admintoken"));
  }, [location]);
  const handleSearch = () => {
    setExpanded(false);
    navigate("/search");
  };
  const handleLogout=()=>{
    fetch('http://localhost:3000/logout',{method:"POST",credentials:'include'}).then(()=>{
      localStorage.removeItem('admintoken');
      setIsAdmin(false);
      navigate('/');
    })
  }

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
              <i></i>🏠 Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/allbuses"
              className={location.pathname === "/allbuses" ? "active-link" : ""}
            >
              <i></i> 🚌 All Buses
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/search"
              className={location.pathname === "/search" ? "active-link" : ""}
              onClick={handleSearch}
            >
              <i></i>🔍 Search
            </Nav.Link>
          </Nav>
          <div className="admin-privileges">
              <TransportContacts isAdmin={isAdmin} />
              {isAdmin && (
                <button className='btn' onClick={()=>navigate('/addbus')}>
                  <i className="fas fa-plus-circle"></i>Add Bus
                </button>
              )}
              {isAdmin && (
                <button className='btn btn-danger' onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>Log Out
                </button>
              )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
