"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { transportRoutes } from "@/constants";
gsap.registerPlugin(ScrollTrigger);


const Transportation = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
      });

      tl.from(".map", {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power1.inOut",
      }).from(".bus", {
        opacity: 0,
        x: 15,
        stagger: 0.15,
        duration: 0.8,
        ease: "power1.inOut",
      }, "-=0.2");
    },
    { scope: container }
  );

  return (
    <section id="ulasim" ref={container}>
      <h4 className="sub-title">Ulaşım</h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-10 relative">
        <Image
          src="/images/flower-tl-corner.webp"
          alt="flower illustration"
          width={700}
          height={700}
          className="flower"
          aria-hidden="true"
        />

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17580.809884509952!2d27.255853649999995!3d38.43044255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b963acb1d8ae1b%3A0x88eb2b63380250b8!2zxZ5lbGFsZSBEw7zEn8O8biBTYWxvbnU!5e1!3m2!1str!2str!4v1766790749729!5m2!1str!2str"
          className="col-span-2 w-full h-full min-h-80 rounded-xl shadow-xl map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Şelale Düğün Salonu konumu"
        />

        <div className="flex flex-col gap-2 w-full">
          {transportRoutes.map(({ line, route, href }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="bus"
            >
              <div className="flex-center bg-primary p-8 m-2 w-14 h-14 rounded-lg">
                <span className="text-white text-xl font-extrabold">
                  {line}
                </span>
              </div>
              <p className="mr-5">{route}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Transportation;
