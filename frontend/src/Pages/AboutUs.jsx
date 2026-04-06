import React, { useEffect, useRef } from "react";
import {
  FaStore,
  FaUsers,
  FaShieldAlt,
  FaHandshake,
  FaMobileAlt,
  FaBolt,
  FaHeart,
} from "react-icons/fa";
import gsap from "gsap";

const AboutUs = () => {
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
    <div className="bg-[#0B0B0F] text-gray-300 min-h-screen px-6 md:px-16 pb-24 pt-12 space-y-32">

      {/* HERO */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="max-w-5xl mx-auto text-center space-y-6"
      >
        <div className="flex justify-center text-indigo-500 text-6xl">
          <FaStore />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white">
          About <span className="text-indigo-500">SmartX</span>
        </h1>
        <p className="text-lg text-gray-400 leading-relaxed">
          SmartX is a local online marketplace where people can buy and sell
          products within their own communities — quickly, safely, and without
          complications.
        </p>
      </section>

      {/* PURPOSE */}
      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="text-indigo-500 text-7xl mx-auto md:mx-0">
          <FaUsers />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Our Purpose
          </h2>
          <p className="text-gray-400 leading-relaxed">
            We created SmartX to make local buying and selling effortless.
            Instead of complicated platforms, we focus on nearby connections
            that save time, reduce costs, and strengthen communities.
          </p>
        </div>
      </section>

      {/* SAFETY */}
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse"
      >
        <div className="text-indigo-500 text-7xl mx-auto md:mx-0">
          <FaShieldAlt />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Safe Local Connections
          </h2>
          <p className="text-gray-400 leading-relaxed">
            SmartX encourages safe interactions by promoting clear listings,
            direct communication, and local meetups. We help users make informed
            decisions and connect with confidence.
          </p>
        </div>
      </section>

      {/* TRUST */}
      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="text-indigo-500 text-7xl mx-auto md:mx-0">
          <FaHandshake />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Built on Trust
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Trust is the foundation of SmartX. We design our platform to be
            transparent, honest, and reliable — so users feel comfortable every
            time they buy or sell.
          </p>
        </div>
      </section>

      {/* SIMPLICITY */}
      <section
        ref={(el) => (sectionsRef.current[4] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse"
      >
        <div className="text-indigo-500 text-7xl mx-auto md:mx-0">
          <FaMobileAlt />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Simple by Design
          </h2>
          <p className="text-gray-400 leading-relaxed">
            From posting an ad to chatting with buyers, SmartX keeps everything
            intuitive and distraction-free. No clutter, no confusion — just a
            smooth experience.
          </p>
        </div>
      </section>

      {/* SPEED */}
      <section
        ref={(el) => (sectionsRef.current[5] = el)}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="text-indigo-500 text-7xl mx-auto md:mx-0">
          <FaBolt />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold text-white">
            Fast & Efficient
          </h2>
          <p className="text-gray-400 leading-relaxed">
            SmartX is optimized for speed — fast browsing, quick messaging, and
            instant discovery of nearby products so deals happen faster.
          </p>
        </div>
      </section>

      {/* COMMUNITY */}
      <section
        ref={(el) => (sectionsRef.current[6] = el)}
        className="max-w-5xl mx-auto text-center space-y-6"
      >
        <div className="flex justify-center text-indigo-500 text-6xl">
          <FaHeart />
        </div>
        <h2 className="text-4xl font-semibold text-white">
          Powered by Community
        </h2>
        <p className="text-gray-400 leading-relaxed text-lg">
          SmartX is more than a marketplace — it’s a community-driven platform
          built to empower local buyers and sellers with trust, simplicity, and
          confidence.
        </p>
      </section>

    </div>
  );
};

export default AboutUs;
