"use client";

import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { UserDropdown } from "./UserDropdown";
import Image from "next/image";
import { useTheme } from "@/app/context/ThemeContext";


type User = {
  name: string;
  email: string;
  image?: string; 
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); 

  const { theme } = useTheme(); // Use theme context
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header 
    className="shadow-md sticky top-0 z-50"
    style={{ 
      backgroundColor: theme ? theme.primaryColor : 'black',
      color: theme ? theme.textColor : 'white'
    }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <Image
              src={theme ? theme.logo : "/logo.png"}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold">
            {theme ? theme.name : 'IPL'}
          </h1>
        </Link>

          {/* Primary Actions */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/bag"
              aria-label="Shopping Bag"
              className="p-2 text-white rounded-full"
            >
              <ShoppingBag size={20} />
            </Link>
            <div>
            {user ? (
                <UserDropdown
                  email={user.email}
                  name={user.name}
                  userImage={user.image || "/avatar-placeholder.png"}
                />
              ) : (
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
)}
             
            </div>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={toggleMenu}
            aria-label="Menu"
            className="md:hidden p-2  rounded-full"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden  shadow-lg absolute top-full inset-x-0"
        style={{ 
          backgroundColor: theme ? theme.primaryColor : 'black',
          color: theme ? theme.textColor : 'white'
        }}
        >
          <div className="flex flex-col items-start gap-4 p-4">
            <button
              aria-label="Search"
              className="flex items-center gap-2 text-gray-700 p-2 rounded hover:bg-gray-100 w-full"
            >
              <Search size={20} />
              <span>Search</span>
            </button>
            <button
              aria-label="Favorites"
              className="flex items-center gap-2 text-gray-700 p-2 rounded hover:bg-gray-100 w-full"
            >
              <Heart size={20} />
              <span>Favorites</span>
            </button>
            <Link
              href="/bag"
              aria-label="Shopping Bag"
              className="flex items-center gap-2 text-gray-700 p-2 rounded hover:bg-gray-100 w-full"
            >
              <ShoppingBag size={20} />
              <span>Bag</span>
            </Link>
            <div>
              {user ? (
             <UserDropdown
             email={user.email}
             name={user.name}
             userImage={user.image || "https://ui-avatars.com/api/?name=User&background=random"}
           />
           
            
              ) : (
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
