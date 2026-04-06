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

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 px-6 md:px-16 py-16">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-4">

        {/* BRAND */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white text-2xl font-bold">
            <FaStore className="text-indigo-500" />
            SmartX
          </div>
          <p className="text-sm leading-relaxed">
            SmartX is a local online marketplace where users can buy and sell
            products nearby — fast, safe, and simple.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer">Home</li>
            <li className="hover:text-indigo-400 cursor-pointer">Browse Ads</li>
            <li className="hover:text-indigo-400 cursor-pointer">Post an Ad</li>
            <li className="hover:text-indigo-400 cursor-pointer">About Us</li>
            <li className="hover:text-indigo-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Support</h4>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-indigo-400 cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-indigo-400 cursor-pointer">
              Safety Tips
            </li>
            <li className="hover:text-indigo-400 cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-indigo-400 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold text-lg">Contact</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-indigo-500" />
              support@smartx.com
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-indigo-500" />
              +91 90000 00000
            </p>
          </div>

          {/* SOCIAL */}
          <div className="flex gap-4 pt-4 text-lg">
            <FaFacebookF className="hover:text-indigo-400 cursor-pointer" />
            <FaTwitter className="hover:text-indigo-400 cursor-pointer" />
            <FaInstagram className="hover:text-indigo-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-indigo-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm">
        © {new Date().getFullYear()} SmartX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
