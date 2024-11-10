// models/Complaint.js
// models/Complaint.js
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "RegisterComplaint", required: true },
<<<<<<< HEAD
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
=======
  description: { type: String, required: true },
  issueType: { type: String, enum: ["Maintenance", "Cleanliness", "Other"], required: true }, // Unified enum options
  status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
>>>>>>> 80a1a73b55c5e6608e19bc3b3cda90f4a34ddaee
  adminResponse: { type: String },
  createdAt: { type: Date, default: Date.now },
});

<<<<<<< HEAD


=======
>>>>>>> 80a1a73b55c5e6608e19bc3b3cda90f4a34ddaee
export default mongoose.model("AdminComplaint", complaintSchema);
