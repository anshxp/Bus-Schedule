const mongoose =require('mongoose');

const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})
const adminModel=mongoose.models.admin || mongoose.model('admin',adminSchema);
module.exports=adminModel;