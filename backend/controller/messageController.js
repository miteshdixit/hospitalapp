import Message from "../model/messageSchema.js";
import {catchAsyncErrors} from "../middleware/catchAsynchError.js";
import ErrorHandler from "../middleware/errormiddleware.js";

export const sendMessage = catchAsyncErrors(async(req,res,next) => {
  const {firstName , lastName , email,phone , message} = req.body;
  if(!firstName || !lastName || !email|| !phone || !message) {
    return next(new ErrorHandler("please fill full form"))
  }
  await Message.create({firstName , lastName , email,phone , message});

  // generateToken(user , "message send successfully" ,200 , res );

  return res.status(200).json({
    success: true,
    message:'message send successfully',
  });
});

export const getAllmessage = catchAsyncErrors(async(req , res , next)=> {
  const message = await Message.find();
  res.status(200).json({
    success:true,
    message,
  })
})

