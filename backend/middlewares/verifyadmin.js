const jwt=require('jsonwebtoken');

const verifyAdmin=async(req,res,next)=>{
    let token=req.headers['token']?.split(" ")[1];
    console.log(req.headers);
    if (!token && req.cookies?.token) {
        token = req.cookies.token;
    }
    if(!token) return res.json({success:true,message:"is'nt loggedin"});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; // attach admin info
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports=verifyAdmin;