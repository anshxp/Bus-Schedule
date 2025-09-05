const mongoose=require('mongoose');
const stopSchema=require('./stopSchema.js')

const busSchema=new mongoose.Schema({
    busNo:{
        type:Number,
        required:true,
        unique:true
    },
    DriverName:{
        type:String,
        required:true
    },
    ContactNo:{
        type:Number,
        required:true,
        unique:true
    },
    stops:[
        stopSchema
    ],
    type:{
        type:String,
        enum:['permanent','temporary'],
        default:'temporary'
    },
    isActive:{
        type:Boolean,
        default:true
    }
})
const busModel=mongoose.models.bus || mongoose.model('bus',busSchema);
module.exports=busModel;