const busModel=require('../models/busSchema.js');

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
const editBus=async (req,res)=>{
    const {busNo,DriverName,ContactNo}=req.body;
    if(!busNo){
        return res.json({
            success:false,
            message:"Bus Number is required"
        })
    }
    try{
        const updatedBus= await busModel.findOneAndUpdate(
            {busNo},
            {$set:{DriverName,ContactNo}},
            {new:true}
        );
        if(!updatedBus){
            return res.json({success:false,message:"Updation failed"});
        }
        return res.json({
            success:true,
            bus:updatedBus,
            message:"Bus updated Successfully"
        })
    }
    catch(err){
        return res.json({success:false,message:err.message});
    }
}
const deleteBus=async (req,res)=>{
    const {busNo}=req.body;
    if(!busNo){
        return res.json({
            success:false,
            message:"Bus Number is required"
        })
    }
    try{
        const deleteBus=await busModel.findOneAndDelete(
            {busNo}
        );
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
        return res.status(400).send({success:true,bus,message:"Bus successfully edited"})
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
module.exports={addBus,editBus,deleteBus,activestatus,addsingleStop,editsingleStop,deleteStop};