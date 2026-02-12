"use client";

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
  return (
    // Cor Verde Neon para diferenciar da outra faixa amarela
    <section className="w-full bg-[#22c55e] border-y-8 border-black overflow-hidden py-6 relative z-50 rotate-[2deg] scale-105 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
      
      <motion.div
        className="flex items-center whitespace-nowrap gap-16"
        animate={{
          x: ["-50%", "0%"], // Esse move para a DIREITA para criar contraste com o outro ticker
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 25,
        }}
      >
        {repeatedClouds.map((item, index) => (
          <div key={index} className="flex items-center gap-6 group">
            <div className="relative w-16 h-16 md:w-20 md:h-20 transition-transform group-hover:scale-125 group-hover:-rotate-12">
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

            <span className="text-3xl text-black font-bold">●</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}