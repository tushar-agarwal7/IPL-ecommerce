'use client'
import { Heart, Menu, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { UserDropdown } from "./UserDropdown";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = true; // Replace with your authentication logic

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-bold text-white">
              IPL
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
                <UserDropdown email="user@example.com" name="John Doe" userImage="/user-avatar.png" />
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
            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full inset-x-0">
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
                <UserDropdown email="user@example.com" name="John Doe" userImage="/user-avatar.png" />
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
