"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Permanent_Marker } from "next/font/google";
import { Github, Linkedin, MessageCircle, Disc } from "lucide-react";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });

const tvImages = {
  idle: "/footer/tv-idle.png",
  whatsapp: "/footer/tv-point-left.png",
  github: "/footer/tv-point-midleft.png",
  linkedin: "/footer/tv-point-midright.png",
  discord: "/footer/tv-point-right.png",
};

export function FooterSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState<keyof typeof tvImages>("idle");
  const [mobileAnimationIndex, setMobileAnimationIndex] = useState(0);

  // Detecta mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const socials = [
    { name: "whatsapp", icon: <MessageCircle size={32} />, color: "bg-green-500", link: "#" },
    { name: "github", icon: <Github size={32} />, color: "bg-gray-800", link: "https://github.com/Vinisilva0010" },
    { name: "linkedin", icon: <Linkedin size={32} />, color: "bg-blue-600", link: "#" },
    { name: "discord", icon: <Disc size={32} />, color: "bg-indigo-500", link: "#" },
  ];

  // Array de animações para o mobile (em ordem)
  const mobileAnimations: (keyof typeof tvImages)[] = ["idle", "whatsapp", "github", "linkedin", "discord"];

  // Loop automático no mobile
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setMobileAnimationIndex((prev) => (prev + 1) % mobileAnimations.length);
    }, 2500); // Troca a cada 2.5 segundos

    return () => clearInterval(interval);
  }, [isMobile]);

  // Atualiza a imagem da TV baseado no estado atual
  useEffect(() => {
    if (isMobile) {
      setHoveredSocial(mobileAnimations[mobileAnimationIndex]);
    }
  }, [isMobile, mobileAnimationIndex]);

  return (
    <footer className="relative w-full min-h-screen overflow-hidden bg-black border-t-4 sm:border-t-8 border-black flex items-center justify-center py-12 sm:py-16 md:py-20">
      
      {/* --- FUNDO DO QUARTO --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/footer/bedroom-bg.png"
          alt="Retro Bedroom"
          fill
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* --- CONTEÚDO --- */}
      <div className="relative z-10 container mx-auto flex flex-col items-center px-4">
        
        {/* Título - COM Z-INDEX ALTO E PADDING TOP NO DESKTOP */}
        <motion.h2 
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          className={`relative z-50 text-2xl sm:text-3xl md:text-4xl lg:text-6xl text-white text-center mb-12 sm:mb-8 md:mt-8 lg:mt-0 md:mb-12 lg:mb-16 drop-shadow-[0_3px_0_#000] sm:drop-shadow-[0_5px_0_#000] px-4 ${markerFont.className}`}
        >
          ENTRE EM CONTATO COMIGO
        </motion.h2>

        {/* --- A TV INTERATIVA (MAIOR NO MOBILE) --- */}
        <div className="relative w-[350px] h-[260px] sm:w-[420px] sm:h-[315px] md:w-[500px] md:h-[375px] lg:w-[600px] lg:h-[450px] mb-12 sm:mb-10 md:mb-12">
            
          {/* Tela Interna (O Personagem) */}
          <div className="absolute top-[-25%] bottom-[35%] left-[15%] right-[10%] z-10 bg-black rounded-2xl sm:rounded-[29px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredSocial}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="relative w-full h-full"
              >
                <Image
                  src={tvImages[hoveredSocial]}
                  alt="TV Character"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Efeito de Vidro e Scanlines da TV */}
          <div className="absolute top-[-15%] bottom-[40%] left-[19%] right-[13%] z-20 rounded-[40px] sm:rounded-[60px] overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-60"></div>
            <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.7)] sm:shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]"></div>
          </div>

          {/* Indicador de animação no mobile */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex gap-2"
            >
              {mobileAnimations.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    mobileAnimationIndex === index 
                      ? "bg-purple-500 w-6" 
                      : "bg-purple-900/40"
                  }`}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* --- ÍCONES SOCIAIS --- */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-0">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => !isMobile && setHoveredSocial(social.name as keyof typeof tvImages)}
              onMouseLeave={() => !isMobile && setHoveredSocial("idle")}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: isMobile ? 1 : 1.15, rotate: 2 }}
              whileTap={{ scale: 0.9 }}
              className={`${social.color} p-3 sm:p-4 md:p-5 text-white rounded-xl sm:rounded-2xl border-3 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] hover:shadow-none transition-all active:translate-y-1 sm:active:translate-y-2`}
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
                {social.icon}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <p className={`text-gray-500 mt-10 sm:mt-12 md:mt-16 text-sm sm:text-base md:text-lg text-center ${markerFont.className}`}>
          © 2026 ZANVEXIS • FEITO COM CAOS E RUST
        </p>

      </div>
    </footer>
  );
}
