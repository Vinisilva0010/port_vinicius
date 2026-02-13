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

  // Movimento da câmera – springs mais suaves no mobile
  const springConfig = isMobile
    ? { damping: 35, stiffness: 55 }
    : { damping: 20, stiffness: 100 };

  const rotateXRange = isMobile ? [30, -30] : [20, -20];
  const rotateYRange = isMobile ? [-35, 35] : [-20, 20];

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], rotateXRange), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], rotateYRange), springConfig);

  // === GYROSCOPE ===
  useEffect(() => {
    if (!isMobile) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (!useGyroscope) return;

      const beta = event.beta || 0;
      const gamma = event.gamma || 0;

      // força limitada pra não ficar “giro maluco”
      const x = Math.max(-0.7, Math.min(0.7, gamma / 60));
      const y = Math.max(-0.7, Math.min(0.7, (beta - 90) / 60));

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile, useGyroscope, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x * 1.5);
    mouseY.set(y * 1.5);
  };

  // === JOYSTICK VIRTUAL ===
  const [joystickActive, setJoystickActive] = useState(false);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const joystickRef = useRef<HTMLDivElement>(null);

  const handleJoystickStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setJoystickActive(true);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!joystickActive || !joystickRef.current) return;
    e.stopPropagation();

    const touch = e.touches[0];
    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let deltaX = touch.clientX - centerX;
    let deltaY = touch.clientY - centerY;

    const maxRadius = rect.width / 2;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance > maxRadius) {
      deltaX = (deltaX / distance) * maxRadius;
      deltaY = (deltaY / distance) * maxRadius;
    }

    const normalizedX = deltaX / maxRadius;
    const normalizedY = deltaY / maxRadius;

    setJoystickPos({ x: deltaX, y: deltaY });
    // leve clamp extra pra não exagerar
    mouseX.set(Math.max(-0.9, Math.min(0.9, normalizedX)));
    mouseY.set(Math.max(-0.9, Math.min(0.9, normalizedY)));
  };

  const handleJoystickEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    setJoystickActive(false);
    setJoystickPos({ x: 0, y: 0 });
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center"
      style={{ perspective: isMobile ? "850px" : "1000px" }}
    >
      {/* Botão Giroscópio */}
      {isMobile && !useGyroscope && (
        <button
          onClick={() => {
            if (
              typeof (DeviceOrientationEvent as any).requestPermission === "function"
            ) {
              (DeviceOrientationEvent as any)
                .requestPermission()
                .then((permissionState: string) => {
                  if (permissionState === "granted") {
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

      {/* JOYSTICK VIRTUAL (fallback do gyro) */}
      {isMobile && !useGyroscope && (
        <div
          ref={joystickRef}
          onTouchStart={handleJoystickStart}
          onTouchMove={handleJoystickMove}
          onTouchEnd={handleJoystickEnd}
          className="absolute bottom-8 left-8 z-[100] w-28 h-28 rounded-full bg-white/8 backdrop-blur-md border-2 border-white/20 flex items-center justify-center shadow-xl touch-none"
        >
          <motion.div
            animate={{
              x: joystickPos.x,
              y: joystickPos.y,
            }}
            transition={{ type: "spring", damping: 18, stiffness: 130 }}
            className="w-11 h-11 rounded-full bg-purple-500 shadow-[0_0_18px_rgba(168,85,247,0.8)] border-2 border-white/40"
          />
        </div>
      )}

      {/* O QUARTO */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative w-full h-full origin-center"
      >
        {/* FUNDO */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[150vh] z-0"
          style={{
            transform: isMobile
              ? "translateZ(-190vh) scale(2)"
              : "translateZ(-150vh) scale(2)",
          }}
        >
          <Image
            src="/hero/wall.png"
            alt="Fundo"
            fill
            className="object-cover brightness-75"
            priority
          />
        </div>

        {/* CHÃO */}
        <div
          className="absolute bottom-[-32%] left-[-50%] w-[200%] h-[150vh] origin-bottom z-10"
          style={{ transform: "rotateX(90deg)" }}
        >
          <Image
            src="/hero/floor.png"
            alt="Chão"
            fill
            className="object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </div>

        {/* TETO */}
        <div
          className="absolute top-[-30%] left-[-60%] w-[200%] h-[150vh] origin-top z-10"
          style={{ transform: "rotateX(-90deg)" }}
        >
          <Image
            src="/hero/ceiling.png"
            alt="Teto"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-transparent" />
        </div>

        {/* PAREDE ESQUERDA */}
        <div
          className="absolute top-[-50%] left-[-50%] w-[150vh] h-[200%] origin-left z-10"
          style={{ transform: "rotateY(90deg)" }}
        >
          <Image
            src="/hero/left-wall.png"
            alt="Esquerda"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
        </div>

        {/* PAREDE DIREITA */}
        <div
          className="absolute top-[-50%] right-[-50%] w-[150vh] h-[200%] origin-right z-10"
          style={{ transform: "rotateY(-90deg)" }}
        >
          <Image
            src="/hero/right-wall.png"
            alt="Direita"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-transparent to-transparent" />
        </div>

        {/* OBJETOS */}

        {/* Mesa Gamer */}
        <div
          className="absolute bottom-0 left-[6%] w-[55vw] md:w-[50vw] h-[80vh] md:h-[100vh] z-20 pointer-events-none"
          style={{
            transform: isMobile
              ? "translateZ(-110px) rotateY(7deg)"
              : "translateZ(-200px) rotateY(10deg)",
          }}
        >
          <Image
            src="/hero/de.png"
            alt="Mesa"
            fill
            className="object-contain object-bottom"
          />
        </div>

        {/* Estante */}
        <div
          className="absolute bottom-0 right-[5%] md:right-[10%] w-[35vw] md:w-[30vw] h-[60vh] md:h-[70vh] z-20 pointer-events-none"
          style={{
            transform: isMobile
              ? "translateZ(-60px) rotateY(-7deg)"
              : "translateZ(-100px) rotateY(-10deg)",
          }}
        >
          <Image
            src="/hero/sh1.png"
            alt="Estante"
            fill
            className="object-contain object-bottom"
          />
        </div>

        {/* TEXTO E UI */}
        <div
          className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none px-4"
          style={{ transform: isMobile ? "translateZ(35px)" : "translateZ(90px)" }}
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
        <div className="absolute bottom-4 right-4 z-[100] text-white/70 text-[10px] text-right bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg pointer-events-none">
          {useGyroscope ? "📱 Movimente o celular" : "🕹️ Use o joystick"}
        </div>
      )}
    </section>
  );
}
