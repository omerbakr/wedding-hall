"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const HeroContent = () => {
  const titleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      scrollTrigger: {
        trigger: titleRef.current,
        start: "center center",
        end: "bottom top",
        scrub: 1.5,
      },
      yPercent: -50,
    });
  }, []);

  return (
    <main className="hero-content">
      <div className="flex-center w-screen px-5 lg:justify-between">
        <p>Sizin Hikayeniz, Bizim Sahnemiz.</p>
        <h1
          className="text-8xl font-bold font-corinthia text-white opacity-90 pr-6"
          ref={titleRef}
        >
          Şelale
        </h1>
        <p className="text-right">
          Aşkınızı kutlamak için en doğal, <br /> en büyüleyici atmosfer.
        </p>
      </div>
    </main>
  );
};

export default HeroContent;