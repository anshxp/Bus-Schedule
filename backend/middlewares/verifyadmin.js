const jwt=require('jsonwebtoken');

const verifyAdmin=async(req,res,next)=>{
    // Try multiple sources for the token
    let token = req.cookies.admintoken || req.cookies.token;
    
    // Check Authorization header
    const authHeader = req.headers['authorization'] || req.headers['token'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else if (authHeader && !token) {
        token = authHeader;
    }
    
    if(!token) {
        return res.status(401).json({success:false,message:"Not logged in"});
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded; // attach admin info
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
}

module.exports=verifyAdmin;