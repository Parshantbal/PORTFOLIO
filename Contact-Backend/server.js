import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { Resend } from "resend";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());


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


const resend = new Resend(process.env.RESEND_API_KEY);


const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "All fields are required." });
  }

  try {

    if (process.env.MONGO_URI) {
      await Contact.create({ name, email, message });
    }

 
    const { error } = await resend.emails.send({
      from: `Portfolio Contact Form <${FROM_EMAIL}>`,
      to: process.env.EMAIL_USER,
      replyTo: email, 
      subject: `New portfolio message from ${name}`,
      html: `
        <h3>New message from your portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ success: false, error: "Failed to send email." });
    }

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

    const { error } = await resend.emails.send({
      from: `Portfolio - Project Inquiry <${FROM_EMAIL}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      html: `
        <h3>New project inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Idea:</strong> ${projectIdea}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Budget:</strong> ${budget || "Not specified"}</p>
        <p><strong>Timeline:</strong> ${timeline || "Not specified"}</p>
        <p><strong>Details:</strong></p>
        <p>${(details || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return res.status(500).json({ success: false, error: "Failed to send email." });
    }

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
