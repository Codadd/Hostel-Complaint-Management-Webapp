import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  hostel: { type: String, required: true }, // Add hostel field
  userId: { type: String, required: true, unique: true }, // Ensure userId is unique
});

const UserModel = mongoose.model("Authentication", UserSchema);
export { UserModel as User };
