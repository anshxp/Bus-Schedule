import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const images = [
  "/images/campus1.jpg",
  "/images/campus2.jpg",
  "/images/campus3.jpg",
  "/images/campus4.jpg"
];

const Home = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // change image every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Find Your Perfect <span>Bus Route</span>
          </h1>
          <p>
            Discover the easiest way to search and find bus routes, stops, and
            timings. <br /> Your journey starts here with all the routes information.
          </p>
        </div>

        <section className="quick-links">
          <h2>Quick Access</h2>
          <div className="links-grid">
            <Link to="/AllBuses" className="link-card">
              🚍 View All Buses
            </Link>
            <Link to="/Search" className="link-card">
              🚏 Search Your Bus
            </Link>
          </div>
        </section>

        <div className="hero-stats">
          <div className="stat-card">
            <h3>80+</h3>
            <p>Buses</p>
          </div>
          <div className="stat-card2">
            <h3>200+</h3>
            <p>Stops</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
          <div className="stat-card2">
            <h3>Route</h3>
            <p>Updates</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>About Acropolis</h2>
        <p>
          Acropolis Institute of Technology & Research is committed to providing 
          world-class education and facilities. With modern infrastructure and 
          dedicated faculty, the institute ensures holistic development of students.
        </p>
      </section>

      <section className="slider-section">
        <div className="slider">
          {images.map((img, index) => (
            <div
              key={index}
              className={`slide ${index === current ? "active" : ""}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <p>
          Experience the transportation of Acropolis with our innovative
          features designed to make your commute seamless and stress-free.
        </p>

        <div className="features-grid">
          <div className="feature-card2">
            <h4>Route Tracking</h4>
            <p>
              Track bus route and get accurate arrival predictions for
              better planning.
            </p>
          </div>
          <div className="feature-card">
            <h4>Schedule Information</h4>
            <p>
              Access comprehensive bus schedules and reach the respective bus stop with
              precise timing.
            </p>
          </div>
          <div className="feature-card">
            <h4>Mobile Optimized</h4>
            <p>
              Seamlessly access route information on any device with our
              responsive design.
            </p>
          </div>
          <div className="feature-card2">
            <h4>Secure & Reliable</h4>
            <p>
              Your data is protected with enterprise-grade security and 99.9%
              uptime.
            </p>
          </div>
        </div>
      </section>
      
      <div className="top-info-bar">
        <div className="info-item">
          <i className="fas fa-home"></i>
          <div>
            <strong>Acropolis Group</strong>
            <Link to="https://aitr.ac.in/">
              <p>Visit Us</p>
            </Link>
          </div>
        </div>
        <div className="info-item">
          <i className="fas fa-map-marker-alt"></i>
          <div>
            <strong>Location</strong>
            <p>
              Acropolis Institute Bypass Road,
              <br /> Manglia Square, Indore
            </p>
          </div>
        </div>
        <div className="info-item">
          <i className="fas fa-phone-alt"></i>
          <div>
            <strong>Call Us</strong>
            <p>98930-82246, 4730001</p>
          </div>
        </div>
        <div className="info-item">
          <i className="fas fa-envelope"></i>
          <div>
            <strong>Email</strong>
            <p>admission@acropolis.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
