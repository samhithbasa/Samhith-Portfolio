import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Basa Samhith · Full-Stack & Android Developer",
  description: "Portfolio of Basa Samhith — MERN Stack Developer, Android Engineer, AWS Certified. Final-year CS student at SRM University AP.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
