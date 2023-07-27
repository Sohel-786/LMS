
class AppError extends Error {
    
    constructor (msg, statuscode){
        super(message);
        this.statuscode = statuscode;

        Error.captureStackTrace(this, this.constructor);
    }
}

exports.modules = AppError;