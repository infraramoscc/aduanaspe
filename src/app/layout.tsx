import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { GoogleAnalytics } from "@/components/tracking/GoogleAnalytics";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
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
        className={`${outfit.variable} antialiased font-sans`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
