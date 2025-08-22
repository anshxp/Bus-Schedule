import React from "react"; 
import { Link } from "react-router-dom"; 
import "./Home.css"; 

const Home = () => { 
  return ( 
    <div className="home-container">
      <h1>Welcome to Bus Routes Finder</h1>
      <p>
        Easily search and find bus routes, stops, and timings. 
        You can also check your recent searches anytime.
      </p>
      <Link to="/search"> 
        <button className="home-search-btn">Search Now</button> 
      </Link>
    </div> 
  ); 
}; 
       
export default Home;