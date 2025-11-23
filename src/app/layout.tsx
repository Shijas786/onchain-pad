import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import FarcasterProvider from "@/components/FarcasterProvider";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Onchain Pad",
  description: "Post notes on Base",
  openGraph: {
    title: "Onchain Pad",
    description: "Post simple onchain notes",
    images: ["https://onchain-note.vercel.app/og.png"],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://onchain-note.vercel.app/og.png",
    "fc:frame:button:1": "Open Onchain Pad",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://onchain-note.vercel.app",
  }
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
