import React, { useState, useEffect, useRef } from "react";
import { Shield, Cpu, Network, Globe, Smartphone, Brain, Bug } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import Particles from "react-tsparticles";


const Courses: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const [filter, setFilter] = useState("All");
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // Glitch animation
    gsap.to(titleRef.current, {
      textShadow: "0px 0px 10px #00ff9d, 0 0 25px #00ff9d",
      repeat: -1,
      duration: 0.3,
      yoyo: true,
    });
  }, []);

  const allCourses = [
    {
      title: "KALI LINUX",
      desc: "Master the most powerful OS for penetration testing and forensics tools.",
      icon: <Shield size={42} />,
      duration: "2 Months",
      level: "Beginner",
      oldPrice: "₹15,000",
      price: "₹9,999",
    },
    {
      title: "CERTIFIED ETHICAL HACKING",
      desc: "Learn modern cyber attack techniques & defense strategies.",
      icon: <Cpu size={42} />,
      duration: "3 Months",
      level: "Intermediate",
      oldPrice: "₹25,000",
      price: "₹9,999",
    },
    {
      title: "NETWORK PENETRATION TESTING",
      desc: "Attack and secure enterprise networks, routers & protocols.",
      icon: <Network size={42} />,
      duration: "2.5 Months",
      level: "Pro",
      oldPrice: "₹22,000",
      price: "₹9,999",
    },
    {
      title: "WEB APP PENETRATION TESTING",
      desc: "Test, exploit & fix vulnerabilities like SQLi, XSS & Auth bypass.",
      icon: <Globe size={42} />,
      duration: "2 Months",
      level: "Intermediate",
      oldPrice: "₹20,000",
      price: "₹9,999",
    },
    {
      title: "ANDROID HACKING",
      desc: "Analyze APKs, reverse engineer apps, exploit mobile security.",
      icon: <Smartphone size={42} />,
      duration: "2 Months",
      level: "Pro",
      oldPrice: "₹18,000",
      price: "₹9,999",
    },
    {
      title: "HACKING WITH AI",
      desc: "Use AI tools for exploit automation, phishing & malware analysis.",
      icon: <Brain size={42} />,
      duration: "1.5 Months",
      level: "Intermediate",
      oldPrice: "₹19,000",
      price: "₹9,999",
    },
    {
      title: "BUG BOUNTY HUNTING",
      desc: "Find real bugs on live platforms & earn rewards legally.",
      icon: <Bug size={42} />,
      duration: "2 Months",
      level: "Beginner",
      oldPrice: "₹17,000",
      price: "₹9,999",
    },
  ];

  const visibleCourses = showMore ? allCourses : allCourses.slice(0, 3);

  return (
    <section className="relative py-20 px-6 bg-[#0A0A0E] text-gray-200">

      {/* matrix background */}
      <div className="absolute inset-0 opacity-15 bg-[url('https://i.ibb.co/gR1Rz6Q/binary-rain.gif')] bg-cover bg-center"></div>

      <div className="relative z-10 text-center">
        <h2
  ref={titleRef}
  className="text-4xl sm:text-5xl font-bold mb-12 tracking-widest uppercase text-gray-200"
  style={{ fontFamily: "monospace" }}
>
  <span className="text-purple-400">[</span>
  Cyber Security Courses
  <span className="text-purple-400">]</span>
</h2>


       {/* Filter Tabs */}
<div className="flex gap-4 justify-center mb-8">
  {["All", "Beginner", "Intermediate", "Pro"].map((tab) => (
    <button
      key={tab}
      onClick={() => setFilter(tab)}
      className={`px-4 py-2 rounded-md border border-[#00ff9d] transition-all duration-300 tracking-wide font-mono
        ${
          filter === tab
            ? "bg-[#00ff9d] text-black shadow-[0_0_12px_#00ff9d]"
            : "text-[#00ff9d] hover:text-black hover:bg-[#00ff9d55] hover:shadow-[0_0_8px_#00ff9d]"
        }`}
    >
      {tab}
    </button>
  ))}
</div>



        {/* Cards */}
{/* Cards */}
<div className="cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  <AnimatePresence>
    {visibleCourses
      .filter((c) => filter === "All" || c.level === filter)
      .map((course, i) => (
        <motion.div
          key={course.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="w-300 bg-[#0a0f14] border border-[#00ff9d88] rounded-xl p-6 text-center shadow-[0_0_25px_#00ff9d44] hover:shadow-[0_0_35px_#00ff9daa] hover:border-[#00ff9d] transition-all duration-300 cursor-pointer group"
        >
          {/* Icon */}
          <div className="flex justify-center text-[#00ff9d] mb-4 text-5xl group-hover:scale-110 transition-transform">
            {course.icon}
          </div>

          {/* Title */}
          <h3 className="relative text-2xl font-bold mb-3 text-[#00ff9d] typing tracking-wide group-hover:text-white transition-all">
  {course.title}
  <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#00ff9d] group-hover:w-full transition-all duration-500"></span>
</h3>


          {/* Description */}
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            {course.desc}
          </p>

          {/* Extra Modern Section */}
          <div className="bg-black/40 p-3 rounded-lg border border-[#00ff9d33] mb-4">
            <p className="text-xs text-gray-400">Includes:</p>
            <ul className="text-sm text-gray-200 mt-1 space-y-1">
              <li>✔ Hands-on Labs & Real-world attacks</li>
              <li>✔ Capture the Flag (CTF) challenges</li>
              <li>✔ Downloadable Tools & Scripts</li>
            </ul>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-300 mb-2">
            ⏳ {course.duration} • 🎚 {course.level}
          </p>

          {/* Pricing */}
          <div className="mt-3">
            <span className="line-through text-gray-500 mr-2">{course.oldPrice}</span>
            <span className="text-xl font-bold text-[#b084f5]">
              {course.price}
            </span>
          </div>

          {/* Button */}
          <button
  className="mt-6 w-full py-2 bg-[#00e6b8] text-black font-bold rounded-md 
             hover:bg-[#00ff9d] hover:scale-[1.03] transition-all shadow-[0_0_10px_#00e6b860]"
>
  View Details
</button>



        </motion.div>
      ))}
  </AnimatePresence>
</div>


        {!showMore && (
          <button
  onClick={() => setShowMore(true)}
  className="mt-10 px-10 py-3 text-lg rounded-md font-mono font-bold
             bg-[#00ff9d] text-black hover:bg-[#00ff9d] transition-all
             shadow-[0_0_15px_#00ff9d] hover:shadow-[0_0_25px_#00ff9d] hover:scale-[1.03]"
>
  View More Courses
</button>


        )}
      </div>
    </section>
  );
};

export default Courses;
