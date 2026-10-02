import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ConditionalFooter from "@/components/ConditionalFooter";
import { ThemeProvider } from "@/components/ThemeProvider";

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
      suppressHydrationWarning
      className={`${poppins.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </main>
          <ConditionalFooter></ConditionalFooter>
        </ThemeProvider>
      </body>
    </html>
  );
}