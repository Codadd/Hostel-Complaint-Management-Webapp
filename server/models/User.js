import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
  hostel:{type: String, required: true}, //add hostel
=======
  hostel: { type: String, required: true }, // Add hostel field
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8
  userId: { type: String, required: true, unique: true }, // Ensure userId is unique
});

const UserModel = mongoose.model("Authentication", UserSchema);
export { UserModel as User };
