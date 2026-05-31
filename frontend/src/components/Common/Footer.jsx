import React from "react";
import {
  FaStore,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 px-6 py-12 md:py-16">
      <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

        {/* BRAND - Full width on smallest screens */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white text-2xl font-bold">
            <FaStore className="text-indigo-500" />
            😉Buy
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            😉Buy is a local online marketplace where users can buy and sell
            products nearby — fast, safe, and simple.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 transition-colors">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-indigo-400 transition-colors">
              <Link to="/">Browse Ads</Link>
            </li>
            <li className="hover:text-indigo-400 transition-colors">
              <Link to="/upload-product">Post an Ad</Link>
            </li>
            <li className="hover:text-indigo-400 transition-colors">
              <Link to="/about-us">About Us</Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 transition-colors">
              <Link to="/help">Help Center</Link>
            </li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Safety Tips</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Terms & Conditions</li>
            <li className="hover:text-indigo-400 cursor-pointer transition-colors">Privacy Policy</li>
          </ul>
        </div>

        {/* CONTACT & SOCIAL */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-3 break-all">
              <FaEnvelope className="text-indigo-500 shrink-0" />
              support@blinkbuy.com
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-500 shrink-0" />
              +91 90000 00000
            </p>
          </div>

          {/* SOCIAL - Centered on mobile, left on desktop */}
          <div className="flex gap-5 pt-4 text-xl">
            <FaFacebookF className="hover:text-indigo-400 cursor-pointer transition-transform hover:-translate-y-1" />
            <FaTwitter className="hover:text-indigo-400 cursor-pointer transition-transform hover:-translate-y-1" />
            <FaInstagram className="hover:text-indigo-400 cursor-pointer transition-transform hover:-translate-y-1" />
            <FaLinkedinIn className="hover:text-indigo-400 cursor-pointer transition-transform hover:-translate-y-1" />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
        <p>© {new Date().getFullYear()} 😉Buy. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
          <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;