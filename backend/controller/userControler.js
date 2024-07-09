import { catchAsyncErrors } from "../middleware/catchAsynchError.js";
import ErrorHandler from "../middleware/errormiddleware.js";
import { generateToken } from "../middleware/generateToken.js";
import User from "../model/userSchema.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password, role } = req.body;

  try {
    // Check if all required fields are present
    if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !role) {
      throw new ErrorHandler("Please fill complete form", 400);
    }

    // Check if user already exists with the provided email
    let user = await User.findOne({ email });
    if (user) {
      throw new ErrorHandler("User already exists", 400);
    }

    // Create the user
    user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role,
    });
    // Send success response or any additional logic
    // res.status(201).json({ success: true, user });
    generateToken(user , "user loged successfully" ,200 , res );

  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

export const login = catchAsyncErrors(async (req ,res , next) => {
  const {email , password , confirmPassword , role} = req.body;

  if(!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("please fill all the fields",400));
  }
  const user = await User.findOne({email}).select("+password")
  if(!user){
    return next(new ErrorHandler("Invalid email or password",400));
  }
const passwordMatched = await user.comparePass(password);
if(!passwordMatched){
  return next(new ErrorHandler("Invalid email or password",400))
}
if(role !== user.role){
  return next(new ErrorHandler("user with this role not Found",400))
}
generateToken(user , "user loged successfully" ,200 , res );

});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password ,role} = req.body;
  if (!firstName || !lastName || !email || !phone || !dob || !gender || !password || !role)
    {
      return next (new ErrorHandler("please fill full form",400))
    }
    const isRegistered = await User.findOne({email})
    if(isRegistered){
      return next (new ErrorHandler("user already exist",404));
    }
    const admin = await User.create({
      firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role:"Admin",
    });
    // Send success response or any additional logic
    // res.status(201).json({ success: true, admin });
    generateToken(admin , "admin added successfully" ,201 , res );

  } 
)

export const getAllDoctor = catchAsyncErrors(async(req,res,next) => {
  const doctors = await User.find({role:'Doctor'})
  
  res.status(200).json({
    success:true,
    doctors,
  })
})
export const getUserDetail = catchAsyncErrors(async(req,res,next) => {
const user = req.user;
  res.status(200).json({
    success:true,
    user,
  })
});

export const logutAdmin = catchAsyncErrors(async(req,res,next) => {
    res.status(200).cookie("adminToken","",{
      httpOnly:true,
      expires:new Date(Date.now()),
    }).json({
      success:true,
      message:"admin loged out successfully",
    })
  });
export const logutPatient = catchAsyncErrors(async(req,res,next) => {
    res.status(200).cookie("patientToken","",{
      httpOnly:true,
      expires:new Date(Date.now()),
    }).json({
      success:true,
      message:"patient loged out successfully",
    })
  });

export const addNewDoctor= catchAsyncErrors(async(req,res,next)=> {
  if(!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Doctor avatar required!",400));
  }

  const {docAvatar} = req.files;
  const allowFormate = ["image/png","image/jped","image/webp",]
  if(!allowFormate.includes(docAvatar.mimetype)){
    return next(new ErrorHandler("file formate not Supported",400))
  }

  const {
    firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      doctorDepartment
  } = req.body
if(
  !firstName ||
  !lastName ||
  !email ||
  !phone ||
  !dob ||
  !gender ||
  !password ||
  !doctorDepartment) {
    return next(new ErrorHandler("please provide full details ",400));
  }

  const isRegistered = await User.findOne({email});
  if(isRegistered){
    return next(new ErrorHandler(`${isRegistered.role} already registered with this email`,400));
  }
const cloudinaryRespo = await cloudinary.uploader.upload(
  docAvatar.tempFilePath
);
if(!cloudinaryRespo || cloudinaryRespo.error){
  console.error(
    "cloudinary error",cloudinaryRespo.error || "Unknown cloudinary error"
  )
}

const doctor = await User.create({
  firstName,
      lastName,
      email,
      phone,
      dob,
      gender,
      password,
      role:"Doctor",
      doctorDepartment,
      docAvatar:{
        public_id:cloudinaryRespo.public_id,
        url:cloudinaryRespo.secure_url,
      },
});
res.status(200).json({
  success:true,
  message:"new Doctor Registered!",
  doctor,
})
})