import type { Metadata } from "next";
import "./globals.scss";
import { fontVariables } from "@/app/fonts";
import CursorProvider from "@/app/CursorProvider";
import React from "react";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://a-nikhil.vercel.app"),
  title: "Nikhil Anand | Full-Stack Software Developer",
  description:
    "Explore Nikhil Anand's projects and software engineering experience with Java, Spring Boot, React, and TypeScript. UMass Amherst computer science graduate.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Nikhil Anand — Portfolio",
    title: "Nikhil Anand | Full-Stack Software Developer",
    description:
      "Full-stack engineering, thoughtful interfaces, and production experience. Explore my projects, experience, and education.",
  },
  twitter: {
    card: "summary",
    title: "Nikhil Anand | Full-Stack Software Developer",
    description: "Explore my full-stack projects, software engineering experience, and education.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${fontVariables}`}>
      <body className={`antialiased dark ${fontVariables}`}>
        <Analytics />
        <CursorProvider>{children}</CursorProvider>
      </body>
    </html>
  );
}
