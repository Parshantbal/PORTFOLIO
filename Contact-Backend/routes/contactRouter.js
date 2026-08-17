import express from "express";
import { Resend } from "resend";

const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);


const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const { error } = await resend.emails.send({
      from: `Portfolio Contact <${FROM_EMAIL}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,

      subject: `Portfolio Contact - ${name}`,

      html: `
        <h2>New Contact Form Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>

        <p>${message}</p>
      `,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        error: "Failed to send email",
      });
    }

    res.status(200).json({
      success: true,
      message: "Email sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Failed to send email",
    });
  }
});

export default router;
