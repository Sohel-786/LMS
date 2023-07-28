import { Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

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

    avatar : {
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

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        return next();
    }

    this.password = await bcrypt.hash(this.password);
});

userSchema.methods = {
    comparePassword : async function (plaintextPassword){
        return await bcrypt.compare(plaintextPassword, this.password);
    },
    
    JWTtoken: function(){
        return JWT.sign(
            { id : this._id, role : this.role, email : this.email, subscription: this.subscription},
            proccess.env.JWT_SECRET,
            {
                expiresIn : process.env.JWT_EXPIRY
            }
        )
    }
}

const User = model('user', userSchema);

export default User;