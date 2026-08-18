import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./Navbar.css";


function scrollToAboutSection() {
    const wrapper = document.getElementById("about-section");
    if (!wrapper) return;

    const revealDistance = (wrapper.offsetHeight - window.innerHeight) * 0.9;
    const targetY = wrapper.offsetTop + revealDistance;

    window.scrollTo({ top: targetY, behavior: "smooth" });
}

function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const closeMenu = () => setMenuOpen(false);

    const openResume = () => {
        window.open("/Parshant_Bal_Resume.pdf", "_blank");
    };


    const goToSection = (e, id, isAbout = false) => {
        e.preventDefault();
        closeMenu();

        if (location.pathname === "/") {
            isAbout ? scrollToAboutSection() : scrollToId(id);
        } else {
            navigate("/", { state: { scrollTarget: id, isAbout } });
        }
    };

    const goHome = (e) => {
        e.preventDefault();
        closeMenu();

        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/", { state: { scrollTarget: "top" } });
        }
    };

    return (
        <>
            <div className='Navbar'>

                <div className="brand" onClick={goHome} style={{ cursor: "pointer" }}>
                    <div className="logo">PB</div>
                    <div className="logoName">PARSHANT BAL</div>
                </div>

                <div className="allAbout">
                    <a href="#projects" onClick={(e) => goToSection(e, "projects")}>Project</a>
                    <a href="#skills" onClick={(e) => goToSection(e, "skills")}>Skill</a>
                    <a href="#about-section" onClick={(e) => goToSection(e, "about-section", true)}>About</a>
                    <a href="#contact" onClick={(e) => goToSection(e, "contact")}>Contact</a>

                    <button className="text-sm Resumebtn" onClick={openResume}>
                        DOWNLOAD <br />
                        RESUME
                    </button>
                </div>

                <button
                    className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <div className={`mobileMenu ${menuOpen ? "mobileMenu--open" : ""}`}>

                <div className="mobileMenuBrand" onClick={goHome} style={{ cursor: "pointer" }}>
                    <div className="logo">PB</div>
                    <div className="logoName">Parshant Bal</div>
                </div>

                <a href="/" onClick={goHome}>Home</a>
                <a href="#projects" onClick={(e) => goToSection(e, "projects")}>Project</a>
                <a href="#skills" onClick={(e) => goToSection(e, "skills")}>Skill</a>
                <a href="#about-section" onClick={(e) => goToSection(e, "about-section", true)}>About</a>
                <a href="#contact" onClick={(e) => goToSection(e, "contact")}>Contact</a>

                <button
                    className="Resumebtn mobileResumeBtn"
                    onClick={() => {
                        closeMenu();
                        openResume();
                    }}
                >
                    DOWNLOAD <br />
                    RESUME
                </button>
            </div>

            {menuOpen && (
                <div className="mobileMenuOverlay" onClick={closeMenu}></div>
            )}
        </>
    );
};

export default Navbar;
