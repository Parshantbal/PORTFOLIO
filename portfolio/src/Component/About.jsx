import React from 'react'
import "./About.css";
import myImage from "../assets/my image.png";
const About = () => {
  return (
    <section className="About" >

      <div className="AboutSection">
        <span className="AboutBox"></span>
        <p>ABOUT ME</p>
      </div>

      <div className="AboutGrid">

        <div className="AboutImg">
          <img src={myImage} alt="Parshant Bal" />
        </div>

        <div className="AboutContent">
          <div className="Text ">
            <h1>
              I turn ideas into
              things you can actually use.
              
            </h1>
          </div>

          <div className="AboutMe">
            I'm Parshant Bal, a developer who enjoys solving
            problems and figuring out how things work. I care
            about writing thoughtful code, creating simple
            experiences, and constantly improving along the way.
          </div>
        </div>

      </div>

    </section>
  );
};


export default About
