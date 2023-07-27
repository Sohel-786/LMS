exports.IsLoggedIn = (req, res, next) =>{
    const  { token }  = res.cookies;

    if(!token){

        return next(new AppError('Unauthenticated, please login', 401))
    }

    const tokenDetails = JWT.verfiy(token, process.env.JWT_SECRET);

    if(!tokenDetails){

        return next(new AppError('Unauthenticated, please login', 401))
    }

    req.user = tokenDetails;

    next();
}