import { useState } from "react";
import { Link, useNavigate ,useLocation} from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl, Button } from "react-bootstrap";
import './Navbar.css';
function MyNavbar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();
  const handleSearch=()=>{
    setExpanded(false);
    navigate("/search");
  }

  return (
    <Navbar expand="sm" expanded={expanded} fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://aitr.ac.in/wp-content/uploads/2023/03/unnamed-1-2048x405.png"
            alt="Acropolis Logo"
            style={{ height: "38px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>setExpanded(expanded?false:true)}/>
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className={location.pathname==="/"?"active-link":""}><i className="fa-solid fa-house"></i> Home</Nav.Link>
            <Nav.Link as={Link} to="/allbuses" className={location.pathname==="/allbuses"?"active-link":""}><i className="fa-solid fa-bus"></i> All Buses</Nav.Link>
            <Nav.Link as={Link} to="/search" className={location.pathname==="/search"?"active-link":""}><i className="fa-solid fa-search"></i> Search</Nav.Link>
          </Nav>
        </Navbar.Collapse>
          <Button >
            Dark
          </Button>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
