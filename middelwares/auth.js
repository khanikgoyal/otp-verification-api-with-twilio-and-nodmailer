import { catchAsyncError } from "./catchAsynError.js";
import ErrroHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies;
    if(!token) {
        return next(new ErrroHandler("User is not authenticated", 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    
    next();
})
