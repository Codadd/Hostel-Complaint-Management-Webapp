// routes/complaints.js
import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// Fetch all complaints for the admin dashboard with optional filters
router.get("/all", async (req, res) => {
  const { status, category } = req.query;
  let filter = {};

  // Apply filters based on status and category if provided
  if (status) {
    filter.status = status;  // Filter complaints based on status (e.g., 'pending', 'resolved')
  }

  if (category) {
    filter.issueType = category;  // Filter complaints based on category (mapped to issueType)
  }

  try {
    const complaints = await Complaint.find(filter);  // Query based on the filter criteria
    res.status(200).json(complaints);  // Send filtered complaints as a response
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// Update a complaint
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { action } = req.body;
  
  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { action },
      { new: true }
    );
    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ message: "Error updating complaint" });
  }
});

export default router;
