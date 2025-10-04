const errorhandler = (err, req, res, next) => {
  res.status(500).json({ 
    success: false, 
    message: err.message || 'Something went wrong!' 
  });
};

module.exports=errorhandler;