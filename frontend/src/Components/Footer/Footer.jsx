import React from "react";
import { Container, Row, Col } from "react-bootstrap"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css";

const Footer = () => {
  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="custom-footer">
      <Container>
        <Row className="align-items-center">
          {/* Logo */}
          <Col md={4} className="text">
            <img
              src="https://aitr.ac.in/wp-content/uploads/2023/03/unnamed-1-2048x405.png"
              alt="Acropolis Logo"
            />
          </Col>

          {/* Social Media Icons */}
          <Col md={4} className="text-center">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-twitter"></i>
            </a>
            <a
              href="https://www.linkedin.com/school/acropolis-institutions/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-linkedin"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/AcropolisCollegeIndore/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-square-facebook"></i>
            </a>
          </Col>

          {/* Copyright */}
          <Col md={4} className="text-center-text">
            <p>© 2025 Bus Routes Finder. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>

      {/* Back to Top Button */}
      <div className="back-to-top" onClick={scrollToTop}>
        <i className="fa-solid fa-arrow-up"></i>
      </div>
    </footer>
  );
};

export default Footer;
