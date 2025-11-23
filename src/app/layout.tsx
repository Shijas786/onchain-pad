import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import FarcasterProvider from "@/components/FarcasterProvider";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onchain Notes",
  description: "Leave a short note on Base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers cookies={cookies}>
          <FarcasterProvider>
            {children}
          </FarcasterProvider>
        </Providers>
      </body>
    </html>
  );
}
