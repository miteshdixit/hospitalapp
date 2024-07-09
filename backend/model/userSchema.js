import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "Name must contain at least 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone must contain at least 11 characters"],
  },
  dob:{
    type:Date,
    required:[true, "DOB is required"],
  },
  gender:{
    type: String,
    required: true,
    enum:["Male","Female","Other"],
  },
  password:{
    type:String,
    required:true,
    minLength:[6,"Password must contain at least 6 characters"],
    select:false,
  },
  role:{
    type:String,
    required:true,
    enum:["Admin","Patient","Doctor"],
  },
  doctorDepartment:{
    type:String,
  },
  docAvtar:{
    public_id:String,
    url:String,
  }
});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePass = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword , this.password);
};

userSchema.methods.generateJsonWebToken = async function() {
  return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
