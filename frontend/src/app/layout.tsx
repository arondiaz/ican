import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  display: "swap",
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  title: "ServiciosYa!",
  description: "Encontrá el servicio que estás buscando",
  icons: {
    icon: "/android-chrome-192x192.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        //bg color
        className={`${archivo.variable} antialiased bg-slate-400`}
      >
        {children}
      </body>
    </html>
  );
}
