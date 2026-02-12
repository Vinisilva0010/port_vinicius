"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Permanent_Marker } from "next/font/google";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });

const clouds = [
  { name: "AWS", src: "/ticker/aws.png" },
  { name: "GOOGLE CLOUD", src: "/ticker/gcp.png" },
  { name: "PYTHON", src: "/ticker/python.png" },
  { name: "MACHINE LEARNING", src: "/ticker/ml.png" },
  { name: "SQL", src: "/ticker/sql.png" },
];

const repeatedClouds = [...clouds, ...clouds, ...clouds, ...clouds];

export function CloudTicker() {
  const [isMobile, setIsMobile] = useState(false);

  // Detecta mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="w-full bg-[#22c55e] border-y-4 sm:border-y-6 md:border-y-8 border-black overflow-hidden py-3 sm:py-4 md:py-6 relative z-50 rotate-1 sm:rotate-[2deg] scale-[1.02] sm:scale-105 shadow-[0_0_15px_rgba(34,197,94,0.4)] sm:shadow-[0_0_20px_rgba(34,197,94,0.5)]">
      
      <motion.div
        className="flex items-center whitespace-nowrap gap-6 sm:gap-10 md:gap-16"
        animate={{
          x: ["-50%", "0%"], // Move para a DIREITA (oposto do outro ticker)
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: isMobile ? 35 : 25, // Mais lento no mobile
        }}
      >
        {repeatedClouds.map((item, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-4 md:gap-6 group">
            {/* Ícone */}
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-transform group-hover:scale-125 group-hover:-rotate-12 duration-300 flex-shrink-0">
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
            <span className="text-base sm:text-xl md:text-2xl lg:text-3xl text-black font-bold">●</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
