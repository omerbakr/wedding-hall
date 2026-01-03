import { Facebook, Instagram } from "lucide-react";

import { socialMediaLinks } from "@/constants";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="footer mt-20">
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-3 gap-5 pb-10">
        <div className="col-center">
          <span className="font-corinthia font-bold text-7xl">Şelale</span>

          <div className="flex gap-2">
            {socialMediaLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name} sayfamızı ziyaret edin`}
              >
                {name === "Instagram" ? <Instagram /> : <Facebook />}
              </a>
            ))}
          </div>
        </div>

        <address className="flex flex-col p-5 gap-1 not-italic">
          <span className="font-extrabold mb-3">Adresimiz:</span>

          <p>
            <strong>Salonumuz</strong>, Kemalpaşa, 7033. Sk. No:5, 35060
            Bornova/İzmir
          </p>

          <a
            href="tel:+905539571961"
            aria-label="Telefon numarasını ara"
            className="hover:underline"
          >
            Telefon: +90 553 957 19 61
          </a>

          <a
            href="tel:+905077676495"
            aria-label="İkinci telefon numarasını ara"
            className="hover:underline"
          >
            Telefon - 2: +90 507 767 64 95
          </a>
        </address>

        <div className="flex flex-col p-5 gap-3">
          <span className="font-extrabold">Hakkımızda:</span>
          <p>
            Şelale Düğün Salonu, İzmir Pınarbaşı’nda, doğayla iç içe, geniş bir
            alanda hizmet veren şık bir mekan. 100 ila 625 kişilik kapasitesiyle
            büyük davetler için uygun olan salon, zarif dekorasyonu ve modern
            ışık, ses sistemleriyle düğünler için mükemmel bir ortam sunuyor.
          </p>
        </div>
      </div>

      <div className="w-full h-px bg-white my-3" />

      <div className="col-center">
        <p>
          Web Tasarım:{" "}
          <a
            href="mailto:y.omerbakir@gmail.com"
            className="hover:underline"
            aria-label="E-posta gönder"
          >
            y.omerbakir@gmail.com
          </a>
        </p>
        <p>© Copyright {currentYear}. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
};

export default Footer;
