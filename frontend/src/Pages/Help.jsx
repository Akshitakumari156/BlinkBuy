import React, { useEffect, useRef, useState } from "react";
import {
  FaLifeRing,
  FaUserCheck,
  FaAd,
  FaComments,
  FaShieldAlt,
  FaQuestionCircle,
  FaChevronDown,
} from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "What is 😉Buy?",
    answer: "😉Buy is a local online marketplace where users can buy and sell products within their community quickly and safely.",
  },
  {
    question: "Is 😉Buy free to use?",
    answer: "Yes, 😉Buy is completely free for browsing and posting ads. There are no hidden charges for basic usage.",
  },
  {
    question: "How do I post an ad?",
    answer: "Log in to your account, click on 'Post Ad', fill in the product details, add images, and publish your listing.",
  },
  {
    question: "How can I contact a seller or buyer?",
    answer: "You can use 😉Buy's built-in chat system to communicate directly with buyers or sellers securely.",
  },
  {
    question: "Is 😉Buy safe?",
    answer: "😉Buy promotes safe transactions by encouraging local meetups, transparent listings, and secure communication.",
  },
];

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionsRef = useRef([]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    // Reveal sections as user scrolls
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="bg-[#0B0B0F] text-gray-300 min-h-screen px-6 md:px-16 pb-24 pt-12 space-y-24 md:space-y-32 overflow-x-hidden">

      {/* HERO */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)}
        className="max-w-5xl mx-auto text-center space-y-6"
      >
        <div className="flex justify-center text-indigo-500 text-6xl md:text-7xl">
          <FaLifeRing className="animate-spin-slow" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          😉Buy <span className="text-indigo-500">Help Center</span>
        </h1>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
          Find answers, learn how 😉Buy works, and get tips to buy and sell
          safely in your local community.
        </p>
      </section>

      {/* GETTING STARTED */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="flex justify-center md:justify-start">
            <FaUserCheck className="text-indigo-500 text-7xl md:text-8xl" />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-white">Getting Started</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Create an account, complete your profile, and start browsing or
            posting ads. 😉Buy is designed to be simple and beginner-friendly.
          </p>
        </div>
      </section>

      {/* POSTING ADS - Swapped for Desktop */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="space-y-4 text-center md:text-left order-2 md:order-1">
          <h2 className="text-3xl font-semibold text-white">Posting an Ad</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Use clear titles, honest descriptions, and fair pricing. Quality
            ads attract more genuine buyers and close deals faster.
          </p>
        </div>
        <div className="flex justify-center md:justify-end order-1 md:order-2">
            <FaAd className="text-indigo-500 text-7xl md:text-8xl" />
        </div>
      </section>

      {/* CHAT */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="flex justify-center md:justify-start">
            <FaComments className="text-indigo-500 text-7xl md:text-8xl" />
        </div>
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-3xl font-semibold text-white">Chat & Communication</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Communicate securely using 😉Buy chat. Avoid sharing personal
            information and always stay respectful.
          </p>
        </div>
      </section>

      {/* SAFETY - Swapped for Desktop */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"
      >
        <div className="space-y-4 text-center md:text-left order-2 md:order-1">
          <h2 className="text-3xl font-semibold text-white">Safety Tips</h2>
          <p className="text-gray-400 leading-relaxed text-lg">
            Meet in public places, inspect items before payment, and trust your
            instincts when making transactions.
          </p>
        </div>
        <div className="flex justify-center md:justify-end order-1 md:order-2">
            <FaShieldAlt className="text-indigo-500 text-7xl md:text-8xl" />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section 
        ref={(el) => (sectionsRef.current[5] = el)}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="text-center space-y-4">
          <FaQuestionCircle className="text-indigo-500 text-6xl mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500">Everything you need to know about using the platform.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-800 rounded-2xl overflow-hidden bg-[#12121A] transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full flex items-center justify-between px-6 py-5 transition-colors ${
                  activeIndex === index ? "bg-[#181824]" : "hover:bg-[#181824]"
                }`}
              >
                <span className="text-left text-white font-semibold md:text-lg">
                  {faq.question}
                </span>
                <FaChevronDown
                  className={`text-indigo-500 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* 🟢 FAQ Answer - Smooth entrance */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800/50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Help;