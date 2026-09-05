import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Home.css";

const WORD = "PARSHANT";
const CONVERGE_INDEX = WORD.indexOf("H"); 

export default function Home({ setLoading }) {
  const [count, setCount] = useState(0);
  const loaderRef = useRef(null);
  const badgeRef = useRef(null);
  const wordRef = useRef(null);
  const lettersRef = useRef([]);
  const barFillRef = useRef(null);
  const hasExited = useRef(false);

  useEffect(() => {
    function startCounting() {
      let start = 0;
      const interval = setInterval(() => {
        start += 10;
        if (start >= 100) {
          setCount(100);
          clearInterval(interval);
        } else {
          setCount(start);
        }
      }, 80);
    }

   
    const hEl = lettersRef.current[CONVERGE_INDEX];
    const hRect = hEl.getBoundingClientRect();
    const hCenter = hRect.left + hRect.width / 2;

    const deltas = lettersRef.current.map((el) => {
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      return hCenter - center;
    });

    const tl = gsap.timeline({ delay: 0.4 });

  
    tl.fromTo(
      lettersRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.04 }
    )
      .to({}, { duration: 0.6 }) 

  
      .to(lettersRef.current, {
        x: (i) => deltas[i],
        scale: 0.25,
        opacity: 0,
        duration: 0.85,
        ease: "power2.in",
        stagger: { each: 0.035, from: CONVERGE_INDEX },
      })

     
      .to(wordRef.current, {
        opacity: 0,
        duration: 0.1,
      })
      .fromTo(
        badgeRef.current,
        { scale: 0, rotate: -25, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: "back.out(2.2)" },
        "<"
      )
      .fromTo(
        ".loading",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      )
      .call(startCounting);
  }, []);

  useEffect(() => {
    if (barFillRef.current) {
      gsap.to(barFillRef.current, {
        width: `${count}%`,
        duration: 0.3,
        ease: "power1.out",
      });
    }
  }, [count]);

  useEffect(() => {
    if (count === 100 && !hasExited.current) {
      hasExited.current = true;

      const tl = gsap.timeline({
        delay: 0.4,
        onComplete: () => setLoading(false),
      });

      tl.to(badgeRef.current, {
        scale: 1.5,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
        .to(
          ".loading",
          { y: 40, opacity: 0, duration: 0.4, ease: "power3.in" },
          "<"
        )
        .to(loaderRef.current, {
          y: "100%",
          duration: 0.8,
          ease: "power4.inOut",
        });
    }
  }, [count, setLoading]);

  return (
    <div className="loader" ref={loaderRef}>
      <div className="LoaderGlow"></div>
      <div className="LoaderGrid"></div>

      <div className="content">
        <div className="OverlapStage">
          <span className="OverlapWord" ref={wordRef}>
            {WORD.split("").map((letter, i) => (
              <span
                key={i}
                className="OverlapLetter"
                ref={(el) => (lettersRef.current[i] = el)}
              >
                {letter}
              </span>
            ))}
          </span>

          <div className="PBBadge" ref={badgeRef}>
            <span>PB</span>
          </div>
        </div>

        <div className="loading">
          <span className="LoadingPercent">{count}%</span>
          <div className="LoaderBarTrack">
            <div className="LoaderBarFill" ref={barFillRef}>
              <span className="LoaderBarGlowDot"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
