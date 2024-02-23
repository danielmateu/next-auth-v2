import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth - Plantilla",
  description: "Plantilla de Next Auth con autenticación de usuario",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
    </SessionProvider>
  );
}
