"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";
import { Star } from "lucide-react";
import clsx from "clsx";

import { testimonials } from "@/constants";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(".testimonial-card",
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: container.current,
            start: "top 75%",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="yorumlar" ref={container} className="testimonials relative">
      <Image
        src="/images/flower-tr-corner.webp"
        alt="flower illustration"
        width={700}
        height={700}
        className="flower absolute"
        aria-hidden="true"
      />

      <h3 className="sub-title">Yorumlarınız</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-5 z-10">
        {testimonials.map(({ name, review }, i) => (
          <TestimonialCard
            key={i}
            className={clsx("testimonial-card", i > 2 && "hidden md:flex")}
          >
            <h4 className="font-semibold mb-3.5">{name}</h4>
            <p className="font-light text-[15px]">{review}</p>

            <div
              className="flex gap-0.5 mt-auto pt-4"
              role="img"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill="currentColor"
                  className="text-primary"
                  aria-hidden="true"
                />
              ))}
            </div>
          </TestimonialCard>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
