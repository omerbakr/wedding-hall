"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Image from "next/image";

import { heroImages } from "@/constants";
import HeroContent from "@/components/HeroText";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !containerRef.current) return;

    lenis.stop();

    const images = gsap.utils.toArray<HTMLDivElement>(".hero-img");

    const tl = gsap.timeline({
      onComplete: () => {
        lenis.start();
      },
    });

    images.forEach((img, i) => {
      tl.fromTo(
        img,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 0.6,
          ease: "power1.out",
        },
        i === 0 ? 0 : `-=${gsap.utils.random(0.45, 0.49)}`
      );
    });

    tl.to(
      containerRef.current,
      {
        width: "100vw",
        height: "100vh",
        duration: 1.2,
        ease: "expo.inOut",
      },
      "+=0.4"
    );

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      lenis.start();
    };
  }, [lenis]);

  return (
    <section className="flex-center h-screen w-screen overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-[300px] h-[400px] overflow-hidden"
      >
        {heroImages.map((img, i) => {
          return (
            <div
              key={i}
              className="hero-img absolute top-0 left-0 w-full h-full"
              style={{
                clipPath: "inset(100% 0% 0% 0%)",
                zIndex: i + 1,
              }}
            >
              <Image
                src={img.imgPath}
                alt="hero-photo"
                fill
                sizes="(max-width: 767px) 100vh, 100vw"
                className="object-cover"
                priority
                loading="eager"
              />
            </div>
          );
        })}
      </div>

      <HeroContent />
    </section>
  );
};

export default Hero;