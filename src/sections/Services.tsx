"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin, ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Image from "next/image";

import VennSchema from "@/components/VennSchema";
import { serviceImages } from "@/constants";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const path1 = "M300,100 m-150,0 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0";
const path2 = "M225,230 m-150,0 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0";
const path3 = "M375,230 m-150,0 a150,150 0 1,0 300,0 a150,150 0 1,0 -300,0";

const Services = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const images = gsap.utils.toArray(".floating-image");

      const startDelay = 1;
      const spreadDuration = 4
      const imageAnimDuration = 2;

      const totalSceneDuration = startDelay + spreadDuration + imageAnimDuration;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=350%",
          scrub: 1,
          pin: true,
        },
      });

      tl.from(".service-title", {
        y: -50,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
      });

      tl.to("#dot1",
        {
          duration: totalSceneDuration,
          ease: "none",
          motionPath: {
            path: path1,
            start: 0,
            end: 3,
          },
        },
        0 
      );

      tl.to("#dot2",
        {
          duration: totalSceneDuration,
          ease: "none",
          motionPath: { path: path2, start: 0.33, end: 3.33 },
        },
        "<"
      );

      tl.to("#dot3",
        {
          duration: totalSceneDuration,
          ease: "none",
          motionPath: { path: path3, start: 0.66, end: 3.66 },
        },
        "<"
      );

      const w = window.innerWidth;
      const h = window.innerHeight;
      const maxDist = Math.sqrt(w * w + h * h) / 2;
      const safeRadius = maxDist + 300;

      images.forEach((img, i) => {
        const angle = gsap.utils.random(0, Math.PI * 2);
        const targetX = Math.cos(angle) * safeRadius;
        const targetY = Math.sin(angle) * safeRadius;
        
        const imageStartTime = startDelay + (i / (images.length - 1 || 1)) * spreadDuration;

        tl.fromTo(img,
          {
            scale: 0,
            opacity: 0,
            x: 0,
            y: 0,
            rotation: 0,
          },
          {
            x: targetX,
            y: targetY,
            scale: 6,
            duration: imageAnimDuration,
            keyframes: {
              "0%": { opacity: 0, scale: 0 },
              "15%": { opacity: 1 },
              "80%": { opacity: 1 },
              "100%": { opacity: 0 },
            },
          },
          imageStartTime
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="services h-screen w-full overflow-hidden relative text-white"
    >
      <h2 className="service-title mix-blend-plus-lighter" >
        Nişandan düğüne, kınadan sünnete... <br /> Siz hayal edin, biz kusursuz bir gerçeğe dönüştürelim.
      </h2>

      <svg className="abs-center w-full max-w-4xl z-10" viewBox="0 -60 600 450">
        <VennSchema id="path1" d={path1} dotId="dot1" />
        <VennSchema id="path2" d={path2} dotId="dot2" />
        <VennSchema id="path3" d={path3} dotId="dot3" />
      </svg>

      {serviceImages.map(({ imgPath }, index) => (
        <div
          key={index}
          className="floating-image"
          style={{
            transform: "translate(-50%, -50%) scale(0)",
          }}
        >
          <Image
            src={imgPath}
            fill
            alt={`Service img ${index}`}
            className="object-cover"
            priority={index < 3}
          />
        </div>
      ))}
    </section>
  );
};

export default Services;