import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const appointmentSchema = new mongoose.Schema({
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
  appointment_date:{
    type:String,
    required:true,
  },
  department:{
    type:String,
    required:true,
  },
  doctor:{
    firstName:{
      type:String,
    required:true,
    },
    lastName:{
      type:String,
    required:true,
    },
  },
  hasVisited:{
    type:Boolean,
    default:false,
  },
  doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  patientId:{
    type:mongoose.Schema.ObjectId,
    required:true,
  },
  address:{
    type:String,
    required:true,
  },
  status:{
    type:String,
    enum: ["pending","accepted","Rejected"],
    default:"pending",
  }

});

export const Appointment = mongoose.model("Appointment",appointmentSchema);