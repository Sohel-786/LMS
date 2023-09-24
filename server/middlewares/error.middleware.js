const errMiddleware = (error, req, res, next) => {
  req.statuscode = error.statuscode || 500;
  
  res.status(req.statuscode).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
};

export default errMiddleware;
