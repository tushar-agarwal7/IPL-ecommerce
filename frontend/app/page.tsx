'use client'
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/Products";
import Signup from "@/components/Signup";
import { useRouter } from "next/navigation";
import { Toaster } from "@/components/ui/toaster"
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check user from localStorage when component mounts
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
      // Redirect to the signup page if the user is not logged in
      router.push("/signup");
    } else {
      // If the user is logged in, ensure they're on the home page
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <Signup />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="bg-black">
      <Toaster />
        <Hero />
        <ProductSection />
      </main>
      <Footer />
    </div>
  );
}