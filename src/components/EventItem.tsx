"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Event } from "@/types";

interface EventItemProps extends Omit<Event, "starts_at" | "ends_at"> {
  isActive?: boolean;
}

const EventItem = ({
  couple_name,
  date,
  organization,
  slug,
  isActive = false,
}: EventItemProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const orgRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      gsap.set(bgRef.current, { scaleY: 0, transformOrigin: "50% 50%" });
    },
    { scope: linkRef }
  );

  const handleMouseEnter = () => {
    gsap.to(linkRef.current, {
      color: "white",
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(bgRef.current, {
      scaleY: 1,
      duration: 0.5,
      ease: "power3.out",
      overwrite: "auto",
    });
    gsap.to(orgRef.current, {
      backgroundColor: "white",
      color: "var(--color-primary)",
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(linkRef.current, {
      color: "inherit",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
    gsap.to(bgRef.current, {
      scaleY: 0,
      duration: 0.45,
      ease: "power3.inOut",
      overwrite: "auto",
    });
    gsap.to(orgRef.current, {
      backgroundColor: "var(--color-primary)",
      color: "white",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <Link
      ref={linkRef}
      href={`/${slug}`}
      className="relative w-full z-0 grid grid-cols-2 md:grid-cols-3 items-center p-1 h-27 border-b cursor-pointer sm:p-2 overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        ref={bgRef}
        className="absolute inset-0 w-full h-full bg-primary -z-10 scale-y-0 origin-center will-change-transform"
      />

      <div className="flex items-center justify-between gap-4 md:gap-10">
        <p className="sm:font-semibold sm:text-lg relative">{couple_name}</p>
        {isActive && (
          <div className="flex items-center gap-1 animate-pulse text-xs sm:text-sm font-medium text-primary bg-white/90 px-2 py-0.5 rounded-full z-10">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>Canlı</span>
          </div>
        )}
      </div>

      <p className="text-end sm:text-center tabular-nums relative">{date}</p>

      <span
        ref={orgRef}
        className="w-fit px-3 py-1 sm:ml-1 rounded-sm font-semibold border border-primary bg-primary text-white sm:justify-self-end relative"
      >
        {organization}
      </span>
    </Link>
  );
};

export default EventItem;
