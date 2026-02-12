"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- CONTROLES DO MOUSE/TOUCH ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Movimento da cabeça (Câmera) - Reduzido no mobile
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateXRange = isMobile ? [10, -10] : [20, -20];
  const rotateYRange = isMobile ? [-10, 10] : [-20, 20];
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], rotateXRange), springConfig); 
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], rotateYRange), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Touch support para mobile
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (touch.clientX - left) / width - 0.5;
    const y = (touch.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      style={{ perspective: isMobile ? "800px" : "1000px" }}
    >
      
      {/* O QUARTO (Onde a mágica acontece) */}
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full origin-center"
      >
        
        {/* === 1. FUNDO (WALL) === */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[150vh] z-0"
          style={{ transform: isMobile ? "translateZ(-100vh) scale(1.8)" : "translateZ(-150vh) scale(2)" }} 
        >
          <Image src="/hero/wall.png" alt="Fundo" fill className="object-cover brightness-75" priority />
        </div>

        {/* === 2. CHÃO (FLOOR) === */}
        <div 
          className="absolute bottom-[-30%] left-[-50%] w-[200%] h-[150vh] origin-bottom z-10"
          style={{ transform: "rotateX(90deg)" }}
        >
          <Image src="/hero/floor.png" alt="Chão" fill className="object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </div>

        {/* === 3. TETO (CEILING) === */}
        <div 
          className="absolute top-[-30%] left-[-60%] w-[200%] h-[150vh] origin-top z-10"
          style={{ transform: "rotateX(-90deg)" }}
        >
          <Image src="/hero/ceiling.png" alt="Teto" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-transparent" />
        </div>

        {/* === 4. PAREDE ESQUERDA (LEFT WALL) === */}
        <div 
          className="absolute top-[-50%] left-[-50%] w-[150vh] h-[200%] origin-left z-10"
          style={{ transform: "rotateY(90deg)" }}
        >
          <Image src="/hero/left-wall.png" alt="Esquerda" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
        </div>

        {/* === 5. PAREDE DIREITA (RIGHT WALL) === */}
        <div 
          className="absolute top-[-50%] right-[-50%] w-[150vh] h-[200%] origin-right z-10"
          style={{ transform: "rotateY(-90deg)" }}
        >
          <Image src="/hero/right-wall.png" alt="Direita" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-transparent to-transparent" />
        </div>

        {/* === 6. OBJETOS (MÓVEIS) === */}
        
        {/* Mesa Gamer (Esquerda) - Ajustada para mobile */}
        <div 
          className="absolute bottom-0 left-[6%] md:left-[6%] w-[55vw] md:w-[50vw] h-[80vh] md:h-[100vh] z-20 pointer-events-none"
          style={{ transform: isMobile ? "translateZ(-150px) rotateY(8deg)" : "translateZ(-200px) rotateY(10deg)" }}
        >
          <Image src="/hero/de.png" alt="Mesa" fill className="object-contain object-bottom" />
        </div>

        {/* Estante (Direita) - Ajustada para mobile */}
        <div 
          className="absolute bottom-0 right-[5%] md:right-[10%] w-[35vw] md:w-[30vw] h-[60vh] md:h-[70vh] z-20 pointer-events-none"
          style={{ transform: isMobile ? "translateZ(-80px) rotateY(-8deg)" : "translateZ(-100px) rotateY(-10deg)" }}
        >
          <Image src="/hero/sh1.png" alt="Estante" fill className="object-contain object-bottom" />
        </div>

        {/* === 7. TEXTO E UI === */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none px-4"
          style={{ transform: isMobile ? "translateZ(50px)" : "translateZ(100px)" }}
        >
          <div className="text-center pointer-events-auto p-6 sm:p-10 bg-black/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl max-w-[90vw] sm:max-w-none">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white drop-shadow-xl tracking-tighter leading-tight">
              Vinicius
            </h1>
            <div className="text-purple-300 font-mono text-sm sm:text-xl md:text-2xl mt-2 font-bold px-2">
              Full stack developer & Blockchain 
            </div>
            
            <button className="mt-6 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-sm sm:text-base rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(147,51,234,0.4)]">
              PRESS START
            </button>
          </div>
        </div>

      </motion.div>
    </section>
  );
}
