"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  // --- CONTROLES DO MOUSE ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Movimento da cabeça (Câmera)
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig); 
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      style={{ perspective: "1000px" }} // Profundidade visual
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
        {/* Empurramos para trás para criar profundidade */}
        <div 
          className="absolute top-1/1 left-1/1 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[150vh] z-0"
          style={{ transform: "translateZ(-150vh) scale(2)" }} 
        >
          <Image src="/hero/wall.png" alt="Fundo" fill className="object-cover brightness-75" priority />
        </div>

        {/* === 2. CHÃO (FLOOR) === */}
        {/* "Nasce" da parte de baixo da tela (origin-bottom) e deita 90 graus */}
        <div 
          className="absolute bottom-[-30%] left-[-50%] w-[200%] h-[150vh] origin-bottom z-10"
          style={{ transform: "rotateX(90deg)" }}
        >
          <Image src="/hero/floor.png" alt="Chão" fill className="object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </div>

        {/* === 3. TETO (CEILING) === */}
        {/* "Nasce" da parte de cima da tela (origin-top) e deita -90 graus */}
        <div 
          className="absolute top-[-30%] left-[-60%] w-[200%] h-[150vh] origin-top z-10"
          style={{ transform: "rotateX(-90deg)" }}
        >
          <Image src="/hero/ceiling.png" alt="Teto" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-transparent" />
        </div>

        {/* === 4. PAREDE ESQUERDA (LEFT WALL) === */}
        {/* "Nasce" da esquerda da tela (origin-left) e gira 90 graus */}
        <div 
          className="absolute top-[-50%] left-[-50%] w-[150vh] h-[200%] origin-left z-10"
          style={{ transform: "rotateY(90deg)" }}
        >
          <Image src="/hero/left-wall.png" alt="Esquerda" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
        </div>

        {/* === 5. PAREDE DIREITA (RIGHT WALL) === */}
        {/* "Nasce" da direita da tela (origin-right) e gira -90 graus */}
        <div 
          className="absolute top-[-50%] right-[-50%] w-[150vh] h-[200%] origin-right z-10"
          style={{ transform: "rotateY(-90deg)" }}
        >
          <Image src="/hero/right-wall.png" alt="Direita" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-transparent to-transparent" />
        </div>


        {/* === 6. OBJETOS (MÓVEIS) === */}
        {/* Precisam estar "soltos" no meio do quarto */}
        
        {/* Mesa Gamer (Esquerda) */}
        <div 
          className="absolute bottom-0 left-[6%] w-[50vw] h-[100vh] z-20 pointer-events-none"
          style={{ transform: "translateZ(-200px) rotateY(10deg)" }}
        >
          <Image src="/hero/de.png" alt="Mesa" fill className="object-contain object-bottom" />
        </div>

        {/* Estante (Direita) */}
        <div 
          className="absolute bottom-0 right-[10%] w-[30vw] h-[70vh] z-20 pointer-events-none"
          style={{ transform: "translateZ(-100px) rotateY(-10deg)" }}
        >
          <Image src="/hero/sh1.png" alt="Estante" fill className="object-contain object-bottom" />
        </div>


        {/* === 7. TEXTO E UI === */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
          style={{ transform: "translateZ(100px)" }} // Flutuando na frente
        >
          <div className="text-center pointer-events-auto p-10 bg-black/30 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
            <h1 className="text-7xl md:text-9xl font-black text-white drop-shadow-xl tracking-tighter">
              Vinicius
            </h1>
            <div className="text-purple-300 font-mono text-xl md:text-2xl mt-2 font-bold">
              Full stack developer & Blockchain 
            </div>
            
            <button className="mt-8 px-10 py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_30px_rgba(147,51,234,0.4)]">
              PRESS START
            </button>
          </div>
        </div>

      </motion.div>
    </section>
  );
}