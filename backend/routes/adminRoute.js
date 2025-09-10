const express=require('express');
const verifyAdmin = require('../middlewares/verifyadmin');
const { addBus, updatedBus, editBus, deleteBus, activestatus , addsingleStop, editsingleStop, deleteStop, verify} = require('../controllers/adminControllers');
const { validateaddBus,validateeditBus } = require('../middlewares/validate.js');
const adminRoute=express.Router();
const {addbusSchema} =require('../validation/busValidation.js');
const {editbusSchema} =require('../validation/busValidation.js')

adminRoute.post('/addbus',validateaddBus,verifyAdmin,addBus);
adminRoute.post('/:busNo/editbus',validateeditBus,verifyAdmin,editBus);
adminRoute.patch('/:busNo/active',verifyAdmin,activestatus);
adminRoute.get('/verify',verify);
adminRoute.post('/:busNo/stops/add',verifyAdmin,addsingleStop);
adminRoute.post('/:busNo/stops/:stopName',verifyAdmin,editsingleStop);
adminRoute.delete('/:busNo/stops/:stopName',verifyAdmin,deleteStop)
adminRoute.delete('/:busNo',verifyAdmin,deleteBus);
module.exports=adminRoute;