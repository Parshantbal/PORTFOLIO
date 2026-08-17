import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";


import airbnbImg from "../assets/airbnb-project.png";
import safebankImg from "../assets/safebank-project.png";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "StayEase",
    subtitle: "Airbnb-style booking platform",
    description:
      "A full-stack property rental platform where users can browse listings, filter by location and price, and book stays. Built with a focus on smooth search UX and a clean listing/detail flow.",
    image: airbnbImg,
    tags: ["React", "Node.js", "MongoDB", "Express"],
    live: "https://stayease-hkkr.onrender.com",
    github: "https://github.com/Parshantbal/StayEase",
  },
  {
    id: "02",
    title: "SafeBank",
    subtitle: "Bank management system",
    description:
      "A secure banking dashboard for managing accounts, transactions, and users — covering authentication, role-based access, and real-time balance/transaction tracking.",
    image: safebankImg,
    tags: ["JS", "Node.js", "MONGODB", "JWT Auth"],
    live: "#bank",
    github: "https://github.com/Parshantbal/BankSystem",
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const image = card.querySelector(".ProjectImg");
        const content = card.querySelectorAll(".ProjectReveal");

       
        gsap.fromTo(
          image,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
            },
          }
        );

       
        gsap.fromTo(
          content,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              once: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="Projects" id="projects" ref={sectionRef}>
      <div className="ProjectsHeader">
        <div className="AboutSection">
          <span className="AboutBox"></span>
          <p>PROJECTS</p>
        </div>
       
      </div>

      <div className="ProjectList">
        {projects.map((project, index) => (
          <article
            className={`ProjectCard ${index % 2 === 1 ? "ProjectCard--reverse" : ""}`}
            key={project.id}
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <div className="ProjectImgWrap">
              <div className="ProjectImg">
                <img src={project.image} alt={project.title} />
              </div>
            </div>

            <div className="ProjectContent">
              <p className="ProjectIndex ProjectReveal">{project.id}</p>
              <h3 className="ProjectTitle ProjectReveal">{project.title}</h3>
              <p className="ProjectSubtitle ProjectReveal">{project.subtitle}</p>
              <p className="ProjectDescription ProjectReveal">{project.description}</p>

              <div className="ProjectTags ProjectReveal">
                {project.tags.map((tag) => (
                  <span className="ProjectTag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="ProjectLinks ProjectReveal">
                <a href={project.live} target="_blank" rel="noreferrer" className="ProjectBtn ProjectBtn--filled">
                  Live Demo
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" className="ProjectBtnGithub">
                  GitHub
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
