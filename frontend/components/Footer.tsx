import React from 'react';
import Link from 'next/link';
import {  Twitter,  Github, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black mt-10 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Policy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-blue-400">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              
              <Link
                href="https://x.com/tushar1878926"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://github.com/tushar-agarwal7"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Github className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/tusharagarwal73/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p>Made By Tushar Agarwal</p>
          <p>&copy; 2024 IPL Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
