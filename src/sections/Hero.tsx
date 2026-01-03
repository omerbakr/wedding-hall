"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "lenis/react";

import { heroImages } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  activeSlug?: string;
}

const Hero = ({ activeSlug }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  
  const lenis = useLenis();

  useEffect(() => {
    if (!containerRef.current || !contentRef.current || !titleRef.current) return;

    ctxRef.current = gsap.context(() => {
      
      const sessionKey = "hero-intro-played";
      const hasPlayed = sessionStorage.getItem(sessionKey);
      const images = gsap.utils.toArray<HTMLDivElement>(".hero-img");

      if (!hasPlayed) {
        
        if (lenis) {
          lenis.scrollTo(0, { immediate: true });
          lenis.stop();
        }

        const mainTimeline = gsap.timeline({
          onComplete: () => {
            if (lenis) lenis.start();
            ScrollTrigger.refresh();
            sessionStorage.setItem(sessionKey, "true");
          },
        });

        images.forEach((img, i) => {
          mainTimeline.fromTo(
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

        mainTimeline.to(
          containerRef.current,
          {
            width: "100vw",
            height: "100vh",
            duration: 1.2,
            ease: "expo.inOut",
          },
          "+=0.4"
        );

        mainTimeline.to(
          contentRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        );

      } else {
        gsap.set(containerRef.current, { width: "100vw", height: "100vh" });
        gsap.set(contentRef.current, { opacity: 1 });
        gsap.set(images, { clipPath: "inset(0% 0% 0% 0%)" });
      }

      gsap.to(titleRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "center center",
          end: "bottom top",
          scrub: 1.5,
        },
      });

    }, containerRef);

    return () => {
      ctxRef.current?.revert();
      if (lenis) lenis.start();
    };
  }, [lenis]);

  return (
    <section className="flex-center h-screen w-screen overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-60 h-80 sm:w-[300px] sm:h-[400px] overflow-hidden"
      >
        {heroImages.map((img, i) => (
          <div
            key={i}
            className="hero-img absolute inset-0 [clip-path:inset(100%_0%_0%_0%)]"
            style={{ zIndex: i + 1 }}
          >
            <Image
              src={img.imgPath}
              alt={`Şelale Düğün Salonu düğün fotoğrafı ${i + 1}`}
              fill
              sizes="(max-width: 767px) 100vh, 100vw"
              className="object-cover"
              loading="eager"
              priority={i === heroImages.length - 1}
            />
          </div>
        ))}
      </div>

      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center w-screen absolute z-10 opacity-0"
      >
        <div className="flex-center w-screen px-5 lg:justify-between">
          <p className="text-white/90 max-lg:hidden">
            Sizin Hikayeniz, Bizim Sahnemiz.
          </p>
          <h1
            ref={titleRef}
            className="text-8xl font-bold font-corinthia text-white pr-6"
          >
            Şelale
          </h1>
          <h1 className="sr-only">
            Şelale Düğün Salonu – Doğanın İçinde Unutulmaz Düğünler
          </h1>
          <p className="text-right text-white/90 max-lg:hidden">
            Aşkınızı kutlamak için en doğal, <br /> en büyüleyici atmosfer.
          </p>
        </div>

        {activeSlug && (
          <div className="col-center gap-1.5 text-white sm:hidden">
            <p>Şu an düğünde misiniz?</p>
            <p className="text-xl font-semibold mt-0.5">
              Gelin & Damada bir anı bırakın
            </p>

            <Link
              href={`/${activeSlug}`}
              className="bg-primary font-bold px-4 py-2 rounded-sm"
            >
              Paylaş
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;