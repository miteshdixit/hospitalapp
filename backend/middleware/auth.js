import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsynchError.js";
import ErrorHandler from "./errormiddleware.js";
import User from "../model/userSchema.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token = req.cookies.adminToken;

  if (!token) {
    return next(new ErrorHandler("Admin not authenticated", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  if (!req.user || req.user.role !== "Admin") {
    return next(new ErrorHandler(`${req.user ? req.user.role : "User"} not authorized for this resource`, 403));
  }

  next();
});

export const isPatientAuthenticated = catchAsyncErrors(async(req ,res , next)=> {
  const token = req.cookies.patientToken;
  if(!token){
    return next(new ErrorHandler("patient not Authenticated"))
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
  req.user = await User(decoded.id);
  if(req.user.role !== "patient") {
    return next( new ErrorHandler(`${req.user.role} not authorized for this resources`,403))
  }
  next();
})