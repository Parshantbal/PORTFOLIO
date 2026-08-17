import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import Navbar from "./Navbar";
import "./BuildForm.css";

const BuildForm = () => {
  const pageRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectIdea: "",
    projectType: "",
    budget: "",
    timeline: "",
    details: "",
  });
  const [status, setStatus] = useState(""); // "", "sending", "sent", "error"

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split the heading into words so they can reveal one by one
      const heading = pageRef.current.querySelector(".BuildHeading");
      if (heading && !heading.dataset.split) {
        const words = heading.textContent.split(" ");
        heading.innerHTML = words
          .map((w) => `<span class="BuildWord"><span class="BuildWordInner">${w}</span></span>`)
          .join(" ");
        heading.dataset.split = "true";
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".BuildBack",
        { opacity: 0, x: -15 },
        { opacity: 1, x: 0, duration: 0.5 }
      )
        .fromTo(
          ".BuildTag",
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.25"
        )
        .fromTo(
          ".BuildWordInner",
          { yPercent: 120, rotate: 6 },
          { yPercent: 0, rotate: 0, duration: 0.7, stagger: 0.08 },
          "-=0.2"
        )
        .fromTo(
          ".BuildIntro",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        )
        .fromTo(
          ".BuildField",
          { opacity: 0, y: 35, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.09, ease: "back.out(1.4)" },
          "-=0.15"
        );

      // subtle continuous floating glow blobs — adds ambient motion
      if (glow1Ref.current) {
        gsap.to(glow1Ref.current, {
          x: 30,
          y: 20,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (glow2Ref.current) {
        gsap.to(glow2Ref.current, {
          x: -25,
          y: -15,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // re-run a small entrance animation for the success screen
  useEffect(() => {
    if (status === "sent") {
      gsap.fromTo(
        ".BuildSuccess",
        { opacity: 0, y: 25, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.5)" }
      );
    }
  }, [status]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/project-inquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || "Failed to send");

      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        projectIdea: "",
        projectType: "",
        budget: "",
        timeline: "",
        details: "",
      });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="BuildNavSticky">
        <Navbar />
      </div>
      <section className="BuildPage" ref={pageRef}>
        <span className="BuildGlow BuildGlow--1" ref={glow1Ref}></span>
        <span className="BuildGlow BuildGlow--2" ref={glow2Ref}></span>

        <div className="BuildInner">
          <Link to="/" className="BuildBack">
            &larr; Back
          </Link>

          {status !== "sent" && (
            <div className="BuildHeader">
          

              <h1 className="BuildHeading">Let's Build Something</h1>
              <p className="BuildIntro">
                Tell me a bit about what you have in mind — the more details, the better I can help.
              </p>
            </div>
          )}

          {status === "sent" ? (
            <div className="BuildSuccess">
              <h2>Thank you!</h2>
              <p>Your project details have been sent. I'll get back to you soon.</p>
              <Link to="/" className="BuildSubmitBtn BuildSuccessBtn">
                Back to Home
              </Link>
            </div>
          ) : (
            <form className="BuildFormEl" onSubmit={handleSubmit}>
              <div className="BuildRow BuildField">
                <div className="BuildFieldGroup">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="BuildFieldGroup">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="BuildFieldGroup BuildField">
                <label>Project Idea</label>
                <textarea
                  name="projectIdea"
                  rows="3"
                  placeholder="What are you looking to build?"
                  value={formData.projectIdea}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="BuildRow BuildField">
                <div className="BuildFieldGroup">
                  <label>Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} required>
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="Website">Website</option>
                    <option value="Web App">Web App</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Landing Page">Landing Page</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="BuildFieldGroup">
                  <label>Budget <span className="BuildOptional">(Optional)</span></label>
                  <select name="budget" value={formData.budget} onChange={handleChange}>
                    <option value="">Not sure yet</option>
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $1,500">$500 - $1,500</option>
                    <option value="$1,500 - $5,000">$1,500 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
              </div>

              <div className="BuildFieldGroup BuildField">
                <label>Timeline <span className="BuildOptional">(Optional)</span></label>
                <select name="timeline" value={formData.timeline} onChange={handleChange}>
                  <option value="">Flexible</option>
                  <option value="ASAP">ASAP</option>
                  <option value="1-2 weeks">1-2 weeks</option>
                  <option value="1 month">1 month</option>
                  <option value="2-3 months">2-3 months</option>
                  <option value="No rush">No rush</option>
                </select>
              </div>

              <div className="BuildFieldGroup BuildField">
                <label>Additional Details</label>
                <textarea
                  name="details"
                  rows="4"
                  placeholder="Anything else I should know — references, must-haves, links..."
                  value={formData.details}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="BuildSubmitBtn BuildField" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Project Details"}
              </button>

              {status === "error" && (
                <p className="BuildStatus BuildStatus--error">Something went wrong. Please try again.</p>
              )}
            </form>
          )}
        </div>
      </section>
    </>
  );
};

export default BuildForm;
