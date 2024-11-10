import express from "express";
import nodemailer from "nodemailer";
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
// Update a complaint's status and send email
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { status, adminResponse } = req.body;

  // try {
  //   const updatedComplaint = await Complaint.findByIdAndUpdate(
  //     id,
  //     { status, adminResponse, updatedAt: Date.now() },
  //     { new: true }
  //   );
  //   res.status(200).json(updatedComplaint);
  // } catch (error) {
  //   console.error("Error updating complaint:", error);
  //   res.status(500).json({ message: "Error updating complaint" });
  // }

  try{
    const complaint = await Complaint.findById(id);

    if(!complaint){
       return res.status(404).json({message: "complaint not found"});
    }
    complaint.status = status;
    complaint.adminResponse = adminResponse;
    complaint.updatedAt = Date.now();

    const updatedComplaint = await complaint.save();

    if(!complaint.isAnonymous && complaint.email){
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: complaint.email,
        subject: `Complaint Status updated: ${complaint.issueType}`,
        text:`Hello ${complaint.userName},\n\nYour complaint regarding "${complaint.issueType}" has been updated.\n\nNew status: ${status}\n\nAdmin Response: ${adminResponse}\n\nThank you,\nHostel Management`,
      };
      try{
        await transporter.sendMail(mailOptions);
      }catch(emailError){
        console.error("Error sending email:",emailError);
        return res.status(500).json({
          message:"Complaint updated, but failed to send status update email",
        });
      }
    }
    res.status(200).json(updatedComplaint);
  }catch(error)
  {
    console.error("Error updating complaint:",error);
    res.status(500).json({ message: "Error updating complaint" });
  }
});


// Get complaints for the logged-in user
router.get("/mycomplaint", async (req, res) => {
  const userId = req.headers.userid; // Extract userId from headers
  console.log("Fetching complaints for User ID:", userId);

  try {
    const complaints = await Complaint.find({ userId });
    console.log("Found complaints:", complaints);
    res.status(200).json({ complaints });
  } catch (error) {
    console.error("Error fetching complaints:", error);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});


// Route to submit feedback for a specific complaint
router.put("/feedback/:id", async (req, res) => {
  try {
    const { feedback } = req.body;
    const { id } = req.params;

    // Update complaint with feedback
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { feedback },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Feedback submitted successfully", complaint: updatedComplaint });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Server error" });
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
    } = req.body;

    const complaintData = {
      userId,
      issueType,
      description,
      isAnonymous,
      email, //Add email to the saved data
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
