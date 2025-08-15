class ErrroHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}  

export const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message=err.message || "Internal server error";

    if(err.name==='CastError'){
        const message =`Invalid ${err.path}`;
        err = new ErrroHandler(message, 400);
    }
    if(err.name==="JsonWebTokenError"){
        const message = `Json web token is invalid, try again`;
        err = new ErrroHandler(message, 400);
    }
    if(err.name==="TokenExpiredError"){
        const message = `Json web token is expired, try again`;
        err = new ErrroHandler(message, 400);
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrroHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });

}

export default ErrroHandler;