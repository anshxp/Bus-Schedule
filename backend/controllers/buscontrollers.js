const data=require('../data/bus_data.js');

const getAllBuses = (req, res) => {
    res.json(data);
    // res.send("data here")
};
const OneBus=(req,res)=>{
    console.log(req.params.Busno);
    const busNo=parseInt(req.params.Busno);
    const bus=data.find(b=>b.Busno===busNo);
    if(!bus){
        return res.status(404).json({message:"Bus not found"});
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
        result = data.filter(bus=>bus.Busno === number);
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