const mongoose=require('mongoose');
const busModel =require('../models/busSchema.js');
const dataBuses = require('./bus_data');

const connectDB=async ()=>{
    try{
        mongoose.connection.on('connected',()=>{
        })
        await mongoose.connect(process.env.DATABASE_URI,{
            family: 4
        });
    }catch(err){
    }
}
module.exports=connectDB;