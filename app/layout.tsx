import type { Metadata } from "next";
import { Oswald, Nunito_Sans } from "next/font/google";
import "./globals.css";
import SWRegister from "@/components/pwa/sw-register";

const primaryFont = Nunito_Sans({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
});

const secondaryFont = Oswald({
  variable: "--font-secondary",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fernanda Personal",
  description: "PWA para personal trainer e alunas (offline-first).",
  manifest: "/manifest.json",
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${primaryFont.variable} ${secondaryFont.variable} antialiased`}
      >
        <SWRegister />
        {children}
      </body>
    </html>
  );
}
