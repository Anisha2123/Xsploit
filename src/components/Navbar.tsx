import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [typedLogo, setTypedLogo] = useState("");
  const logo = "XSPLOIT";
  const indexRef = useRef(0);

  // Typing effect for logo
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedLogo((prev) => prev + logo[indexRef.current]);
      indexRef.current++;
      if (indexRef.current >= logo.length) clearInterval(interval);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = ["Home", "Courses", "Labs", "About", "Pricing", "Contact"];

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#080b0e] border-b border-[#00ff9d33] shadow-[0_0_15px_#00ff9d11]">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="text-[#00ff9d] font-mono font-bold text-2xl tracking-widest relative overflow-hidden">
          <span className="relative inline-block glitch">{typedLogo}</span>
        </div>

        {/* Desktop / Laptop Links */}
        <ul className="menu md:flex gap-8 text-[#00ff9d] font-mono font-semibold items-center">

          {navLinks.map((link, idx) => (
            <li
              key={idx}
              className="relative cursor-pointer group"
            >
              <span className="hover:text-white transition-colors duration-200">
                {link}
              </span>
              {/* Animated underline */}
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#00ff9d] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger */}
        <div
          className="md:hidden text-[#00ff9d] text-2xl cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#0a0f14] border-t border-[#00ff9d33] shadow-[0_0_15px_#00ff9d11] transition-all duration-300 ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-4 text-[#00ff9d] font-mono font-semibold">
          {navLinks.map((link, idx) => (
            <li
              key={idx}
              className="hover:text-white transition-colors duration-200 cursor-pointer"
              onClick={toggleMenu}
            >
              {link}
            </li>
          ))}
        </ul>
      </div>

      {/* Glitch CSS */}
      <style>
        {`
        .glitch::before,
        .glitch::after {
          content: '${typedLogo}';
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
          clip: rect(0, 9999px, 0, 0);
        }
        .glitch::before {
          animation: glitchTop 1s infinite linear alternate-reverse;
          color: #ff00ff;
        }
        .glitch::after {
          animation: glitchBottom 1s infinite linear alternate-reverse;
          color: #00ffff;
        }
        @keyframes glitchTop {
          0% { clip: rect(0, 9999px, 5px, 0); transform: translate(-2px, -2px); }
          50% { clip: rect(2px, 9999px, 8px, 0); transform: translate(2px, 2px); }
          100% { clip: rect(1px, 9999px, 6px, 0); transform: translate(-2px, 1px); }
        }
        @keyframes glitchBottom {
          0% { clip: rect(5px, 9999px, 10px, 0); transform: translate(1px, 2px); }
          50% { clip: rect(6px, 9999px, 9px, 0); transform: translate(-1px, -1px); }
          100% { clip: rect(4px, 9999px, 8px, 0); transform: translate(2px, -2px); }
        }
      `}
      </style>
    </nav>
  );
};

export default Navbar;
