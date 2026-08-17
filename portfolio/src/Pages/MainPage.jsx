import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Component/Navbar'
import Hero from '../Component/Hero'
import TechMarquee from '../Component/TechMarquee'
import Project from './Project'
import Skills from '../Component/Skills'
import Contact from '../Component/Contact'
import Footer from '../Component/Footer'

const MainPage = () => {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTarget;
    if (!target) return;

    
    const timer = setTimeout(() => {
      if (target === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (target === "about-section") {
        const wrapper = document.getElementById("about-section");
        if (wrapper) {
          const revealDistance = (wrapper.offsetHeight - window.innerHeight) * 0.9;
          window.scrollTo({ top: wrapper.offsetTop + revealDistance, behavior: "smooth" });
        }
      } else {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <div>
      <Navbar/>
      <Hero/>
      <TechMarquee/>
      <Project/>
      <Skills/>
      <Contact/>
      <Footer/>
    </div>
  )
}

export default MainPage
