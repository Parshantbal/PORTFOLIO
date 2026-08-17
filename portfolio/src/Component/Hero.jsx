import React, { useState, useRef } from 'react'
import "./Hero.css"
import { Link } from 'react-router-dom';

const Hero = () => {
    const [showToast, setShowToast] = useState(false);
    const timeoutRef = useRef(null);

    const handleViewProjects = (e) => {
        e.preventDefault();
        setShowToast(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setShowToast(false), 2800);
    };

    return (
        <div className='Hero' id='homePage'>

            <div className="Eyelines">
                <div className="strokeWrapper">
                    <span className="smallBox"></span>
                    <p className="strokeText">CREATIVE DEVELOPER</p>
                </div>
                TURNING IDEAS INTO  <br></br>
                <span> DIGITAL  EXPERIENCES.</span>
            </div>

            <div className="Introduction">
            I'm Parshant Bal, a MERN Stack Developer passionate about architecting scalable web applications and crafting digital experiences that leave a lasting impression.
            </div>

            <div className="Contact_button">
                <div className="Project_link">
                    <a href='#project' onClick={handleViewProjects}>VIEW PROJECTS →</a>
                </div>

                <div>
                    <Link to="/build" className="Contact_link">LET'S BUILD  →</Link>
                </div>
            </div>

            <div className={`HeroToast ${showToast ? "HeroToast--show" : ""}`}>
                🚧 Work in progress — coming soon!
            </div>

        </div>
    )
}

export default Hero
