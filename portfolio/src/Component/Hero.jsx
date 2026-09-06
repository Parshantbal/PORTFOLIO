import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import "./Hero.css"
import { Link } from 'react-router-dom';

const PHRASES = [
    "CREATIVE DEVELOPER",
    "MERN STACK DEVELOPER",
    "PROBLEM SOLVER",
    "OPEN TO WORK",
];

const Hero = () => {
    const [showToast, setShowToast] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const timeoutRef = useRef(null);
    const strokeRef = useRef(null);

    const handleViewProjects = (e) => {
        e.preventDefault();
        setShowToast(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setShowToast(false), 2800);
    };


    useEffect(() => {
        const el = strokeRef.current;
        if (!el) return;

        gsap.set(el, { clipPath: "inset(0 100% 0 0)" });

        const tl = gsap.timeline();

        tl.to(el, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1,
            ease: "power2.out",
        })
            .to({}, { duration: 1.4 }) 
            .to(el, {
                clipPath: "inset(0 0 0 100%)",
                duration: 0.8,
                ease: "power2.in",
            })
            .call(() => {
                setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
            });

        return () => tl.kill();
    }, [phraseIndex]);

    return (
        <div className='Hero' id='homePage'>

            <div className="Eyelines">
                <div className="strokeWrapper">
                    <span className="smallBox"></span>
                    <p className="strokeText" ref={strokeRef}>
                        {PHRASES[phraseIndex]}
                    </p>
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
