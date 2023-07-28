const errMiddleware = (error, req, res, next) =>{

    res.statuscode = req.statuscode || 400;
    res.message = req.message || 'Something went wrong'

    res.status().json({
        success : false,
        message : req.message,
        stack : error.stack
    })
}

export default errMiddleware;