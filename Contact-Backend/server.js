import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors  from "cors";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());

/* =========================================================
   OPTIONAL — save every submission to MongoDB too.
   If you don't want this, just skip the MONGO_URI env var
   and comment out the mongoose.connect() + Contact.create() lines.
   ========================================================= */
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err.message));
}

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

const projectInquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  projectIdea: String,
  projectType: String,
  budget: String,
  timeline: String,
  details: String,
  createdAt: { type: Date, default: Date.now },
});

const ProjectInquiry =
  mongoose.models.ProjectInquiry || mongoose.model("ProjectInquiry", projectInquirySchema);

/* =========================================================
   Email transporter — using Gmail here. You need an
   "App Password" (not your normal Gmail password) — see
   the setup steps below.
   ========================================================= */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

// SMTP connection test
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailer Error:", error);
  } else {
    console.log("✅ Mailer Ready");
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {
    // 1. Save to MongoDB (optional — skip if MONGO_URI not set)
    if (process.env.MONGO_URI) {
      await Contact.create({ name, email, message });
    }

    // 2. Send yourself an email notification
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // sends to yourself
      replyTo: email, // so you can hit "Reply" and it goes to them
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err.message);
    res.status(500).json({ success: false, error: "Something went wrong. Please try again." });
  }
});

app.post("/api/project-inquiry", async (req, res) => {
  const { name, email, projectIdea, projectType, budget, timeline, details } = req.body;

  console.log("📩 Project Inquiry Received");

  if (!name || !email || !projectIdea || !projectType) {
    return res.status(400).json({
      success: false,
      error: "Please fill in the required fields.",
    });
  }

  try {
    if (process.env.MONGO_URI) {
      await ProjectInquiry.create({
        name,
        email,
        projectIdea,
        projectType,
        budget,
        timeline,
        details,
      });

      console.log("✅ Saved to MongoDB");
    }

    console.log("📤 Sending Email...");

    await transporter.sendMail({
      from: `"Portfolio - Project Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: `Name: ${name}`,
    });

    console.log("✅ Email Sent");

    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Project inquiry error:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
