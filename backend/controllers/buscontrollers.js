const busModel=require('../models/busSchema.js')

const getAllBuses = async (req, res) => {
    try{
        const buses=await busModel.find({});
        return res.json(buses);
    }catch(err){
        return res.status(404).send("Error occured ",err);
    }
};
const OneBus= async  (req,res)=>{
    const busNo=parseInt(req.params.busNo);
    const bus=await busModel.findOne({busNo});
    if(!bus){
        return res.status(404).json({success:false,message:"Bus not found"});
    }
    return res.json(bus);
}
const searchBuses=(req,res)=>{
    const query=req.query.q.toString().toLowerCase().trim();
    if(!query){
        return res.status(400).json({message:"Query parameter is required"});
    }
    let result=[];
    if(/^\d+$/.test(query)){
        const number = parseInt(query, 10);
        result = data.filter(bus=>bus.busNo === number);
    }
    else{
        result=data.filter(bus=>
            bus.stops.some(stop=>stop.stopName.toLowerCase().includes(query))
        );
        if(result.length===0){
            return res.status(404).json({message:"No buses found"});
        }
    }
    return result;
}
module.exports = { getAllBuses, searchBuses ,OneBus};