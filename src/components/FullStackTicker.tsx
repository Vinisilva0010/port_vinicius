"use client";

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
  return (
    // Roxo Vibrante para fechar a trindade de cores
    <section className="w-full bg-[#9333ea] border-y-8 border-black overflow-hidden py-6 relative z-50 rotate-[-1deg] scale-105 shadow-[0_0_20px_rgba(147,51,234,0.5)]">
      
      <motion.div
        className="flex items-center whitespace-nowrap gap-16"
        animate={{
          x: ["0%", "-50%"], // Move para a esquerda
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 18, // Um pouco mais rápido para dar energia
        }}
      >
        {repeatedStack.map((item, index) => (
          <div key={index} className="flex items-center gap-6 group">
            <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform group-hover:scale-125 group-hover:rotate-6">
              <Image
                src={item.src}
                alt={item.name}
                fill
                className="object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <span className={`text-4xl font-black text-black tracking-tighter ${markerFont.className}`}>
              {item.name}
            </span>

            <span className="text-3xl text-black">★</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}