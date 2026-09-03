import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REP4 Connect",
  description: "Year-round REP4 student engagement platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}