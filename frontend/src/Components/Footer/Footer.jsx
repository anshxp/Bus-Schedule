import React from "react";
import { Container, Row, Col } from "react-bootstrap"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="custom-footer">
      <Container>
        <Row className="align-items">
          <Col md={4} className="text">
            <img
              src="https://aitr.ac.in/wp-content/uploads/2023/03/unnamed-1-2048x405.png"
              alt="Acropolis Logo"
              style={{ maxWidth: "180px" }}
            />
          </Col>

          <Col md={4} className="text-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 fs-4"
            >
              <i className="fa-brands fa-square-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/school/acropolis-institutions/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 fs-4"
            >
              <i className="fa-brands fa-square-linkedin"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 fs-4"
            >
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/AcropolisCollegeIndore/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-2 fs-4"
            >
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </Col>

          
          <Col md={4} className="text-center-text">
            <p className="mb-0">© 2025 Bus Routes Finder. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
