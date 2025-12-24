export type HeroImage = {
  imgPath: string;
};

export type NavLink = {
  name: string;
  href: string;
};

export const heroImages: readonly HeroImage[] = [
  { imgPath: "/images/nikah.webp" },
  { imgPath: "/images/selale.webp" },
  { imgPath: "/images/sahne2.webp" },
  { imgPath: "/images/agac2.webp" },
  { imgPath: "/images/masa.webp" },
  { imgPath: "/images/cift.webp" },
  { imgPath: "/images/selale2.webp" },
  { imgPath: "/images/agac.webp" },
] as const;

export const navLinks: readonly NavLink[] = [
  { name: "Hizmetlerimiz", href: "#hizmetlerimiz" },
  { name: "İletişime Geçin", href: "#iletişim" },
  { name: "Yorumlarınız", href: "#yorumlar" },
  { name: "Ulaşım", href: "#ulaşım" },
] as const;

export default heroImages;
