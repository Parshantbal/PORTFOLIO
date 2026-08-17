import React from "react";
import "./TechMarquee.css";

const techStack = [
  {
    name: "React",
    icon: (
      <svg viewBox="0 0 24 24" fill="#61DAFB">
        <circle cx="12" cy="12" r="2.2" />
        <g fill="none" stroke="#61DAFB" strokeWidth="1.4">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
  },
  
  {
    name: "JavaScript",
    icon: (
      <svg viewBox="0 0 24 24" fill="#F7DF1E">
        <rect width="24" height="24" rx="3" />
        <text x="12" y="17" fontSize="10" fontWeight="700" fill="#000" textAnchor="middle" fontFamily="Arial">
          JS
        </text>
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="#339933">
        <path d="M12 1 2 6.5v11L12 23l10-5.5v-11L12 1z" opacity=".15" />
        <path d="M12 1 2 6.5v11L12 23l10-5.5v-11L12 1zm0 2.2 8 4.4v8.8l-8 4.4-8-4.4V7.6l8-4.4z" />
        <circle cx="12" cy="12" r="3.2" />
      </svg>
    ),
  },
  {
    name: "HTML5",
    icon: (
      <svg viewBox="0 0 24 24" fill="#E34F26">
        <path d="M3 2l1.6 18L12 22l7.4-2L21 2H3zm14.6 5.9H8.3l.2 2.4h8.9l-.6 6.7-4.8 1.4-4.8-1.4-.3-3.6h2.4l.2 1.8 2.5.7 2.5-.7.3-3H6.6L6 5.5H18l-.4 2.4z" />
      </svg>
    ),
  },
  {
    name: "CSS3",
    icon: (
      <svg viewBox="0 0 24 24" fill="#1572B6">
        <path d="M3 2l1.6 18L12 22l7.4-2L21 2H3zm13.8 6H8l.2 2h8.4l-.6 8-4 1.2-4-1.2-.3-3h2l.1 1.5 2.2.6 2.2-.6.3-3.7H7.7L7.1 6h9.9l-.2 2z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    icon: (
      <svg viewBox="0 0 24 24" fill="#06B6D4">
        <path d="M2 12c1.5-4 4-6 7-6s5 2 6.5 4c1.2-2 3-3 5-2.4-1.5-2.6-3.7-4-6.5-4s-5 2-6.5 4c-1.2 0-2.8.4-3.5 1.4A6 6 0 002 12zm0 6c1.5-4 4-6 7-6s5 2 6.5 4c1.2-2 3-3 5-2.4-1.5-2.6-3.7-4-6.5-4s-5 2-6.5 4c-1.2 0-2.8.4-3.5 1.4A6 6 0 002 18z" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg viewBox="0 0 24 24" fill="#000">
        <rect width="24" height="24" rx="4" fill="#000" />
        <path d="M9 7h2.4L17 17h-2.5l-1.1-2.2H9.6L8.5 17H6l3-10zm.9 6h2.2l-1.1-3.6L9.9 13z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg viewBox="0 0 24 24" fill="#47A248">
        <ellipse cx="12" cy="19" rx="6" ry="2" />
        <path d="M12 2c3 4 4 8 2.5 12.5C13.8 16.5 12 18 12 18s-1.8-1.5-2.5-3.5C8 10 9 6 12 2z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" fill="#000">
        <rect width="24" height="24" rx="4" />
        <path d="M6 6h3l3 5 3-5h3l-4.5 7 4.5 7h-3l-3-5-3 5H6l4.5-7L6 6z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg viewBox="0 0 24 24" fill="#F24E1E">
        <circle cx="12" cy="6" r="3.2" />
        <circle cx="7" cy="17" r="3.2" />
        <circle cx="17" cy="17" r="3.2" />
      </svg>
    ),
  },
];


export default function TechMarquee({ speed = 22, reverse = false, items = techStack }) {
  return (
    <div className="marquee-border">
      <div
        className={`marquee-track ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="marquee-group">
          {items.map((tech) => (
            <div className="tech-item" key={tech.name}>
              {tech.icon}
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {items.map((tech) => (
            <div className="tech-item" key={`${tech.name}-dup`}>
              {tech.icon}
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
