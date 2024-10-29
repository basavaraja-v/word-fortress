import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Word Fortress - An Exciting Word Guessing Game",
    template: "%s | Word Fortress"
  },
  description: "Challenge yourself with Word Fortress, a thrilling word guessing game where you build and defend your fortress while solving word puzzles!",
  keywords: ["word game", "puzzle game", "educational game", "vocabulary builder", "react game"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name or Company",
  publisher: "Your Name or Company",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.wordfortress.heyidb.com",
    title: "Word Fortress - An Exciting Word Guessing Game",
    description: "Challenge yourself with Word Fortress, a thrilling word guessing game where you build and defend your fortress while solving word puzzles!",
    siteName: "Word Fortress",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Fortress - An Exciting Word Guessing Game",
    description: "Challenge yourself with Word Fortress, a thrilling word guessing game where you build and defend your fortress while solving word puzzles!",
    creator: "@yourtwitter",
  },
  robots: {
    index: true,
    follow: true,
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
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}