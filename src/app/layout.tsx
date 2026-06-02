import type { Metadata } from "next";
import  "./globals.css";

export const metadata: Metadata = {
  title: "Student Learning Dashboard",
  description: "A futuristic student learning dashboard for tracking progress, activity, and upcoming classes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
