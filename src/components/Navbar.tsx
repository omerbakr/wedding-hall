"use client";

import { useState, useRef, useEffect } from "react";

import Link from "next/link";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { MenuIcon, X } from "lucide-react";

import { useLenis } from "lenis/react";

import { navLinks, socialMediaLinks } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const lenis = useLenis();

  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true });

      gsap.from(".navbar", {
        y: -10,
        opacity: 0,
        delay: 3,
      });

      gsap.to(".navbar, .ham", {
        color: "#d7b468",
        backgroundColor: "#fff",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "body",
          start: "top -95%",
          toggleActions: "play none none reverse",
        },
      });

      tl.current.fromTo(
        ".panel",
        { x: "100%" },
        { x: "0%", duration: 0.75, ease: "expo.inOut" }
      );

      tl.current.fromTo(
        ".nav-link",
        { x: 10, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.5,
        },
        "-=0.5"
      );

      tl.current.fromTo(
        ".menu-social",
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
        },
        "-=0.4"
      );
    },
    { scope: container }
  );

  useEffect(() => {
    if (isMenuActive) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [isMenuActive, lenis]);

  useEffect(() => {
    if (!tl.current) return;

    if (isMenuActive) {
      tl.current.play(0);
    } else {
      gsap.to(".panel", {
        x: "100%",
        duration: 0.6,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(".nav-link", { opacity: 0, x: 10 });
          gsap.set(".menu-social", { opacity: 0, y: 10 });
          tl.current?.pause(0);
        },
      });
    }
  }, [isMenuActive]);

  return (
    <div ref={container}>
      <nav className="navbar fixed z-50 text-white">
        <ul className="flex items-center justify-between w-full">
          {navLinks.map(({ name, href }) => (
            <li key={name}>
              {href.startsWith("#") ? (
                <a href={href}>({name})</a>
              ) : (
                <Link href={href}>({name})</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="fixed top-6 right-5 z-50 sm:hidden">
        <button
          onClick={() => setIsMenuActive(!isMenuActive)}
          className="ham rounded-sm p-1 text-white transition-colors"
          aria-label={isMenuActive ? "Close menu" : "Open menu"}
        >
          {isMenuActive ? (
            <X size={30} className="text-primary" />
          ) : (
            <MenuIcon size={32} />
          )}
        </button>
      </div>

      <div className="panel fixed top-0 right-0 z-40 h-dvh w-screen translate-x-full rounded-l-4xl border-l-20 border-primary bg-white px-20">
        <div className="flex h-full flex-col justify-center gap-5">
          <h1>Menu</h1>
          <div className="h-px w-full bg-primary" />

          <ul className="space-y-2 text-4xl">
            {navLinks.map(({ name, href }) => (
              <li key={name} className="nav-link">
                {href.startsWith("#") ? (
                  <a href={href} onClick={() => setIsMenuActive(false)}>
                    {name}
                  </a>
                ) : (
                  <Link href={href} onClick={() => setIsMenuActive(false)}>
                    {name}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="h-px w-full bg-primary" />

          <ul className="mt-5 flex gap-2 text-black">
            {socialMediaLinks.map(({ name, href }) => (
              <li key={name} className="menu-social">
                <Link href={href} target="_blank" rel="noopener noreferrer">
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
