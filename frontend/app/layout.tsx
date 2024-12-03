import { Metadata } from "next";
import { Montserrat } from "@next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ['latin'],  // Specify the subset
  weight: ['400', '700'],  // Choose font weights
  style: ['normal', 'italic'],  // Choose styles (optional)
  variable: "--font-montserrat",  // Custom CSS variable
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
