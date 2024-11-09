// models/Complaint.js
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "RegisterComplaint", required: true },
  description: { type: String, required: true },
  issueType: { type: String, enum: ["Maintenance", "Cleanliness", "Other"], required: true }, // Unified enum options
  status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
  adminResponse: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("AdminComplaint", complaintSchema);
