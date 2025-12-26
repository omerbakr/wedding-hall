export type HeroImage = {
  imgPath: string;
};

export type ServiceImage = {
  imgPath: string;
};

export type NavLink = {
  name: string;
  href: string;
};

export type SocialLink = {
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

export const serviceImages: readonly ServiceImage[] = [
  { imgPath: "/images/cift-2.webp" },
  { imgPath: "/images/kinatahti.webp" },
  { imgPath: "/images/sahne.webp" },
  { imgPath: "/images/masa-2.webp" },
  { imgPath: "/images/kinatahti-2.webp" },
  { imgPath: "/images/masa.webp" },
  { imgPath: "/images/cift-4.webp" },
  { imgPath: "/images/kinatahti-3.webp" },
  { imgPath: "/images/nikah.webp" },
  { imgPath: "/images/kinatahti-4.webp" },
] as const;

export const navLinks: readonly NavLink[] = [
  { name: "Hizmetlerimiz", href: "#hizmetlerimiz" },
  { name: "İletişime Geçin", href: "#iletisim" },
  { name: "Yorumlarınız", href: "#yorumlar" },
  { name: "Ulaşım", href: "#ulasim" },
] as const;

export const socialMediaLinks: readonly SocialLink[] = [
  { name: "Instagram", href: "https://www.instagram.com/selale.dugunsalonu/" },
  { name: "Facebook", href: "https://www.facebook.com/selaledugunizmir/?locale=tr_TR" },
] as const;

export default heroImages;