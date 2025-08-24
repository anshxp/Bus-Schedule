import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Find Your Perfect <span>Bus Route</span>
          </h1>
          <p>
            Discover the easiest way to search and find bus routes, stops, and
            timings. <br />Your journey starts here with all the routes information.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <Link to="/search">
              <button className="btn-primary">Get Started</button>
            </Link>
            <Link to="/allbuses">
              <button className="btn-secondary">View All Routes</button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="hero-stats">
          <div className="stat-card">
            <h3>80+</h3>
            <p>Buses</p>
          </div>
          <div className="stat-card">
            <h3>200+</h3>
            <p>Routes</p>
          </div>
          <div className="stat-card">
            <h3>24/7</h3>
            <p>Support</p>
          </div>
          <div className="stat-card">
            <h3>Route</h3>
            <p>Updates</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>
        <p>
          Experience the transportation of Acropolis with our innovative
          features designed to make your commute seamless and stress-free.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h4>Route Tracking</h4>
            <p>
              Track bus route and get accurate arrival predictions for
              better planning.
            </p>
          </div>
          <div className="feature-card">
            <h4>Schedule Information</h4>
            <p>
              Access comprehensive bus schedules and reach the respective bus stop   with
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
          <div className="feature-card">
            <h4>Secure & Reliable</h4>
            <p>
              Your data is protected with enterprise-grade security and 99.9%
              uptime.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
