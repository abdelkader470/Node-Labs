import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: Number,
    gender: String,
    phone: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", userSchema);
export default userModel;
