import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import {SessionProvider} from "next-auth/react";

const inter = Inter({subsets: ["latin"]})



export const metadata: Metadata = {
  title: "PartyChance - Vendez vos biens autrement",
  description: "Créez une campagne, vendez par tickets, tirez au sort un gagnant sur PartiChance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <meta charSet={"UTF-8"}/>
        <title>PartyChance - Vendez vos biens autrement</title>
        <meta name="description"
              content="Créez une campagne, vendez par tickets, tirez au sort un gagnant sur PartiChance"/>
        <meta name="author" content="PartiChance"/>
    </head>
    <body
        className={`${inter.className} antialiased`}
    >
    <Toaster closeButton position={"bottom-right"} duration={3000} richColors />
    <SessionProvider>
        {children}
    </SessionProvider>
    </body>
    </html>
  );
}