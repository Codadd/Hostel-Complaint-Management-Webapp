import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// POST route to register a complaint
router.post("/registercomplaint", async (req, res) => {
  try {
    const { issueType, description, isAnonymous, userName, roomNumber } =
      req.body;

    // Create a complaint object based on whether it's anonymous
    const complaintData = {
      issueType,
      description,
      isAnonymous,
    };

    // Include userName and roomNumber only if not anonymous
    if (!isAnonymous) {
      complaintData.userName = userName;
      complaintData.roomNumber = roomNumber;
    }

    const complaint = new Complaint(complaintData);
    await complaint.save();
    res.status(201).json({ message: "Complaint registered successfully" });
  } catch (error) {
    console.error("Error registering complaint:", error);
    res.status(500).json({ error: "Failed to register complaint" });
  }
});

export default router;
