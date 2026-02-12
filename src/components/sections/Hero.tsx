"use client";

import { motion, useMotionValue, useSpring, useTransform, useAnimation } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [useGyroscope, setUseGyroscope] = useState(false);

  // Valores base para rotação (acumulados)
  const [baseRotationX, setBaseRotationX] = useState(0);
  const [baseRotationY, setBaseRotationY] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- CONTROLES DO MOUSE/TOUCH ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Movimento da cabeça (Câmera)
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateXRange = isMobile ? [45, -45] : [20, -20]; // AUMENTADO para mobile ver 360°
  const rotateYRange = isMobile ? [-45, 45] : [-20, 20];
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], rotateXRange), springConfig); 
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], rotateYRange), springConfig);

  // === GYROSCOPE (Giroscópio do celular) ===
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!useGyroscope) return;
      
      const beta = event.beta || 0; // Inclinação frente/trás (-180 a 180)
      const gamma = event.gamma || 0; // Inclinação esquerda/direita (-90 a 90)

      // Normaliza e inverte para ficar natural
      const x = Math.max(-0.5, Math.min(0.5, gamma / 90 * 0.5));
      const y = Math.max(-0.5, Math.min(0.5, (beta - 90) / 90 * 0.5));

      mouseX.set(x);
      mouseY.set(y);
    };

    // Pede permissão no iOS 13+
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            setUseGyroscope(true);
            window.addEventListener('deviceorientation', handleOrientation);
          }
        });
    } else {
      // Android ou iOS antigo
      setUseGyroscope(true);
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile, useGyroscope, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return; // No mobile usa swipe
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // === SWIPE/DRAG (Arrastar para girar) ===
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (useGyroscope) return; // Se tá usando giroscópio, não usa swipe
    setIsDragging(true);
    const touch = e.touches[0];
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || useGyroscope) return;
    
    const touch = e.touches[0];
    const deltaX = (touch.clientX - startPos.x) / window.innerWidth;
    const deltaY = (touch.clientY - startPos.y) / window.innerHeight;

    // Acumula a rotação
    const newX = Math.max(-0.5, Math.min(0.5, deltaX));
    const newY = Math.max(-0.5, Math.min(0.5, deltaY));

    mouseX.set(newX);
    mouseY.set(newY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      style={{ perspective: isMobile ? "600px" : "1000px" }} // Perspective menor = mais dramático
    >
      
      {/* Botão para ativar Giroscópio (iOS precisa) */}
      {isMobile && !useGyroscope && (
        <button
          onClick={() => {
            if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
              (DeviceOrientationEvent as any).requestPermission()
                .then((permissionState: string) => {
                  if (permissionState === 'granted') {
                    setUseGyroscope(true);
                  }
                });
            } else {
              setUseGyroscope(true);
            }
          }}
          className="absolute top-4 right-4 z-[100] px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold shadow-lg"
        >
          🎯 Ativar Giroscópio
        </button>
      )}

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
          style={{ transform: isMobile ? "translateZ(-80vh) scale(1.8)" : "translateZ(-150vh) scale(2)" }} 
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
        
        {/* Mesa Gamer (Esquerda) */}
        <div 
          className="absolute bottom-0 left-[6%] md:left-[6%] w-[55vw] md:w-[50vw] h-[80vh] md:h-[100vh] z-20 pointer-events-none"
          style={{ transform: isMobile ? "translateZ(-150px) rotateY(8deg)" : "translateZ(-200px) rotateY(10deg)" }}
        >
          <Image src="/hero/de.png" alt="Mesa" fill className="object-contain object-bottom" />
        </div>

        {/* Estante (Direita) */}
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

      {/* Instruções de uso */}
      {isMobile && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[100] text-white/60 text-xs text-center px-4">
          {useGyroscope ? "📱 Movimente o celular para explorar" : "👆 Arraste para olhar ao redor"}
        </div>
      )}
    </section>
  );
}
