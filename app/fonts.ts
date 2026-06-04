import localFont from "next/font/local";
import { Geist, Geist_Mono, Arvo, Inter, Manrope } from "next/font/google";

export const monaco = localFont({
  src: "./fonts/Monaco.ttf",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  variable: "--font-monaco",
});

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const arvo = Arvo({
  variable: "--font-arvo",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const fontVariables = [
  geistSans.variable,
  geistMono.variable,
  monaco.variable,
  arvo.variable,
  inter.variable,
  manrope.variable,
].join(" ");
