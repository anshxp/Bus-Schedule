const errorhandler = (err, req, res, next) => {
  console.error("Error Middleware:", err.message);
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong!' 
  });
};

module.exports=errorhandler;