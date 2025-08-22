import React from "react";
import { motion } from "framer-motion";
import BusImage from "../../Assets/bus.png";
import "./BusIntro.css";

const BusIntro = () => {
  return (
    <div className="bus-container">
      <motion.img
        src={BusImage}
        alt="bus-image"
        className="bus-image"
        initial={{ x: "120vw" }}         
        animate={{ x: "-120vw" }}        
        transition={{
          duration: 8,                   
          repeat: Infinity,              
          ease: "linear"                 
        }}
      />
    </div>
  );
};

export default BusIntro;
