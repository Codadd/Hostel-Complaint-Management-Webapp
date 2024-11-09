import express from "express";
import nodemailer from "nodemailer";
import Complaint from "../models/Complaint.js";
import AdminComplaint from "../models/AdminComplaint.js";


const router = express.Router();

// Fetch all complaints with optional filters for the admin dashboard
router.get("/all", async (req, res) => {
  const { status, category } = req.query;
  let filter = {};

  if (status) filter.status = status;
  if (category) filter.issueType = category;

  try {
    const complaints = await Complaint.find(filter);
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// Update a complaint's status and admin response
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { status, adminResponse } = req.body;

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status, adminResponse, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ message: "Error updating complaint" });
  }
});


// Get complaints for the logged-in user
router.get("/mycomplaint", async (req, res) => {
  const userId = req.headers.userid; // Extract userId from headers
  console.log("Fetching complaints for User ID:", userId); // Log the user ID

  try {
    const complaints = await Complaint.find({ userId }); // Query by userId
    console.log("Found complaints:", complaints); // Log the fetched complaints
    res.status(200).json({ complaints }); // Send back the complaints
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// POST route to register a complaint
router.post("/registercomplaint", async (req, res) => {
  try {
    const {
      userId,
      issueType,
      description,
      isAnonymous,
      roomNumber,
      email,
      userName,
    } = req.body; // Include email and userName from request body

    // Create a complaint object
    const complaintData = {
      userId,
      issueType,
      description,
      isAnonymous,
    };

    // Include userName and roomNumber only if the complaint is not anonymous
    if (!isAnonymous) {
      if (!userName) {
        return res.status(400).json({ message: "User name is required." });
      }
      complaintData.userName = userName;
      complaintData.roomNumber = roomNumber;
    }

    // Save the complaint in the database
    const complaint = new Complaint(complaintData);
    await complaint.save();

    // Send confirmation email only if the complaint is not anonymous
    if (!isAnonymous) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Complaint Registration Confirmation",
        text: `Hello ${userName},\n\nYour complaint regarding "${issueType}" has been successfully registered.\n\nDescription: ${description}\n\nOur team will review your complaint and respond accordingly.\n\nThank you,\nHostel Management`,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        return res.status(500).json({
          message:
            "Complaint registered, but failed to send confirmation email",
        });
      }
    }

    res.status(201).json({ message: "Complaint registered successfully" });
  } catch (error) {
    console.error("Error registering complaint:", error);
    res.status(500).json({ error: "Failed to register complaint" });
  }
});

export default router;

/*
// routes/complaints.js
import express from "express";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// Fetch all complaints with optional filters for the admin dashboard
router.get("/all", async (req, res) => {
  const { status, category } = req.query;
  let filter = {};

  if (status) filter.status = status;
  if (category) filter.issueType = category;

  try {
    const complaints = await Complaint.find(filter);
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// Update a complaint's status and admin response
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { status, adminResponse } = req.body;

  try {
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status, adminResponse, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedComplaint);
  } catch (error) {
    console.error("Error updating complaint:", error);
    res.status(500).json({ message: "Error updating complaint" });
  }
});

// Register a new complaint
router.post("/registercomplaint", async (req, res) => {
  try {
    const { userId, issueType, description, isAnonymous, roomNumber, email, userName } = req.body;

    const complaintData = { userId, issueType, description, isAnonymous };
    if (!isAnonymous) {
      if (!userName) {
        return res.status(400).json({ message: "User name is required." });
      }
      complaintData.userName = userName;
      complaintData.roomNumber = roomNumber;
    }

    const complaint = new Complaint(complaintData);
    await complaint.save();

    if (!isAnonymous) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Complaint Registration Confirmation",
        text: `Hello ${userName},\n\nYour complaint regarding "${issueType}" has been successfully registered.\n\nDescription: ${description}\n\nThank you,\nHostel Management`,
      };

      try {
        await transporter.sendMail(mailOptions);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        return res.status(500).json({
          message: "Complaint registered, but failed to send confirmation email",
        });
      }
    }

    res.status(201).json({ message: "Complaint registered successfully" });
  } catch (error) {
    console.error("Error registering complaint:", error);
    res.status(500).json({ error: "Failed to register complaint" });
  }
});

export default router;

*/