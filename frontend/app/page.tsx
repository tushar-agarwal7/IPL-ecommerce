import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/Products";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen ">
    <Navbar />
    
    <main className="bg-black">
      <Hero />
      <ProductSection/>

      {/* <Teams /> */}
    </main>
    <Footer />
  </div>
  );
}
