import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiGreensock,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiFigma,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { FaCss3Alt } from "react-icons/fa";

import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: FaCss3Alt, color: "#1572B6" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#38BDF8" },
  { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
  { name: "Node.js", icon: SiNodedotjs, color: "#3C873A" },
  { name: "Express", icon: SiExpress, color: "#B8BFC7" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#C9D1D9" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
];

const SkillCard = ({ skill }) => {
  const Icon = skill.icon;

  return (
    <div
      className="SkillCard"
      style={{ "--glow-color": skill.color }}
    >
      <div className="SkillCardGlow" />

      <div className="SkillCardContent">
        <span className="SkillCardName">
          {skill.name}
        </span>

        <span className="SkillCardIcon">
          <Icon size={30} />
        </span>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards =
        cardsRef.current?.querySelectorAll(".SkillCard");

      if (!cards?.length) return;



      gsap.fromTo(
        cards,
        {
          y: 25,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          duration: 0.6,

          ease: "power2.out",

          stagger: 0.04,

          overwrite: "auto",

          scrollTrigger: {
            trigger: sectionRef.current,

            start: "top 75%",

            once: true,

            invalidateOnRefresh: true,
          },
        }
      );
    }, sectionRef);

  

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      ctx.revert();
    };
  }, []);

  return (
    <div className="SkillsPinWrapper">
      <section
        className="Skills"
        id="skills"
        ref={sectionRef}
      >
        <div className="SkillsHeader">
          <div className="AboutSection">
            <span className="AboutBox"></span>

            <p>SKILLS</p>
          </div>
        </div>

        <div
          className="SkillGrid"
          ref={cardsRef}
        >
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              skill={skill}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;