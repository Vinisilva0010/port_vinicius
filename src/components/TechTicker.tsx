"use client";

import { useState, useEffect } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const techs = [
  { name: "RUST", src: "/ticker/rust.png" },
  { name: "C++", src: "/ticker/cpp.png" },
  { name: "SOLANA", src: "/ticker/solana.png" },
  { name: "BITCOIN", src: "/ticker/btc.png" },
  { name: "ETHEREUM", src: "/ticker/eth.png" },
  { name: "BLOCKCHAIN", src: "/ticker/chain.png" },
  { name: "SMART CONTRACTS", src: "/ticker/contract1.png" },
];

const satoshiVariants = {
  hidden: (corner: number) => ({
    x: corner % 2 === 0 ? "-100%" : "100%",
    y: corner < 2 ? "-100%" : "100%",
    opacity: 0,
    rotate: corner % 2 === 0 ? -45 : 45,
    scale: 0.5
  }),
  visible: {
    x: "0%",
    y: "0%",
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 15, stiffness: 100 }
  },
  exit: (corner: number) => ({
    x: corner % 2 === 0 ? "-80%" : "80%",
    y: corner < 2 ? "-80%" : "80%",
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.5 }
  })
};

const repeatedTechs = [...techs, ...techs, ...techs, ...techs];

export function TechTicker() {
  const [showSatoshi, setShowSatoshi] = useState(false);
  const [corner, setCorner] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Easter egg do Satoshi
  useEffect(() => {
    const triggerSatoshi = () => {
      setCorner(Math.floor(Math.random() * 4));
      setShowSatoshi(true);
      setTimeout(() => setShowSatoshi(false), 2500);
      const nextTime = Math.random() * 25000 + 15000;
      setTimeout(triggerSatoshi, nextTime);
    };

    const initialTimer = setTimeout(triggerSatoshi, 5000);
    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <section className="w-full bg-[#fbbf24] border-y-4 sm:border-y-6 md:border-y-8 border-black overflow-hidden py-3 sm:py-4 md:py-6 relative z-50 -rotate-1 sm:-rotate-2 scale-[1.02] sm:scale-105 shadow-[0_0_15px_rgba(251,191,36,0.4)] sm:shadow-[0_0_20px_rgba(251,191,36,0.5)]">
      
      {/* Textura de fundo */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

      {/* Ticker animado */}
      <motion.div
        className="flex items-center whitespace-nowrap gap-6 sm:gap-10 md:gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: isMobile ? 30 : 20, // Mais lento no mobile
        }}
      >
        {repeatedTechs.map((tech, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-3 md:gap-4 group">
            {/* Ícone da Tech */}
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-transform group-hover:scale-125 group-hover:rotate-12 duration-300 flex-shrink-0">
              <Image
                src={tech.src}
                alt={tech.name}
                fill
                className="object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              />
            </div>

            {/* Nome da Tech */}
            <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tighter drop-shadow-sm">
              {tech.name}
            </span>

            {/* Separador */}
            <span className="text-base sm:text-xl md:text-2xl lg:text-3xl text-black">✦</span>
          </div>
        ))}
      </motion.div>

      {/* Easter Egg: Satoshi Nakamoto */}
      <AnimatePresence>
        {showSatoshi && (
          <motion.div
            key="satoshi-egg"
            custom={corner}
            variants={satoshiVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute z-100 w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 pointer-events-none
              ${corner === 0 ? "top-0 left-0 origin-top-left" : ""}
              ${corner === 1 ? "top-0 right-0 origin-top-right" : ""}
              ${corner === 2 ? "bottom-0 left-0 origin-bottom-left" : ""}
              ${corner === 3 ? "bottom-0 right-0 origin-bottom-right" : ""}
            `}
          >
            <Image
              src="/blockchain/satoshi-peek.png"
              alt="Satoshi Nakamoto?"
              fill
              className="object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
