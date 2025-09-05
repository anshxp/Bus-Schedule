const { addbusSchema,editbusSchema } =require("../validation/busValidation");
const validate=(req,res,next)=>{
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: "Query parameter is required" });
    }
    if (query.trim() === '') {
        return res.status(400).json({ message: "Query must be a non-empty string" });
    }
    next();
}
const validateaddBus=(req,res,next)=>{
    const {error}=addbusSchema.validate(req.body);
    if(error){
        return res.status(400).json({ 
            success: false, 
            message: error.details[0].message 
        });
    }
    next();
}

const validateeditBus=(req,res,next)=>{
    const {error}=editbusSchema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).json({ 
            success: false, 
            message: error.details[0].message 
        });
    }
    next();
}
module.exports = { validate ,validateaddBus,validateeditBus};