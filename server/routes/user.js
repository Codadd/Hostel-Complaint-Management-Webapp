import express from "express";
import bcrypt from "bcrypt"; // Fixed typo
const router = express.Router();
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.json({ message: "User already exists" });
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, email, password: hashpassword });

  await newUser.save();
  return res.json({ status: true, message: "Record registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
  return res.json({ status: true, message: "Login successfully" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not registered!" });
    }
    const token = jwt.sign({ id: user.id }, process.env.KEY, {
      expiresIn: "5m",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Use env variables
        pass: process.env.EMAIL_PASS, // Use env variables
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // Use env variables
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    await transporter.sendMail(mailOptions); // Await the sendMail method
    return res.json({ status: true, message: "Email sent" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error sending email" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params; // Fixed token extraction
  const { password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate({ _id: id }, { password: hashpassword });
    return res.json({ status: true, message: "Password updated successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" }); // Proper error handling
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "no token" });
    }
    const decoded = await jwt.verify(token, process.env.KEY);
    next();
  } catch {
    return res.json(err);
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "authorized" });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
});
export { router as UserRouter };
