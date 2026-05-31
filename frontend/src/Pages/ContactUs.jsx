import React, { useEffect, useRef } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHeadset,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa";
import gsap from "gsap";

const ContactUs = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    /* Adjusted padding and vertical spacing for mobile vs desktop */
    <div className="bg-[#0B0B0F] text-gray-300 min-h-screen px-4 md:px-16 pb-24 pt-12 space-y-16 md:space-y-28 overflow-x-hidden">

      {/* HERO */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="max-w-5xl mx-auto text-center space-y-6"
      >
        <div className="flex justify-center text-indigo-500 text-5xl md:text-6xl">
          <FaHeadset />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Contact <span className="text-indigo-500">😉Buy</span>
        </h1>
        <p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
          Have questions, feedback, or need help? We’re here to support you and
          make your 😉Buy experience smooth and reliable.
        </p>
      </section>

      {/* CONTACT OPTIONS - Changed to 1 column on mobile, 3 on desktop */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
      >
        <div className="bg-[#12121A] rounded-2xl p-6 md:p-8 text-center space-y-4 hover:scale-[1.02] transition shadow-lg">
          <FaEnvelope className="text-indigo-500 text-4xl md:text-5xl mx-auto" />
          <h3 className="text-xl font-semibold text-white">Email Us</h3>
          <p className="text-gray-400 text-sm md:text-base">
            Reach out anytime for support or general inquiries.
          </p>
          <p className="text-indigo-400 font-medium break-all">
            support@blinkbuy.com
          </p>
        </div>

        <div className="bg-[#12121A] rounded-2xl p-6 md:p-8 text-center space-y-4 hover:scale-[1.02] transition shadow-lg">
          <FaPhoneAlt className="text-indigo-500 text-4xl md:text-5xl mx-auto" />
          <h3 className="text-xl font-semibold text-white">Call Us</h3>
          <p className="text-gray-400 text-sm md:text-base">
            Talk directly with our support team during working hours.
          </p>
          <p className="text-indigo-400 font-medium">
            +91 90000 00000
          </p>
        </div>

        <div className="bg-[#12121A] rounded-2xl p-6 md:p-8 text-center space-y-4 hover:scale-[1.02] transition shadow-lg">
          <FaMapMarkerAlt className="text-indigo-500 text-4xl md:text-5xl mx-auto" />
          <h3 className="text-xl font-semibold text-white">Our Location</h3>
          <p className="text-gray-400 text-sm md:text-base">
            Serving users across cities and local communities.
          </p>
          <p className="text-indigo-400 font-medium">
            India
          </p>
        </div>
      </section>

      {/* CONTACT FORM - Adjusted padding for mobile */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-[#12121A] rounded-2xl p-6 md:p-10 space-y-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center">
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#0B0B0F] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-[#0B0B0F] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full bg-[#0B0B0F] border border-gray-700 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-indigo-500 resize-none transition-colors"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 md:py-3 rounded-xl transition-all"
            >
              <FaPaperPlane />
              Send Message
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};

export default ContactUs;