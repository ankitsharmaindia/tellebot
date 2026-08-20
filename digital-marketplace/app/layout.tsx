import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Suspense } from "react";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "VENOM STORE — Digital Marketplace for Software, Tools & Leads",
  description:
    "Buy and sell software, tools, leads, digital assets, and services on a trust-first marketplace. Become a merchant and build your reputation.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0708",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased bg-black ">
        <TooltipProvider delayDuration={200}>
          <CartProvider>
            <div className="flex min-h-dvh flex-col">
              <Suspense fallback={null}>
                <SiteHeader />
              </Suspense>
              <main className=" border border-red-500 flex-1 pb-20 md:pb-0 max-w-screen-xl mx-auto bg-gradient-to-r from-black/10 via-red-900/50 to-black/10">
                {children}
              </main>
              <SiteFooter />
              <MobileTabBar />
            </div>
            <Toaster position="top-center" />
          </CartProvider>
        </TooltipProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
