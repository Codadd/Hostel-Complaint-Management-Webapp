import express from "express";
import nodemailer from "nodemailer";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// Update complaint status and response
router.put("/admincomplaint/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status, response } = req.body;

    // Logic to find and update the complaint by ID
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status, response },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.status(200).json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to update complaint" });
  }
});

// Get all complaints with optional filters
router.get("/admincomplaint/all", async (req, res) => {
  const { status, category } = req.query;
  let filter = {};

  if (status) filter.status = status;
  if (category) filter.issueType = category; // assuming "issueType" is the category field

  try {
    const complaints = await Complaint.find(filter);
    res.status(200).json(complaints);
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
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
