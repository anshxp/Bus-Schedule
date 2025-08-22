const express = require("express");
const router=express.Router();
const { getAllBuses, searchBuses,OneBus } = require("../controllers/buscontrollers.js");
const {validate}= require("../middlewares/validate.js");
router.get("/buses", getAllBuses);
router.get("/buses/:Busno", OneBus);
router.get("/search", validate,searchBuses);
module.exports = router;