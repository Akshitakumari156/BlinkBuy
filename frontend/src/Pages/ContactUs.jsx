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
    <div className="bg-[#0B0B0F] text-gray-300 min-h-screen px-6 md:px-16 pb-24 pt-12 space-y-28">

      {/* HERO */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="max-w-5xl mx-auto text-center space-y-6"
      >
        <div className="flex justify-center text-indigo-500 text-6xl">
          <FaHeadset />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Contact <span className="text-indigo-500">SmartX</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          Have questions, feedback, or need help? We’re here to support you and
          make your SmartX experience smooth and reliable.
        </p>
      </section>

      {/* CONTACT OPTIONS */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10"
      >
        <div className="bg-[#12121A] rounded-2xl p-8 text-center space-y-4 hover:scale-[1.02] transition">
          <FaEnvelope className="text-indigo-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold text-white">Email Us</h3>
          <p className="text-gray-400">
            Reach out anytime for support or general inquiries.
          </p>
          <p className="text-indigo-400 font-medium">
            support@smartx.com
          </p>
        </div>

        <div className="bg-[#12121A] rounded-2xl p-8 text-center space-y-4 hover:scale-[1.02] transition">
          <FaPhoneAlt className="text-indigo-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold text-white">Call Us</h3>
          <p className="text-gray-400">
            Talk directly with our support team during working hours.
          </p>
          <p className="text-indigo-400 font-medium">
            +91 90000 00000
          </p>
        </div>

        <div className="bg-[#12121A] rounded-2xl p-8 text-center space-y-4 hover:scale-[1.02] transition">
          <FaMapMarkerAlt className="text-indigo-500 text-5xl mx-auto" />
          <h3 className="text-xl font-semibold text-white">Our Location</h3>
          <p className="text-gray-400">
            Serving users across cities and local communities.
          </p>
          <p className="text-indigo-400 font-medium">
            India
          </p>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-[#12121A] rounded-2xl p-10 space-y-8">
          <h2 className="text-3xl font-semibold text-white text-center">
            Send Us a Message
          </h2>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-[#0B0B0F] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-[#0B0B0F] border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-gray-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full bg-[#0B0B0F] border border-gray-700 rounded-xl p-4 text-gray-200 focus:outline-none focus:border-indigo-500 resize-none"
            />

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition"
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
