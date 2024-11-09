// routes/complaints.js
import express from "express";
import Complaint from "../models/Complaint.js";
const router = express.Router();

// Fetch all complaints
// Fetch all complaints for the admin dashboard
router.get("/all", async (req, res) => {
    try {
      // Fetch all complaints from the database
      const complaints = await Complaint.find(); // No filter to get all complaints
      res.status(200).json(complaints); // Send all complaints to the admin
    } catch (error) {
      console.error("Error fetching all complaints:", error);
      res.status(500).json({ error: "Failed to fetch complaints" });
    }
  });
  


// Update a complaint
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { status, adminResponse } = req.body;
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status, adminResponse },
      { new: true }
    );
    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ message: "Error updating complaint" });
  }
});

export default router;

