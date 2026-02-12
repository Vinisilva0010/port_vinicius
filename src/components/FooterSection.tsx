"use client";

import { useState } from "react";
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
  const [hoveredSocial, setHoveredSocial] = useState<keyof typeof tvImages>("idle");

  const socials = [
    { name: "whatsapp", icon: <MessageCircle size={32} />, color: "bg-green-500", link: "#" },
    { name: "github", icon: <Github size={32} />, color: "bg-gray-800", link: "https://github.com/Vinisilva0010" },
    { name: "linkedin", icon: <Linkedin size={32} />, color: "bg-blue-600", link: "#" },
    { name: "discord", icon: <Disc size={32} />, color: "bg-indigo-500", link: "#" },
  ];

  return (
    <footer className="relative w-full min-h-screen overflow-hidden bg-black border-t-8 border-black flex items-center justify-center py-20">
      
      {/* --- CAMADA 1: Fundo do Quarto --- */}
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
      <div className="relative  z-10 container mx-auto flex flex-col items-center">
        
        <motion.h2 
    initial={{ y: -50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    
    className={`text-4xl md:text-6xl text-white text-center mt-[-59px] mb-29 drop-shadow-[0_5px_0_#000] ${markerFont.className}`}
>
    ENTRE EM CONTATO COMIGO
</motion.h2>

        {/* --- A TV INTERATIVA --- */}
        <div className="relative w-[320px] h-[240px] md:w-[600px] md:h-[450px] mb-12">
            
            {/* Tela Interna (O Personagem) */}
            <div className="absolute top-[-25%] bottom-[35%] left-[15%] right-[10%] z-10 bg-black rounded-[29px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredSocial}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={tvImages[hoveredSocial]}
                      alt="TV Character"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
            </div>

            {/* Efeito de Vidro e Scanlines da TV */}
            <div className="absolute top-[-15%] bottom-[40%] left-[19%] right-[13%] z-10 rounded-[60px] overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] opacity-60"></div>
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.7)]"></div>
            </div>
        </div>

        {/* --- ÍCONES SOCIAIS --- */}
        <div className="flex flex-wrap justify-center gap-6">
            {socials.map((social) => (
                <motion.a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredSocial(social.name as keyof typeof tvImages)}
                    onMouseLeave={() => setHoveredSocial("idle")}
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`${social.color} p-5 text-white rounded-2xl border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-none transition-all active:translate-y-2`}
                >
                    {social.icon}
                </motion.a>
            ))}
        </div>

        <p className={`text-gray-500 mt-16 text-lg ${markerFont.className}`}>
            © 2026 ZANVEXIS • FEITO COM CAOS E RUST
        </p>

      </div>
    </footer>
  );
}