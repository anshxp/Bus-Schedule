const mongoose=require('mongoose');

const stopSchema=new mongoose.Schema({
    stopName:{
        type:String,
        required:true
    },
    firstShift:{
        type:String
    },
    secondShift:{
        type:String
    }
});
module.exports=stopSchema;