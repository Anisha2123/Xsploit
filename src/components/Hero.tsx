import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* Grid / Matrix Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(90deg,#0aff9d33_1px,transparent_1px),linear-gradient(#0aff9d33_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Terminal glass panel */}
      <div className="relative z-10 w-[90%] max-w-4xl mx-auto bg-black/40 backdrop-blur-xl border border-[#0aff9d55] rounded-xl p-10 shadow-[0_0_25px_#00ff9980]">

        <h1 className="text-3xl sm:text-5xl font-bold text-[#00ff9d] tracking-widest">
          <Typewriter
            words={[
              "ETHICAL HACKING TRAINING",
              "MASTER CYBERSECURITY SKILLS",
              "DEFEND. PROTECT. SECURE.",
            ]}
            loop
            cursor
            cursorStyle="_"
            typeSpeed={65}
            deleteSpeed={40}
            delaySpeed={1800}
          />
        </h1>

        <p className="mt-6 text-gray-300 text-lg sm:text-xl leading-relaxed">
          Real-world cyber attack simulation | SOC-Level Training | Industry Mentors
        </p>

        <div className="mt-10 flex gap-6 justify-center flex-wrap">
          <button className="px-8 py-3 bg-[#00ff9d] text-black font-bold rounded-lg hover:shadow-[0_0_15px_#00ff9d] hover:scale-105 transition">
            Start Learning
          </button>

          <button className="px-8 py-3 border border-[#00ff9d] text-[#00ff9d] font-bold rounded-lg hover:bg-[#00ff9d] hover:text-black hover:shadow-[0_0_15px_#00ff9d] transition">
            Download Brochure
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
