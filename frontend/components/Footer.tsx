import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black mt-10 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Shipping</a></li>
              <li><a href="#" className="hover:text-blue-400">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Policy</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <Facebook className="h-6 w-6 cursor-pointer hover:text-blue-400" />
              <Twitter className="h-6 w-6 cursor-pointer hover:text-blue-400" />
              <Instagram className="h-6 w-6 cursor-pointer hover:text-blue-400" />
              <Youtube className="h-6 w-6 cursor-pointer hover:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>&copy; 2024 IPL Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}