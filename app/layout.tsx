import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gulf App by Co-pilot",
  description: "Task management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
