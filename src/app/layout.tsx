import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agilista",
  description: "Agilista - Your Agile Project Management Tool",
  icons: {
    icon: [
      {
        url: "/logo-agilista.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
    ],
    shortcut: ["/logo-agilista.ico"],
    apple: [
      {
        url: "/logo-agilista.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-agilista.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
