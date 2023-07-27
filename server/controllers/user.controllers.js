const User = require('../models/user.model');

const AppError = require('../utils/appError');

const cookieOptions = {
    secure : true,
    maxAge : 7 * 24 * 60 * 60 * 1000, // 7days
    httpOnly: true
}

exports.register = async (req, res) =>{

    const { fullname, email, password} = req.body;

    if(!fullname, !email, !password) {
        return next( new AppError('All input fields are required', 400));
    }

    const userExits = await User.findOne({email});

    if(userExits){
        return next( new AppError('User Already Registered', 400));
    }

    const user  = await User.create({
        fullname,
        email,
        password,
        avatar : {
            public_id : email,
            secure_url : 'secure_url'
        }
    });

    if(!user){
        return next( new AppError('User Registeration failed, please try again later', 400));
    }

    // TODO : upload user picture
    await user.save();

    // TODO : jwttoken

    user.password = undefined; // so the password don't get returned in res

    res.status(201).json({
        success : true,
        user
    })
}

exports.login = async (req, res) =>{

    const {email , password} = req.body; 

    if(!email, !password) {
        return next( new AppError('All input fields are required', 400));
    }

    const user  = await User.findOne({email}).select('+password');

    if(!user || !user.comparePassword(password)){
        return next( new AppError('Email or Password do not match', 400));
    }

    const token = await user.JWTtoken();
    user.password = undefined;

    res.cookies('token', token, cookieOptions);

    res.status(200).json({
        success : true,
        msg : 'User Logged In Successfully'
    });

}

exports.logout = (req, res) =>{
    
    res.cookie('token', null, {
        secure : true, 
        maxAge : 0,
        httpOnly : true
    });

    res.status(200).json({
        success : true,
        msg : "Successfully Logged Out"
    })

}

exports.getUser = async (req, res) =>{

    try{
        const user = await User.findById(req.user.id);

        return res.status(200).json({
            success : true, 
            user
        })

    }catch(err){
        return res.status(400).send(err.message);
    }
}
