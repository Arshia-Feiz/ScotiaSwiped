import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ScotiaSwipe - Subscription Management",
  description: "Manage your subscriptions the fun way with ScotiaSwipe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}