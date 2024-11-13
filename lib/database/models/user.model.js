import mongoose, { model, models, Schema } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
});

const UserModel = models.User || model("User", userSchema);

export default UserModel;
