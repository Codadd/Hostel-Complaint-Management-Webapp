import express from "express";
import Complaint from "../models/Complaint.js";
import moment from 'moment-timezone';
const router = express.Router();

// Route to get graph data (total complaints per day)
router.get("/graph-data", async (req, res) => {
  try {
    const data = await Complaint.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%dT%H:%M:%S", date: "$createdAt" } }, // Group by date
          count: { $sum: 1 }, // Count total complaints per day
        },
      },
      { $sort: { "_id": 1 } }, // Sort by date ascending
    ]);
    
    console.log("Raw data (UTC):", data);
  

     // Convert to UTC+5:30 time zone
    const formattedComplaints = data.map(complaint => ({
      ...complaint,
      _id: moment.tz(complaint._id, 'UTC').tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss'),
    }));
    console.log("Formatted data with Kolkata time:", formattedComplaints); 
    res.json(formattedComplaints);
  } catch (error) {
    console.error("Error fetching graph data:", error);
    res.status(500).json({ message: "Error fetching graph data" });
  }
});

export default router;
