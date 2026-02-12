"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Permanent_Marker, Patrick_Hand } from "next/font/google"; // Fontes estilo cartoon

// Configuração das fontes (O Next.js baixa automaticamente)
const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handFont = Patrick_Hand({ weight: "400", subsets: ["latin"] });

const backgrounds = [
  { src: "/about/bg-crypto.png", alt: "Cripto & Blockchain Chaos" },
  { src: "/about/bg-ai.png", alt: "Artificial Intelligence Brains" },
  { src: "/about/bg-gaming.png", alt: "Retro Gaming Vibe" },
];

export function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Troca a imagem de fundo a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black border-t-8 border-black">
      
      {/* --- CARROSSEL DE FUNDO --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }} // Transição suave entre os mundos
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={backgrounds[currentIndex].src}
              alt={backgrounds[currentIndex].alt}
              fill
              className="object-cover opacity-60" // Opacidade para não brigar com o texto
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay granulado para dar textura de TV antiga/papel */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none backdrop-blur-[2px]" />
      </div>

      {/* --- O CARD "SOBRE MIM" --- */}
      <div className="relative z-20 container mx-auto px-4 flex justify-center items-center">
        <motion.div
          initial={{ y: 100, opacity: 0, rotate: 5 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }} // Entra tortinho
          transition={{ type: "spring", bounce: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            // Animação contínua de "flutuar" meio trêmulo
            animate={{ 
              rotate: [-2, 2, -2],
              y: [0, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6, 
              ease: "easeInOut" 
            }}
            className="bg-[#fdfbf7] max-w-2xl w-full p-8 md:p-12 rounded-3xl border-[6px] border-black shadow-[15px_15px_0px_0px_#000] relative"
          >
          
          {/* TACHINHA (Detalhe visual segurando o papel) */}
          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-red-500 border-4 border-black shadow-[2px_2px_0px_0px_#000] z-30"></div>

          {/* CABEÇALHO (Imagem do Título) */}
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-24 md:w-80 md:h-32 transform -rotate-2 hover:rotate-2 transition-transform">
              <Image 
                src="/about/titulo-sobre.png" 
                alt="Sobre Mim" 
                fill 
                className="object-contain" 
              />
            </div>
          </div>

          {/* TEXTO DO CARD */}
          <div className={`space-y-6 text-black text-xl md:text-2xl leading-relaxed ${handFont.className}`}>
            <p>
              Fala! Eu sou o <span className={`text-purple-700 font-bold ${markerFont.className}`}>Vinícius</span>.
            </p>
            
            <p>
              Não sou só mais um dev. Sou o fundador da <span className="font-bold underline decoration-wavy decoration-purple-500">Zanvexis</span>. 
              Minha missão é simples: pegar a complexidade da tecnologia e transformar em algo que sua avó conseguiria usar (mas com um backend que a NASA invejaria).
            </p>

            <div className="bg-yellow-200 p-4 border-4 border-black rounded-xl rotate-1 shadow-[5px_5px_0px_0px_#000]">
              <p className="font-bold">
                🛠️ O que eu faço?
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Automação com IA (pra você trabalhar menos)</li>
                <li>Blockchain & Web3 (o futuro do dinheiro)</li>
                <li>Games & Experiências Interativas</li>
              </ul>
            </div>

            <p>
              Se você quer algo padrão, contrate uma agência. Se quer o futuro, 
              <span className={`text-purple-700 ml-2 ${markerFont.className}`}>fala comigo.</span>
            </p>
          </div>

          {/* BOTÃO DE AÇÃO NO FINAL DO CARD */}
          <div className="mt-8 flex justify-center">
            <button className={`px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white text-xl rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all active:translate-y-2 active:shadow-none ${markerFont.className}`}>
              VER MEUS PROJETOS
            </button>
          </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}