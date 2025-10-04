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
const searchBuses= async (req,res)=>{
    const query=req.query.q.toString().toLowerCase().trim();
    if(!query){
        return res.status(400).json({message:"Query parameter is required"});
    }
    try{
        let result=[];
        if(/^\d+$/.test(query)){
            const number = parseInt(query, 10);
            result = await busModel.find({busNo: number});
        }
        else{
            result = await busModel.find({
                stops: {
                    $elemMatch: {
                        stopName: { $regex: query, $options: 'i' }
                    }
                }
            });
        }
        if(result.length===0){
            return res.status(404).json({message:"No buses found"});
        }
        return res.json(result);
    }catch(err){
        return res.status(500).json({message:"Error searching buses", error: err.message});
    }
}
module.exports = { getAllBuses, searchBuses ,OneBus};