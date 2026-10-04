import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyberShield AI | Fraud Investigation & Scam Defense Desk",
  description:
    "Forensic-grade scam, phishing, and cybercrime detection web application. Instant risk scoring, red flag analysis, family warning cards, and cybercrime complaint drafting for India.",
  keywords: ["scam detection", "cybercrime", "phishing", "1930 helpline", "fraud report", "India cyber shield"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..700;1,9..40,400..700&family=Fraunces:opsz,wght@9..144,600..800&family=IBM+Plex+Mono:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-paper text-ink font-sans antialiased min-h-screen selection:bg-accent-red selection:text-white">
        {children}
      </body>
    </html>
  );
}
