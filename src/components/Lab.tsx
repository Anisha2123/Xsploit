import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Terminal, Flag } from "lucide-react";

const Labs: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Floating ASCII characters animation
  useEffect(() => {
    const canvas = canvasRef.current;
if (!canvas) return;
const ctx = canvas.getContext("2d");
if (!ctx) return;

const resizeCanvas = () => {
  const section = canvas.parentElement;
  canvas.width = window.innerWidth;
  canvas.height = section ? section.offsetHeight : window.innerHeight;
};
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const particles = Array.from({ length: 150 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      char: chars[Math.floor(Math.random() * chars.length)],
      speed: 0.5 + Math.random() * 1.5,
      size: 12 + Math.random() * 8,
    }));

    let animationFrame: number;

    const draw = () => {
      ctx.fillStyle = "#080b0e"; // Dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#00ff9d"; // Neon green
      ctx.font = "bold 14px monospace";

      particles.forEach((p) => {
        ctx.fillText(p.char, p.x, p.y);
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
          p.char = chars[Math.floor(Math.random() * chars.length)];
        }
      });

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="py-24 bg-[#080b0e] text-white relative overflow-hidden">
      {/* ASCII floating canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-25 pointer-events-none"></canvas>

      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center font-mono text-4xl font-bold mb-12 tracking-wide text-[#00ff9d] drop-shadow-[0_0_12px_#00ff9d]"
      >
        LIVE CYBER PRACTICAL LAB ENVIRONMENT
      </motion.h2>

      {/* Cards Row */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative bg-[#0a0f14] p-6 rounded-xl border border-[#00ff9d55] shadow-[0_0_25px_#00ff9d33] hover:shadow-[0_0_35px_#00ff9daa] transition-all cursor-pointer"
        >
          <div className="flex justify-center mb-4 text-5xl text-[#00ff9d]"><ShieldCheck /></div>
          <h3 className="text-2xl font-mono text-center text-[#00ff9d] mb-2">Attack & Defense Lab</h3>
          <p className="text-gray-300 text-sm text-center leading-relaxed">
            Hands-on cyber lab where students attack & defend systems like real professionals.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative bg-[#0a0f14] p-6 rounded-xl border border-[#00ff9d55] shadow-[0_0_25px_#00ff9d33] hover:shadow-[0_0_35px_#00ff9daa] transition-all cursor-pointer"
        >
          <div className="flex justify-center mb-4 text-5xl text-[#00ff9d]"><Terminal /></div>
          <h3 className="text-2xl font-mono text-center text-[#00ff9d] mb-2">Virtual Machine Lab</h3>
          <p className="text-gray-300 text-sm text-center leading-relaxed">
            Preloaded hacking VMs & vulnerable servers for safe hands-on exploit practice.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative bg-[#0a0f14] p-6 rounded-xl border border-[#00ff9d55] shadow-[0_0_25px_#00ff9d33] hover:shadow-[0_0_35px_#00ff9daa] transition-all cursor-pointer"
        >
          <div className="flex justify-center mb-4 text-5xl text-[#00ff9d]"><Flag /></div>
          <h3 className="text-2xl font-mono text-center text-[#00ff9d] mb-2">CTF Challenges</h3>
          <p className="text-gray-300 text-sm text-center leading-relaxed">
            Capture the Flag competitions & practical puzzles to sharpen hacking skills.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Labs;
