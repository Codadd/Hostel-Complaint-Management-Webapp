// server/models/Complaint.js
import express from "express";
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    issueType: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    email: {type: String, required: true},
    hostel: {type: String, required: true},//hostel
    isAnonymous: { type: Boolean, default: false },
    status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" }, // Add status field
    adminResponse: { type: String }, // Add adminResponse field for admin's reply
    updatedAt: { type: Date, default: Date.now }, // Automatically set to current date on creation
    
    feedback: {
      type:String,
      // required: function() {
      //   return this.status ==="resolved";
      // }
      default: ""
    },
    
    userName: {
      type: String,
      required: function () {
        return !this.isAnonymous; // userName is required only if not anonymous
      },
    },
    roomNumber: {
      type: String,
      required: function () {
        return !this.isAnonymous; // roomNumber is required only if not anonymous
      },
    },
  },
  { timestamps: true }
);

const Complaint = mongoose.model("RegisterComplaint", complaintSchema);

export default Complaint; // Ensure this is a default export