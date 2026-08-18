import React, { useEffect, useRef } from "react";
import "./ScrollReveal.css";
import About from "./About";

/* SPEED — smaller number = less scroll needed = faster reveal.
   Same formula now applies to mobile and desktop, since About's
   mobile layout fits within one screen and pinning works
   consistently everywhere. */
const REVEAL_PORTION = 0.45;

export default function ScrollReveal() {
  const pinWrapRef = useRef(null);
  const curtainRef = useRef(null);
  const tickingRef = useRef(false);

  useEffect(() => {
    function update() {
      tickingRef.current = false;
      const wrap = pinWrapRef.current;
      const curtain = curtainRef.current;
      if (!wrap || !curtain) return;

      const rect = wrap.getBoundingClientRect();
      const viewportH = window.innerHeight;

      const scrollable = rect.height - viewportH;
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
    };
  }, []);

  return (
    <div className="scroll-reveal-demo">
      <section className="page page--hero"></section>

      <section className="pin-wrap" id="about-section" ref={pinWrapRef}>
        <div className="pin-stage">
          <div className="reveal-content">
            <About />
          </div>

          <div className="curtain" ref={curtainRef} />
        </div>
      </section>
    </div>
  );
}
