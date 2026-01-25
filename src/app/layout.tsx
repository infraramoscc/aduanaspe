import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/tracking/GoogleAnalytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aduanaspe.com"),
  title: {
    template: "%s | AduanasPE",
    default: "AduanasPE - Agenciamiento de Aduanas en Perú",
  },
  description:
    "Soluciones integrales en comercio exterior, agenciamiento de aduanas y logística internacional. Más de 15 años de experiencia en Perú.",
  keywords: [
    "agente de aduanas",
    "agenciamiento aduanero",
    "comercio exterior",
    "importación Perú",
    "exportación Perú",
    "logística internacional",
  ],
  authors: [{ name: "AduanasPE" }],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "AduanasPE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
