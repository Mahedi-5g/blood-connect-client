import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "BloodConnect",
  description: "Donate blood to save human lives.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground">
        <Navbar />
        <main>{children}</main>
        <Footer></Footer>
      </body>
    </html>
  );
}