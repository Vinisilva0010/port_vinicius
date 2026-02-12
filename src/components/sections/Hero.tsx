"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const [useGyroscope, setUseGyroscope] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- CONTROLES DO MOUSE/TOUCH ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Movimento da câmera com ranges maiores no mobile
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateXRange = isMobile ? [60, -60] : [20, -20]; // MUITO MAIS rotação
  const rotateYRange = isMobile ? [-75, 75] : [-20, 20];
  
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], rotateXRange), springConfig); 
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], rotateYRange), springConfig);

  // === GYROSCOPE ===
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!useGyroscope) return;
      
      const beta = event.beta || 0;
      const gamma = event.gamma || 0;

      const x = Math.max(-1, Math.min(1, gamma / 45));
      const y = Math.max(-1, Math.min(1, (beta - 90) / 45));

      mouseX.set(x);
      mouseY.set(y);
    };

    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      (DeviceOrientationEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            setUseGyroscope(true);
            window.addEventListener('deviceorientation', handleOrientation);
          }
        });
    } else {
      setUseGyroscope(true);
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [isMobile, useGyroscope, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x * 2); // Multiplicado para mais alcance
    mouseY.set(y * 2);
  };

  // === JOYSTICK VIRTUAL (Bolinhas) ===
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);

  const handleJoystickStart = (e: React.TouchEvent) => {
    setJoystickActive(true);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!joystickActive || !joystickRef.current) return;
    
    const touch = e.touches[0];
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calcula distância do centro
    let deltaX = touch.clientX - centerX;
    let deltaY = touch.clientY - centerY;
    
    // Limita ao raio do joystick
    const maxRadius = rect.width / 2;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance > maxRadius) {
      deltaX = (deltaX / distance) * maxRadius;
      deltaY = (deltaY / distance) * maxRadius;
    }
    
    // Normaliza para -1 a 1
    const normalizedX = deltaX / maxRadius;
    const normalizedY = deltaY / maxRadius;
    
    setJoystickPos({ x: deltaX, y: deltaY });
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleJoystickEnd = () => {
    setJoystickActive(false);
    setJoystickPos({ x: 0, y: 0 });
    // Volta suave pro centro
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center touch-none"
      style={{ perspective: isMobile ? "500px" : "1000px" }}
    >
      
      {/* Botão Giroscópio */}
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
          className="absolute top-4 right-4 z-[100] px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold shadow-lg"
        >
          🎯 Giroscópio
        </button>
      )}

      {/* === JOYSTICK VIRTUAL (só mobile) === */}
      {isMobile && !useGyroscope && (
        <div
          ref={joystickRef}
          onTouchStart={handleJoystickStart}
          onTouchMove={handleJoystickMove}
          onTouchEnd={handleJoystickEnd}
          className="absolute bottom-8 left-8 z-[100] w-32 h-32 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center shadow-2xl"
        >
          {/* Bolinha interna que se move */}
          <motion.div
            animate={{
              x: joystickPos.x,
              y: joystickPos.y,
            }}
            transition={{ type: "spring", damping: 15, stiffness: 150 }}
            className="w-12 h-12 rounded-full bg-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.8)] border-2 border-white/50"
          />
        </div>
      )}

      {/* O QUARTO */}
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250vw] md:w-[200vw] h-[200vh] md:h-[150vh] z-0"
          style={{ transform: isMobile ? "translateZ(-50vh) scale(2.5)" : "translateZ(-150vh) scale(2)" }} 
        >
          <Image src="/hero/wall.png" alt="Fundo" fill className="object-cover brightness-75" priority />
        </div>

        {/* === 2. CHÃO (FLOOR) === */}
        <div 
          className="absolute bottom-[-50%] md:bottom-[-30%] left-[-100%] md:left-[-50%] w-[300%] md:w-[200%] h-[200vh] md:h-[150vh] origin-bottom z-10"
          style={{ transform: "rotateX(90deg)" }}
        >
          <Image src="/hero/floor.png" alt="Chão" fill className="object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        {/* === 3. TETO (CEILING) === */}
        <div 
          className="absolute top-[-50%] md:top-[-30%] left-[-100%] md:left-[-60%] w-[300%] md:w-[200%] h-[200vh] md:h-[150vh] origin-top z-10"
          style={{ transform: "rotateX(-90deg)" }}
        >
          <Image src="/hero/ceiling.png" alt="Teto" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
        </div>

        {/* === 4. PAREDE ESQUERDA (LEFT WALL) === */}
        <div 
          className="absolute top-[-100%] md:top-[-50%] left-[-50%] w-[200vh] md:w-[150vh] h-[300%] md:h-[200%] origin-left z-10"
          style={{ transform: "rotateY(90deg)" }}
        >
          <Image src="/hero/left-wall.png" alt="Esquerda" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </div>

        {/* === 5. PAREDE DIREITA (RIGHT WALL) === */}
        <div 
          className="absolute top-[-100%] md:top-[-50%] right-[-50%] w-[200vh] md:w-[150vh] h-[300%] md:h-[200%] origin-right z-10"
          style={{ transform: "rotateY(-90deg)" }}
        >
          <Image src="/hero/right-wall.png" alt="Direita" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-transparent to-transparent" />
        </div>

        {/* === 6. OBJETOS (MÓVEIS) === */}
        
        {/* Mesa Gamer */}
        <div 
          className="absolute bottom-0 left-[6%] w-[55vw] md:w-[50vw] h-[80vh] md:h-[100vh] z-20 pointer-events-none"
          style={{ transform: isMobile ? "translateZ(-100px) rotateY(8deg)" : "translateZ(-200px) rotateY(10deg)" }}
        >
          <Image src="/hero/de.png" alt="Mesa" fill className="object-contain object-bottom" />
        </div>

        {/* Estante */}
        <div 
          className="absolute bottom-0 right-[5%] md:right-[10%] w-[35vw] md:w-[30vw] h-[60vh] md:h-[70vh] z-20 pointer-events-none"
          style={{ transform: isMobile ? "translateZ(-60px) rotateY(-8deg)" : "translateZ(-100px) rotateY(-10deg)" }}
        >
          <Image src="/hero/sh1.png" alt="Estante" fill className="object-contain object-bottom" />
        </div>

        {/* === 7. TEXTO E UI === */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none px-4"
          style={{ transform: isMobile ? "translateZ(30px)" : "translateZ(100px)" }}
        >
          <div className="text-center pointer-events-auto p-6 sm:p-10 bg-black/40 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl max-w-[90vw] sm:max-w-none">
            <h1 className="text-4xl sm:text-7xl md:text-9xl font-black text-white drop-shadow-xl tracking-tighter leading-tight">
              Vinicius
            </h1>
            <div className="text-purple-300 font-mono text-xs sm:text-xl md:text-2xl mt-2 font-bold px-2">
              Full stack developer & Blockchain 
            </div>
            
            <button className="mt-4 sm:mt-8 px-6 sm:px-10 py-3 sm:py-4 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs sm:text-base rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(147,51,234,0.6)]">
              PRESS START
            </button>
          </div>
        </div>

      </motion.div>

      {/* Instruções */}
      {isMobile && (
        <div className="absolute bottom-4 right-4 z-[100] text-white/70 text-[10px] text-right bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
          {useGyroscope ? "📱 Movimente o celular" : "🕹️ Use o joystick"}
        </div>
      )}
    </section>
  );
}
