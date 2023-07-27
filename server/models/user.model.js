const { Schema, Model} = require('mongoose');

const userSchema = new Schema({

    fullname: {
        type: String,
        required:[true, 'Username is Required'],
        minLength: [5, 'Fullname must be at least 5 characters'],
        maxLength : [50, 'Fullname must be less than 50 charcters'],
        trim: true,
        lowercase : true
    },

    email: {
        type: String,
        required:[true, 'Email is Required'],
        unique: [true, 'Already registered in another account'],
        trim: true,
        lowercase : true
    },

    password: {
        type: String,
        required: [true, 'Password is Required'],
        minLength : [8, 'The password must be 8 characters long'],
        select : false
    },

    role: {
        type : String,
        enum : ['USER', 'ADMIN'],
        default : 'USER'
    },

    avater : {
        public_id: {
            type: String
        },

        secure_url : {
            type: String
        }
    },

    forgotPasswordToken : String, 
    forgotPasswordExpiry : Date
}, {
    timestamps : true
});


const User = Model('user', userSchema);

module.exports = User;