import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  hostel: { type: String, required: true }, 
  userId: { type: String, required: true, unique: true }, 
});

const UserModel = mongoose.model("Authentication", UserSchema);
export { UserModel as User };
