'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductSection from "@/components/Products";
import Signup from "@/components/Signup";
import { Toaster } from "@/components/ui/toaster"
import Confetti from 'react-confetti'
import { useTheme } from "./context/ThemeContext";

interface User {
  id: string;
  name: string;
  email: string;
  team: string;
}

interface Theme {
  name: string;
  gradient: {
    from: string;
    to: string;
  };
  textColor: string;
}

const LOADING_TRIVIA = [
  "Did you know? The IPL is the only cricket league where players get paid to dance at the opening ceremony. 💃🕺",
  "Who has hit the most sixes in IPL history? Bet you can't guess! 💥",
  "Which IPL team is known for their *'yellow army'*? (Hint: Their captain is known for his cool attitude!)",
  "Who was the first player to score a double century in an IPL match? 🎯",
  "What is the IPL's favorite snack? (It's *'Boundary'*) 🥨",
  "Which IPL team has the best mascot? 🦁 Or 🐅?",
  "Which player was nicknamed 'The Universe Boss' in the IPL? 🌎",
  "What's the fastest ball bowled in IPL history? It's faster than a speeding bullet! ⚡",
  "Which IPL team has the most fans on social media? 🦸‍♂️📱",
  "Who is known as the *'King of IPL'*? 👑 (He's from the Royal Challengers!)"
];

export default function Home() {
  const router = useRouter();
  const { theme, setTheme } = useTheme() as any
  
  const [user, setUser] = useState<User | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTrivia, setCurrentTrivia] = useState("");
  const [needsReload, setNeedsReload] = useState(false);

  useEffect(() => {
    const randomTrivia = LOADING_TRIVIA[Math.floor(Math.random() * LOADING_TRIVIA.length)];
    setCurrentTrivia(randomTrivia);

    const checkSignupActions = () => {
      const signupComplete = localStorage.getItem('signupComplete');
      if (signupComplete) {
        setShowConfetti(true);
        localStorage.removeItem('signupComplete');
      }

      const signupThemeData = localStorage.getItem('signupThemeData');
      if (signupThemeData) {
        try {
          const parsedData = JSON.parse(signupThemeData);
          
          if (parsedData.theme) {
            const currentTheme = localStorage.getItem('theme');
            const storedTheme = currentTheme ? JSON.parse(currentTheme) : null;
            
            if (!storedTheme || JSON.stringify(parsedData.theme) !== JSON.stringify(storedTheme)) {
              localStorage.setItem('theme', JSON.stringify(parsedData.theme));
              setTheme(parsedData.theme);
              setNeedsReload(true);
            }
          }

          localStorage.removeItem('signupThemeData');
        } catch (error) {
          console.error("Error processing signup theme data:", error);
        }
      }
    };

    const checkAuthentication = () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          setUser(null);
        }
      }
    };

    const loadingTimer = setTimeout(() => {
      checkSignupActions();
      checkAuthentication();
      setIsLoading(false);
      
      if (needsReload) {
        window.location.reload();
      }
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, [setTheme, needsReload]);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/signup");
      }
    }
  }, [user, router, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-pulse mb-4 text-xl font-bold">
            {needsReload ? "Updating your experience..." : "Loading your experience..."}
          </div>
          <div className="max-w-md mx-auto px-4 text-center animate-bounce">
            <p className="text-lg italic">"{currentTrivia}"</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to signup if no user
  if (!user) {
    return <Signup />;
  }

  return (
    <div className="min-h-screen font-serif relative">
      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={300}
          />
        </div>
      )}

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
            className="text-2xl font-bold font-mono animate-fade-in"
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