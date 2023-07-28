const errMiddleware = (error, req, res, next) =>{

    req.statuscode = req.statuscode || 500;
    req.message = req.message || 'Something went wrong'

    res.status(req.statuscode).json({
        success : false,
        message : req.message,
        stack : error.stack
    })
}

export default errMiddleware;