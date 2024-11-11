// models/Complaint.js
// models/Complaint.js
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
<<<<<<< HEAD
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "RegisterComplaint", required: true },
=======
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RegisterComplaint",
    required: true,
  },
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ["maintenance", "cleaning", "other"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "resolved"],
    default: "pending",
  },
  adminResponse: { type: String },
  createdAt: { type: Date, default: Date.now },

});

<<<<<<< HEAD

=======
>>>>>>> 081e16fdf29de05245ed3e461a799663964c5cc8
export default mongoose.model("AdminComplaint", complaintSchema);
