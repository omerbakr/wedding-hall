"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import { navLinks, socialMediaLinks } from "@/constants";
import MenuPanel from "./MenuPanel";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });
  
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
      "-=0.1"
    );
    tl.current.fromTo(
      ".menu-social",
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
      },
      "<"
    );
  }, { scope: container });

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
      <nav className="navbar absolute z-50">
        <ul className="flex items-center justify-between w-full">
          {navLinks.map(({ name, href }) => (
            <li key={name}>
              <Link href={href}>
                <p className="text-white">({name})</p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sm:hidden absolute z-50 top-0 right-0">
        <MenuPanel
          isMenuActive={isMenuActive}
          setIsMenuActive={setIsMenuActive}
        />
      </div>

      <div className="panel fixed top-0 right-0 h-screen w-screen bg-white z-40 px-20">
        <div className="flex flex-col justify-center gap-5 h-full">
          <h1>Menu</h1>
          <div className="w-full h-px bg-primary" />

          <ul className="space-y-2 text-4xl">
            {navLinks.map(({name, href}) => (
              <li
                key={name}
                className="nav-link"
              >
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>

          <div className="w-full h-px bg-primary" />

          <ul className="flex gap-2 mt-5 text-black">
            {socialMediaLinks.map(({name, href}) => (
              <li key={name} className="menu-social">
                <Link href={href}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;