import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal, Flag } from "lucide-react";

const Labs = () => {
  return (
    <section className="py-20 bg-[#080b0e] text-white relative overflow-hidden">

      {/* Background neon grid */}
      <div className="absolute inset-0 bg-[linear-gradient(#0f141a_1px,transparent_1px),linear-gradient(90deg,#0f141a_1px,transparent_1px)] 
                      bg-[size:40px_40px] opacity-30"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center font-mono text-4xl font-bold mb-12 tracking-wider text-[#00ff9d]
                   drop-shadow-[0_0_10px_#00ff9d]"
      >
        LIVE PRACTICAL LABS / VM ENVIRONMENT
      </motion.h2>

      {/* Container */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-[#0a0f14] p-6 rounded-xl border border-[#00ff9d55] 
                     shadow-[0_0_25px_#00ff9d33] transition-all hover:shadow-[0_0_30px_#00ff9d88]"
        >
          <div className="flex justify-center mb-4 text-5xl text-[#00ff9d]">
            <ShieldCheck />
          </div>
          <h3 className="text-2xl font-mono text-[#00ff9d] mb-3 text-center">
            Attack & Defense Simulation
          </h3>
          <p className="text-gray-300 text-sm text-center leading-relaxed">
            Train on real-world cyber ranges where attackers and defenders 
            fight in real time to exploit and secure systems.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-[#0a0f14] p-6 rounded-xl border border-[#00ff9d55] 
                     shadow-[0_0_25px_#00ff9d33] hover:shadow-[0_0_30px_#00ff9d88]"
        >
          <div className="flex justify-center mb-4 text-5xl text-[#00ff9d]">
            <Terminal />
          </div>
          <h3 className="text-2xl font-mono text-[#00ff9d] mb-3 text-center">
            Virtual Machine Lab Access
          </h3>
          <p className="text-gray-300 text-sm text-center leading-relaxed">
            Pre-configured vulnerable machines for penetration testing
            including Web Apps, Linux, Active Directory & Cloud services.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-[#0a0f14] p-6 rounded-xl border border-[#00ff9d55]
                     shadow-[0_0_25px_#00ff9d33] hover:shadow-[0_0_30px_#00ff9d88]"
        >
          <div className="flex justify-center mb-4 text-5xl text-[#00ff9d]">
            <Flag />
          </div>
          <h3 className="text-2xl font-mono text-[#00ff9d] mb-3 text-center">
            CTF Challenges
          </h3>
          <p className="text-gray-300 text-sm text-center leading-relaxed">
            Capture the Flag exercises, exploit challenges & offensive red-team
            puzzles designed to build problem-solving and strategy skills.
          </p>
        </motion.div>

      </div>

      {/* Terminal Footer Banner */}
      <p className="text-center mt-10 font-mono text-[#00ff9d99] text-sm">
         Access real attack environments — no simulations, real hacking tools
      </p>

    </section>
  );
};

export default Labs;
