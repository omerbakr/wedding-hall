import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/providers/SmoothScroll";

import { Corinthia } from "next/font/google";

const corinthia = Corinthia({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-corinthia",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Şelale Düğün Salonu",
  description: "Şelale Düğün Salonu; profesyonel organizasyon ekibi ve kusursuz hizmet anlayışıyla düğün, nişan, kına ve özel davetlerinize ev sahipliği yapar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${corinthia.variable} antialiased`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
