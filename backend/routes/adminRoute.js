const express=require('express');
const verifyAdmin = require('../middlewares/verifyadmin');
const { addBus, updatedBus, editBus, deleteBus, activestatus , addsingleStop, editsingleStop, deleteStop} = require('../controllers/adminControllers');
const { validateaddBus,validateeditBus } = require('../middlewares/validate.js');
const adminRoute=express.Router();
const {addbusSchema} =require('../validation/busValidation.js');
const {editbusSchema} =require('../validation/busValidation.js')

adminRoute.post('/buses/addbus',validateaddBus,verifyAdmin,addBus);
adminRoute.post('/buses/:busNo/editbus',validateeditBus,verifyAdmin,editBus);
adminRoute.patch('/buses/:busNo/active',verifyAdmin,activestatus);
adminRoute.post('/buses/:busNo/stops/add',verifyAdmin,addsingleStop);
adminRoute.post('/buses/:busNo/stops/:stopName',verifyAdmin,editsingleStop);
adminRoute.delete('/buses/:busNo/stops/:stopName',verifyAdmin,deleteStop)
adminRoute.delete('/buses/:busNo',verifyAdmin,deleteBus);
module.exports=adminRoute;