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

export type Testimonial = {
  name: string;
  review: string;
}

export type TransportRoute = {
  line: number;
  route: string;
  href: string;
};

export const heroImages: readonly HeroImage[] = [
  { imgPath: "/images/nikah.webp" },
  { imgPath: "/images/selale.webp" },
  { imgPath: "/images/masa-3.webp" },
  { imgPath: "/images/agac2.webp" },
  { imgPath: "/images/masa.webp" },
  { imgPath: "/images/cift.webp" },
  { imgPath: "/images/selale2.webp" },
  { imgPath: "/images/agac.webp" },
] as const;

export const serviceImages: readonly ServiceImage[] = [
  { imgPath: "/images/cift-2.webp" },
  { imgPath: "/images/sahne.webp" },
  { imgPath: "/images/masa-2.webp" },
  { imgPath: "/images/kinatahti-2.webp" },
  { imgPath: "/images/masa.webp" },
  { imgPath: "/images/cift-4.webp" },
  { imgPath: "/images/kinatahti-3.webp" },
  { imgPath: "/images/nikah.webp" },
  { imgPath: "/images/foto-cekim.webp" },
  { imgPath: "/images/kinatahti-4.webp" },
] as const;

export const navLinks: readonly NavLink[] = [
  { name: "Hizmetlerimiz", href: "#hizmetlerimiz" },
  { name: "Yorumlarınız", href: "#yorumlar" },
  { name: "Ulaşım", href: "#ulasim" },
  { name: "Bizimle Paylaştıklarınız", href: "/share" },
] as const;

export const socialMediaLinks: readonly SocialLink[] = [
  { name: "Instagram", href: "https://www.instagram.com/selale.dugunsalonu/" },
  { name: "Facebook", href: "https://www.facebook.com/selaledugunizmir/?locale=tr_TR" },
] as const;

export const testimonials: readonly Testimonial[] = [
  { 
    name: "Ne**** Ul****",
    review: "Çınar ağaçlarının arasında, durmadan akan şelale sesinin eşliğinde, doğa ile iç içe bir atmosfere sahip. Yapaylıktan uzak, hoş ışıklandırmasıyla oldukça doğal bir düğün salonu.",
  },
  { 
    name: "Se**** Ya****",
    review: "Temmuz ayında düğünümüz oldu. Hiç bu kadar mükemmel bir hizmet beklemiyorduk. Özellikle Taha Bey’in, en az sağdıçlar kadar koşturması bizi hayrete düşürdü. İletişim, nezaket… Her şeyden çok memnun kaldık. Bundan sonraki düğünlerde sizi severek önereceğiz.",
  },
  { 
    name: "Ne**** Bi****",
    review: "Her şey çok güzeldi. En önemlisi çok eğlendik. En güzel günümüz mutlu geçti. İçerik olarak çerezler özellikle tazecikti. Ses sistemi kaliteliydi. Davetlilerden gelen tepkiler de olumluydu. Bizimle ilgilenen bahçe ekibine teşekkür ediyoruz.",
  },
  { 
    name: "Zi**** Ko****",
    review: "25.05.2025 tarihinde düğünümüzü yaptık. Her şey çok güzeldi, kesinlikle tavsiye ediyorum. Başta Taha Bey olmak üzere ilgi, alaka ve güler yüz düğün boyunca; öncesinde ve sonrasında da devam etti. Kısacası bir düğünde olması gereken her şey vardı. Ortamın ambiyansı güzeldi. Her şey için teşekkürler Şelale ekibi.",
  },
  { 
    name: "Mu**** Ay****",
    review: "08.05.2022 tarihinde düğünümüz burada oldu. Taha Bey ve değerli halası, düğün başından sonuna kadar bizim yanımızda oldular. Konuştuğumuz her şey eksiksiz bir şekilde yapılmıştı. Fotoğrafçıya, müzisyenlere ve çalışan garsonlara da bizimle detaylı ilgilendikleri için ayrıca çok teşekkür ediyoruz. Tereddüt etmeden düğününüz için tercih edebilirsiniz.",
  },
  { 
    name: "El**** Ba****",
    review: "O kadar güzel ilgilendiler ki bizimle, gerçekten gelen davetlilerimiz tarafından bize defalarca söylendi. Taha Bey’e çok teşekkür ederiz. Şüphesiz daha çok güvenebileceğiniz bir salon bulamazsınız. Ben burada nişanımı yapalı 1 sene oldu; yorum yapmayı unutmuşuz. Videomuzu izlerken tekrar övgüler alınca hemen koşup baktım, yorum yapmayı unuttuğumu fark ettim.",
  },
] as const;

export const transportRoutes: readonly TransportRoute[] = [
  {
    line: 67,
    route: "Evka 3 Metro - Pınarbaşı",
    href: "https://www.eshot.gov.tr/tr/TransportationTimetable/67/289",
  },
  {
    line: 267,
    route: "Bornova Metro - Pınarbaşı",
    href: "https://www.eshot.gov.tr/tr/TransportationTimetable/267/289",
  },
  {
    line: 560,
    route: "Halkapınar Metro - Pınarbaşı",
    href: "https://www.eshot.gov.tr/tr/TransportationTimetable/560/289",
  },
  {
    line: 60,
    route: "Kemer Akt. Merkezi - Pınarbaşı",
    href: "https://www.eshot.gov.tr/tr/TransportationTimetable/60/289",
  },
  {
    line: 358,
    route: "Bornova Metro - Pınarbaşı",
    href: "https://www.eshot.gov.tr/tr/TransportationTimetable/358/289",
  },
] as const;