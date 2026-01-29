import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fabio Vargas - Full-stack Software Developer",
  description: "I build reliable, production-ready web applications with a strong focus on clean architecture, scalable APIs, and maintainable front-end systems using modern JavaScript and TypeScript.",
  openGraph: {
    title: "Fabio Vargas - Full-stack Software Developer",
    description: "I build reliable, production-ready web applications with a strong focus on clean architecture, scalable APIs, and maintainable front-end systems.",
    url: "https://varscr.github.io",
    siteName: "Fabio Vargas Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
