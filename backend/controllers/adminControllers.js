const busModel=require('../models/busSchema.js');
const jwt=require('jsonwebtoken');
const adminModel = require('../models/adminSchema.js');

const addBus =async(req ,res )=>{
    const {busNo,DriverName,ContactNo,type,isActive}=req.body;
    if(!busNo || !DriverName || !ContactNo){
        return res.json({success:false,message:"Incomplete Information"});
    }
    try{
        const newbus=new busModel({
            busNo,
            DriverName,
            ContactNo,
            type,
            isActive
        });
        await newbus.save();
        return res.json({success:true,bus:newbus});
    }
    catch(err){
        return res.json({success:false,message:err.message});
    }
}
const editBus = async (req, res) => {
    const { busNo, DriverName, ContactNo, type, isActive, stops } = req.body;

    if (!busNo) {
        return res.json({
            success: false,
            message: "Bus Number is required"
        });
    }

    try {
        // Step 1: Find bus
        const bus = await busModel.findOne({ busNo });
        if (!bus) {
            return res.json({
                success: false,
                message: "Bus not found"
            });
        }

        // Step 2: Update bus-level fields
        if (DriverName !== undefined) bus.DriverName = DriverName;
        if (ContactNo !== undefined) bus.ContactNo = ContactNo;
        if (type !== undefined) bus.type = type;
        if (isActive !== undefined) bus.isActive = isActive;

        // Step 3: Update stops partially
        if (Array.isArray(stops)) {
            stops.forEach(stopUpdate => {
                const index = bus.stops.findIndex(s => s.stopName === stopUpdate.stopName);
                if (index !== -1) {
                    // Update only the given fields for this stop
                    Object.assign(bus.stops[index], stopUpdate);
                } else {
                    // If stop does not exist, add it
                    bus.stops.push(stopUpdate);
                }
            });
        }

        // Step 4: Save updated bus
        const updatedBus = await bus.save();

        return res.json({
            success: true,
            bus: updatedBus,
            message: "Bus updated successfully"
        });

    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        });
    }
};

const deleteBus=async (req,res)=>{
    const {busNo}=req.params;
    if(!busNo){
        return res.json({
            success:false,
            message:"Bus Number is required"
        })
    }
    try{
        const deleteBus=await busModel.findOneAndDelete(
            {busNo:Number(busNo)}
        );
        console.log("deleted bus :",deleteBus);
        if(!deleteBus){
            return res.json({success:false,message:"Deletion Failed"})
        }
        return res.json({success:true,bus:deleteBus})
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}
const addsingleStop=async (req,res)=>{
    const {busNo}=req.params;
    const {stopName,firstShift,secondShift}=req.body;
    if(!stopName){
        return res.status(400).json({
            success:false,
            message:"Stop name is must"
        });
    }
    try{
        const bus=await busModel.findOneAndUpdate(
            {busNo},
            {$push:{
                stops:{stopName,firstShift,secondShift}
            }},
            {new:true}
        );
        return res.send({success:true,message:"Stop added succesfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}
const editsingleStop=async (req,res)=>{
    const {busNo}=req.params;
    const {stopName,firstShift,secondShift}=req.body;
    if(!busNo || !stopName){
        return res.status(404).send({success:false,message:"Bus number is required || Stop Name is required"});
    }
    try{
        const bus=await busModel.findOne({busNo});
        if(!bus){
            return res.status(404).json({success:false,message:"Bus not found"});
        }
        const stop=bus.stops.find(s=>s.stopName===stopName);
        if(!stop){
            return res.status(404).json({success:false,message:"Stop not found"});
        }
        if(stopName!==undefined) stop.stopName=stopName;
        if(firstShift!==undefined) stop.firstShift=firstShift;
        if(secondShift!==undefined) stop.secondShift=secondShift;
        await bus.save();
        return res.status(200).send({success:true,bus,message:"Bus successfully edited"})
    }
    catch(err){
        return res.status(404).json({success:false,message:err.message})
    }
}
const deleteStop=async (req,res)=>{
    const {busNo}=req.params;
    const {stopName}=req.body;
    if(!busNo || !stopName){
        return res.status(404).send({success:false,message:"Bus number is required || Stop Name is required"});
    }
    try{
        const bus=await busModel.findOne({busNo});
        if(!bus){
            return res.status(404).json({success:false,message:"Bus not found"});
        }
        const stopIndex=bus.stops.findIndex(s=>s.stopName===stopName);
        if(stopIndex===-1){
            return res.status(404).send({success:false,message:"Stop not found"});
        }
        bus.stops.splice(stopIndex,1);
        await bus.save()
        res.status(404).send({success:true,message:"Stop Removed",bus})
    }
    catch(err){
        console.log(err);
        return res.status(404).send({message:"Error deleting"})
    }
}
const activestatus=async (req,res)=>{
    // const {busNo}=req.params;
    const {busNo,isActive}=req.body;
    if(typeof isActive!=='boolean') {
        return res.status(404).json({ success: false, message: "isActive must be true or false" });
    }
    try{
        const bus=await busModel.findOneAndUpdate(
            {busNo},
            {isActive},
            {new:true}
        )
        if (!bus) {
            return res.status(404).json({ success: false, message: "Bus not found" });
        }
    return res.status(400).send({success:true,bus,message:"Bus is now Activated"});
    }
    catch(err){
        return res.json({success:false,message:err.message});
    }
}
const verify=async (req, res) => {
  try {
    const token = req.cookies.admintoken;
    if (!token) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not admin" });
    }
    const admin = await adminModel.findById(decoded.id);
    if (!admin) {
        return res.status(403).json({ success: false, message: "Admin not found" });
    }

    return res.json({ success: true, message: "Admin verified" ,admin});
  } catch (err) {
     // Handle specific JWT errors
        if (err.name === 'JsonWebTokenError') {
            return res.json({ success: false, message: 'Invalid token' });
        } else if (err.name === 'TokenExpiredError') {
            return res.json({ success: false, message: 'Token expired' });
        }
        
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports={addBus,editBus,deleteBus,activestatus,addsingleStop,editsingleStop,deleteStop,verify};