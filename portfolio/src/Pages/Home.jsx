import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Home.css";

export default function Home({ setLoading }) {
  const [count, setCount] = useState(0);
  const loaderRef = useRef(null);
  const lettersRef = useRef([]);
  const hasExited = useRef(false);

  const word = "PARSHANT";

  useEffect(() => {
    gsap.fromTo(
      lettersRef.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.2,
      }
    );
  }, []);


  useEffect(() => {
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

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    if (count === 100 && !hasExited.current) {
      hasExited.current = true;

      const tl = gsap.timeline({
        delay: 0.4,
        onComplete: () => setLoading(false),
      });

      tl.to(lettersRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        stagger: 0.05,
      })
        .to(
          ".loading",
          {
            y: 40,
            opacity: 0,
            duration: 0.4,
            ease: "power3.in",
          },
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

      <div className="content">
        <h1 className="LoaderWord">
          {word.split("").map((letter, i) => (
            <span
              key={i}
              className="LoaderLetter"
              ref={(el) => (lettersRef.current[i] = el)}
            >
              {letter}
            </span>
          ))}
        </h1>

        <div className="loading">
          <span className="LoadingLabel">Loading</span>
          <span className="LoadingPercent">{count}%</span>
        </div>
      </div>
    </div>
  );
}