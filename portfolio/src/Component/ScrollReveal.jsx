import React, { useEffect, useRef } from "react";
import "./ScrollReveal.css";
import About from "./About";

export default function ScrollReveal() {
  const pinWrapRef = useRef(null);
  const pinStageRef = useRef(null);
  const curtainRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    let cleanupDesktop = null;
    let cleanupMobile = null;

    function setupDesktop() {
      function update() {
        tickingRef.current = false;
        const wrap = pinWrapRef.current;
        const curtain = curtainRef.current;
        if (!wrap || !curtain) return;

        const rect = wrap.getBoundingClientRect();
        const viewportH = window.innerHeight;

        const scrollable = rect.height - viewportH;
        const REVEAL_PORTION = 0.6;
        const revealDistance = scrollable * REVEAL_PORTION;

        let progress = -rect.top / revealDistance;
        progress = Math.min(1, Math.max(0, progress));

        curtain.style.transform = `scaleY(${1 - progress})`;
      }

      function onScroll() {
        if (!tickingRef.current) {
          tickingRef.current = true;
          requestAnimationFrame(update);
        }
      }

      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        // reset inline style so mobile mode starts clean
        if (curtainRef.current) curtainRef.current.style.transform = "";
      };
    }

    function setupMobile() {
      const curtain = curtainRef.current;
      const wrap = pinWrapRef.current;
      if (!curtain || !wrap) return () => {};

      // One-time reveal jab section viewport mein aaye — scroll se
      // linked nahi, isliye koi per-frame jank nahi hota.
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              curtain.classList.add("curtain--open");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      observer.observe(wrap);

      return () => {
        observer.disconnect();
        curtain.classList.remove("curtain--open");
      };
    }

    function applyMode(isMobile) {
      if (cleanupDesktop) {
        cleanupDesktop();
        cleanupDesktop = null;
      }
      if (cleanupMobile) {
        cleanupMobile();
        cleanupMobile = null;
      }

      if (isMobile) {
        cleanupMobile = setupMobile();
      } else {
        cleanupDesktop = setupDesktop();
      }
    }

    applyMode(mq.matches);

    const onChange = (e) => applyMode(e.matches);
    mq.addEventListener("change", onChange);

    return () => {
      mq.removeEventListener("change", onChange);
      if (cleanupDesktop) cleanupDesktop();
      if (cleanupMobile) cleanupMobile();
    };
  }, []);

  return (
    <div className="scroll-reveal-demo">
      <section className="page page--hero"></section>

      <section className="pin-wrap" id="about-section" ref={pinWrapRef}>
        <div className="pin-stage" ref={pinStageRef}>
          <div className="reveal-content">
            <About />
          </div>

          <div className="curtain" ref={curtainRef} />
        </div>
      </section>
    </div>
  );
}