class AppError extends Error {
    
    constructor (msg, statuscode){
        super(msg);
        this.statuscode = statuscode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;