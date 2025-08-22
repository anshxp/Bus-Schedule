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
module.exports = { validate };