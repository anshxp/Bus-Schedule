const express = require("express");
const busrouter=express.Router();
const { getAllBuses, searchBuses,OneBus } = require("../controllers/buscontrollers.js");
const {validate}= require("../middlewares/validate.js");
busrouter.get("/buses", getAllBuses);
busrouter.get("/buses/:busNo", OneBus);
busrouter.get("/search", validate,searchBuses);
module.exports = busrouter;