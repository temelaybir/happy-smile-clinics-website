import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import ClientLayout from "@/components/client-layout";
import StickySidebar from "@/components/ui/sticky-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Happy Smile Clinics - Your Smile, Your Style",
  description: "World-class dental treatments to achieve the smile of your dreams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body 
        className={`antialiased bg-black text-white ${inter.className}`}
      >
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
          <StickySidebar />
        </Providers>
      </body>
    </html>
  );
}
