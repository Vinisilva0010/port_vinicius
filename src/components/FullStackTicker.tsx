"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Permanent_Marker } from "next/font/google";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });

const stack = [
  { name: "NODE.JS", src: "/ticker/node.png" },
  { name: "NEXT.JS", src: "/ticker/next.png" },
  { name: "REACT", src: "/ticker/react.png" },
  { name: "TYPESCRIPT", src: "/ticker/typescript.png" },
  { name: "JAVASCRIPT", src: "/ticker/javascript.png" },
  { name: "THREE.JS", src: "/ticker/threejs.png" },
];

const repeatedStack = [...stack, ...stack, ...stack, ...stack];

export function FullStackTicker() {
  const [isMobile, setIsMobile] = useState(false);

  // Detecta mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-full bg-[#9333ea] border-y-4 sm:border-y-6 md:border-y-8 border-black overflow-hidden py-3 sm:py-4 md:py-6 relative z-50 rotate-[-0.5deg] sm:rotate-[-1deg] scale-[1.02] sm:scale-105 shadow-[0_0_15px_rgba(147,51,234,0.4)] sm:shadow-[0_0_20px_rgba(147,51,234,0.5)]">
      
      <motion.div
        className="flex items-center whitespace-nowrap gap-6 sm:gap-10 md:gap-16"
        animate={{
          x: ["0%", "-50%"], // Move para a esquerda
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: isMobile ? 28 : 18, // Mais lento no mobile
        }}
      >
        {repeatedStack.map((item, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-4 md:gap-6 group">
            {/* Ícone */}
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-transform group-hover:scale-125 group-hover:rotate-6 duration-300 flex-shrink-0">
              <Image
                src={item.src}
                alt={item.name}
                fill
                className="object-contain drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] sm:drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] md:drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              />
            </div>

            {/* Nome */}
            <span className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tighter ${markerFont.className}`}>
              {item.name}
            </span>

            {/* Separador */}
            <span className="text-base sm:text-xl md:text-2xl lg:text-3xl text-black">★</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
