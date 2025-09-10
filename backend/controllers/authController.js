const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const adminModel=require('../models/adminSchema.js');
const register=async (req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email || !password){
        return res.json({success:false,message:"Missing Details"});
    }
    try{
        const existingUser=await adminModel.findOne({email});
        if(existingUser){
            return res.json({success:false,message:"User Already Exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const admin=new adminModel({
            name,
            email,
            password:hashedPassword
        })
        await admin.save();
        const token=jwt.sign({
            id:admin._id,
            role: "admin"
        },process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('admintoken',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':"strict",
            maxAge:7*24*60*60*1000
        })
        return res.json({success:true});
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}
const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.json({success:false,message:'Invalid Email or Password'});
    }
    try{
        const admin=await adminModel.findOne({email});
        if(!admin){
            return res.json({success:false,message:"Admin not registered"});
        }
        const isMatch=await bcrypt.compare(password,admin.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid password"});   
        }
        const token=jwt.sign({
            id:admin._id,
            role: "admin"
        },process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('admintoken',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':"strict",
            maxAge:7*24*60*60*1000
        })
        return res.json({success:true,token});
    }catch(err){
        res.json({success:false,message:err.message});
    }
}
const logout=async (req,res)=>{
    try{
        res.clearCookie('admintoken',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':"strict",
        })
        return res.json({success:true,message:"Logged Out"});
    }
    catch(err){
        res.json({success:false,message:err.message});
    }
}
module.exports={register,login,logout};