const User = require('../models/user.model');

const AppError = require('../utils/appError');

exports.register = async (req, res) =>{

    const { fullname, email, password} = req.body;

    if(!fullname, !email, !password) {
        return next( new AppError('All input fields are required', 400));
    }

    const userExits = await User.findOne({email});

    if(userExits){
        return next( new AppError('All input fields are required', 400));
    }

    const user  = await User.create({
        fullname,
        email,
        password,
        avatar 
    })
}

exports.login = (req, res) =>{
    
}

exports.logout = (req, res) =>{
    
}

exports.getUser = (req, res) =>{
    
}
