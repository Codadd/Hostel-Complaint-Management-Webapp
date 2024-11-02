import express from "express";
import nodemailer from "nodemailer";
import Complaint from "../models/Complaint.js";

const router = express.Router();

// POST route to register a complaint
router.post("/registercomplaint", async (req, res) => {
  try {
    const { issueType, description, isAnonymous, roomNumber, email, userName } =
      req.body; // Include email and userName from request body

    // Create a complaint object
    const complaintData = {
      issueType,
      description,
      isAnonymous,
    };

    // Include userName and roomNumber only if the complaint is not anonymous
    if (!isAnonymous) {
      if (!userName) {
        return res.status(400).json({ message: "User name is required." }); // Handle missing userName
      }
      complaintData.userName = userName;
      complaintData.roomNumber = roomNumber;
    }

    // Save the complaint in the database
    const complaint = new Complaint(complaintData);
    await complaint.save();

    // Configure the transporter for nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your email address in .env
        pass: process.env.EMAIL_PASS, // Your email password in .env
      },
    });

    // Set up the email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: email, // Use the email provided in the complaint data
      subject: "Complaint Registration Confirmation",
      text: `Hello ${
        isAnonymous ? "User" : userName
      },\n\nYour complaint regarding "${issueType}" has been successfully registered.\n\nDescription: ${description}\n\nOur team will review your complaint and respond accordingly.\n\nThank you,\nHostel Management`,
    };

    // Send the confirmation email
    try {
      await transporter.sendMail(mailOptions); // Attempt to send the email
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return res.status(500).json({
        message: "Complaint registered, but failed to send confirmation email",
      });
    }

    // Send success response
    res.status(201).json({ message: "Complaint registered successfully" });
  } catch (error) {
    console.error("Error registering complaint:", error);
    res.status(500).json({ error: "Failed to register complaint" });
  }
});

export default router;
