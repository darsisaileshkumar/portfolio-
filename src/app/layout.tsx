import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { PageTransition } from "@/components/ui/PageTransition";
import { ReducedMotionProvider } from "@/components/providers/ReducedMotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Portfolio — Video Editor & Motion Designer",
  description:
    "Award-winning video editing and motion design portfolio. Stories cut with intention.",
  keywords: [
    "video editor",
    "motion designer",
    "portfolio",
    "After Effects",
    "Premiere Pro",
    "DaVinci Resolve",
  ],
  openGraph: {
    title: "Portfolio — Video Editor & Motion Designer",
    description: "Stories, cut with intention.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <ReducedMotionProvider>
          <CustomCursor />
          <Navbar />
          <PageTransition>{children}</PageTransition>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
