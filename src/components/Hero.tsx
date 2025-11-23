/* Enhanced Hacking Minimalist Hero

File: src/components/Hero.tsx
Type: React + TypeScript + TailwindCSS

This single file exports a default <Hero /> component and includes three internal subcomponents:
 - MatrixRain: canvas-based matrix code rain background
 - Terminal: fake terminal command line typing bar
 - HeroContent: decoding text + CTA buttons + animated scanner border

Install (if not already):
  npm install framer-motion

Tailwind: make sure tailwind is configured. Add "neon" color in tailwind.config.js if desired.

Usage:
 import Hero from "./components/Hero";
 // in App.tsx
 <Hero />

*/

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ----------------------- MatrixRain -----------------------
const MatrixRain: React.FC<{ opacity?: number }> = ({ opacity = 0.18 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = innerWidth);
    let h = (canvas.height = innerHeight);

    const columns = Math.floor(w / 14);
    const drops: number[] = Array(columns).fill(0);

    const characters = "01ﾑﾘｻﾎﾇｺﾊｲｴｱｳｵｶｷｸｹｺｻﾁﾂﾃ" + "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let raf = 0;
    const draw = () => {
      if (!ctx) return;
      ctx.fillStyle = `rgba(0, 0, 0, ${0.08})`;
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = `rgba(0, 255, 150, ${opacity})`;
      ctx.font = "12px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * 14;
        const y = drops[i] * 14;
        ctx.fillText(text, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = innerWidth;
      h = canvas.height = innerHeight;
      const newCols = Math.floor(w / 14);
      drops.length = newCols;
      for (let i = 0; i < newCols; i++) drops[i] = drops[i] || 0;
    };

    window.addEventListener("resize", onResize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

// ----------------------- Terminal -----------------------
const Terminal: React.FC<{ lines?: string[] }> = ({
  lines = [
    "Initializing training modules...",
    "Loading labs: [█□□□□□□□□□] 10%",
    "Fetching lab images...",
    "Ready. Type 'start' to begin simulation.",
  ],
}) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % lines.length);
    }, 2600);
    return () => clearInterval(t);
  }, [lines.length]);

  useEffect(() => {
    let p = 0;
    setProgress(0);
    const id = setInterval(() => {
      p += Math.floor(Math.random() * 8);
      setProgress((prev) => Math.min(100, prev + Math.floor(Math.random() * 12)));
      if (p > 100) {
        clearInterval(id);
      }
    }, 200);
    return () => clearInterval(id);
  }, [index]);

  return (
    <div className="mt-6 w-full bg-black/40 border border-[#00ff9d33] rounded-md p-3 text-left text-sm text-[#a9f7d1] font-mono">
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#00ff9d] shadow-[0_0_8px_#00ff9d]" />
        <span className="text-[#9ef0c7]">training@xsploit:~$</span>
        <span className="ml-2 text-[#dfffe8]">{lines[index]}</span>
      </div>
      <div className="mt-2 w-full bg-[#052016] rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#00ff9d] to-[#00ffb0]"
          style={{ width: `${progress}%`, transition: "width 300ms linear" }}
        />
      </div>
    </div>
  );
};

// ----------------------- Decoding Hook -----------------------
function useDecoder(words: string[], speed = 50, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"decode" | "hold" | "erase">("decode");

  useEffect(() => {
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;

    const decodeStep = () => {
      const word = words[wordIndex % words.length];
      // reveal one char at a time, but with random noise characters shown briefly
      const targetLen = word.length;
      setText((t) => {
        if (t.length < targetLen) {
          // create a noisy char
          const noiseChars = "▮▯█▓▒░<>#01@*";
          const next = word.slice(0, t.length + 1);
          // occasionally show a noisy char (visual glitch) before final char
          return t + (Math.random() > 0.15 ? next[next.length - 1] : noiseChars[Math.floor(Math.random() * noiseChars.length)]);
        }
        return t;
      });

      if (mounted) {
        const current = text; // capture
        if (current.length + 1 >= targetLen) {
          setPhase("hold");
          timer = setTimeout(() => {
            setPhase("erase");
          }, pause);
        } else {
          timer = setTimeout(decodeStep, speed + Math.random() * 80);
        }
      }
    };

    const eraseStep = () => {
      setText((t) => t.slice(0, -1));
      timer = setTimeout(() => {
        if (text.length <= 1) {
          setWordIndex((i) => (i + 1) % words.length);
          setPhase("decode");
        } else {
          eraseStep();
        }
      }, speed / 1.5);
    };

    if (phase === "decode") {
      decodeStep();
    }
    if (phase === "erase") {
      eraseStep();
    }

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, wordIndex]);

  return text;
}

// ----------------------- HeroContent -----------------------
const HeroContent: React.FC = () => {
  const words = [
    "LEARN ETHICAL HACKING",
    "MASTER CYBER DEFENSE",
    "REAL-LABS. EXPERTS. CAREER",
  ];

  const decoded = useDecoder(words, 50, 1600);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-20 w-full"
    >
      <div className="mx-auto max-w-3xl text-center px-6">
        <div className="inline-block px-3 py-1 bg-black/40 border border-[#00ff9d44] rounded-md mb-6">
          <span className="text-xs text-[#9ef0c7] font-mono">LIVE · CYBER LABS</span>
        </div>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#bdfcd0] leading-tight">
          <span className="block text-[#00ff9d]">{decoded}</span>
        </h2>

        <p className="mt-6 text-gray-300 max-w-2xl mx-auto">Hands-on attack/defense labs, mentorship and SOC-level simulations to build industry ready skills.</p>

        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <button className="px-6 py-3 rounded-md bg-[#00ff9d] text-black font-semibold hover:scale-105 transition-shadow shadow-sm">
            Start Learning
          </button>

          <button className="px-6 py-3 rounded-md border border-[#00ff9d66] text-[#bff4d6] font-semibold hover:bg-[#00ff9d] hover:text-black transition">
            Download Brochure
          </button>
        </div>
      </div>

      {/* Terminal */}
      <div className="mt-10">
        <Terminal />
      </div>
    </motion.div>
  );
};

// ----------------------- Hero (Main Export) -----------------------
const Hero: React.FC = () => {
  return (
    <section className="relative h-screen min-h-[680px] flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Matrix Rain Background */}
      <MatrixRain opacity={0.14} />

      {/* soft vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black opacity-40 pointer-events-none" />

      {/* Scanner border (animated) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-30 w-[92%] max-w-5xl mx-auto"
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-1 rounded-2xl pointer-events-none"
            animate={{ boxShadow: [
              "0 0 24px 2px rgba(0,255,157,0.12)",
              "0 0 44px 6px rgba(0,255,157,0.18)",
              "0 0 18px 2px rgba(0,255,157,0.10)",
            ] }}
            transition={{ repeat: Infinity, repeatType: "loop", duration: 3.4 }}
          />

          <div className="relative bg-black/50 backdrop-blur-md border border-[#0aff9d22] rounded-2xl p-8 md:p-12">
            <HeroContent />
          </div>
        </div>
      </motion.div>

      {/* subtle bottom code strip */}
      <div className="absolute bottom-6 left-6 right-6 z-10 opacity-60">
        <div className="font-mono text-xs text-[#7ff7c9] truncate">sudo launch --labs --mode=training --user=guest</div>
      </div>
    </section>
  );
};

export default Hero;

// Placeholder to prepare canvas.
