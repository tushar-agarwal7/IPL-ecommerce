'use client'
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/Products";
import Signup from "@/components/Signup";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster"
import { useTheme } from "./context/ThemeContext"; // Import theme context

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme(); // Use theme context
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        setUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/signup");
    } else {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <Signup />;
  }

  return (
    <div className="min-h-screen font-serif ">
    <Navbar />
    <main 
      className="bg-black"
      style={{
        background: theme 
          ? `linear-gradient(to bottom right, ${theme.gradient.from}, ${theme.gradient.to})`
          : 'black'
      }}
    >
      <div className="text-center py-4">
        <h2 
          className="text-2xl font-bold🎉🎊 font-mono"
          style={{ color: theme?.textColor }}
        >
          Welcome to the {theme?.name || 'IPL'} Fan Store! 🎉🎊
        </h2>
      </div>
      <Toaster />
      <Hero />
      <ProductSection />
    </main>
    <Footer />
  </div>
  );
}