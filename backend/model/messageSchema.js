import mongoose from "mongoose";
import validator from 'validator';

const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true,
    minLength: [10, "Message must contain at least 10 characters"],
  },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
