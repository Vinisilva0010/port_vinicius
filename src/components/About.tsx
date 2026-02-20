"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Permanent_Marker, Patrick_Hand } from "next/font/google";
import Link from 'next/link';
// Configuração das fontes
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
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black border-t-4 sm:border-t-8 border-black py-8 sm:py-0">
      
      {/* --- CARROSSEL DE FUNDO --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={backgrounds[currentIndex].src}
              alt={backgrounds[currentIndex].alt}
              fill
              className="object-cover opacity-60"
              priority
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Overlay granulado */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none backdrop-blur-[2px]" />
      </div>

      {/* --- O CARD "SOBRE MIM" --- */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <motion.div
          initial={{ y: 100, opacity: 0, rotate: 5 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <motion.div
            // Animação de flutuar - Reduzida no mobile
            animate={{ 
              rotate: [-1, 1, -1],
              y: [0, -8, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 6, 
              ease: "easeInOut" 
            }}
            className="bg-[#fdfbf7] max-w-2xl w-full mx-auto p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border-4 sm:border-[6px] border-black shadow-[8px_8px_0px_0px_#000] sm:shadow-[15px_15px_0px_0px_#000] relative"
          >
          
          {/* TACHINHA */}
          <div className="absolute top-[-12px] sm:top-[-20px] left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-500 border-3 sm:border-4 border-black shadow-[2px_2px_0px_0px_#000] z-30"></div>

          {/* CABEÇALHO (Imagem do Título) */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative w-48 h-16 sm:w-64 sm:h-24 md:w-80 md:h-32 transform -rotate-2 hover:rotate-2 transition-transform">
              <Image 
                src="/about/titulo-sobre.png" 
                alt="Sobre Mim" 
                fill 
                className="object-contain" 
              />
            </div>
          </div>

          {/* TEXTO DO CARD */}
          <div className={`space-y-4 sm:space-y-6 text-black text-base sm:text-xl md:text-2xl leading-relaxed ${handFont.className}`}>
            <p>
              Fala! Eu sou o <span className={`text-purple-700 font-bold ${markerFont.className}`}>Vinícius</span>.
            </p>
            
            <p>
              Eu não faço "sitezinho" de template. Eu construo arquiteturas de alta performance com segurança nível bancário. Meu foco é resolver problemas complexos com código limpo, escalabilidade bruta e interfaces com um design simplesmente perfeito.
            </p>

            <div className="bg-yellow-200 p-3 sm:p-4 border-3 sm:border-4 border-black rounded-lg sm:rounded-xl rotate-1 shadow-[4px_4px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000]">
              <p className="font-bold text-sm sm:text-base md:text-lg">
                🛠️ O meu campo de batalha:
              </p>
              <ul className="list-disc pl-5 sm:pl-6 mt-2 space-y-1 text-sm sm:text-base md:text-lg">
                <li><strong>Web3 & Cripto:</strong> Smart Contracts, dApps e infraestrutura descentralizada.</li>
                <li><strong>Super Bots:</strong> Snipers, automações avançadas e robôs de alta precisão.</li>
                <li><strong>O Motor em Rust:</strong> Backends ultra-rápidos e blindados (porque performance não se negocia).</li>
                <li><strong>Apps Avançados:</strong> Front-ends imersivos, robustos e com uma UI/UX impecável.</li>
              </ul>
            </div>

            <p>
              Em todos os meus sistemas, a proteção é prioridade máxima. Não tem gambiarra, não tem brecha. E para colocar toda essa tecnologia de elite no mercado, eu fundei a <span className="font-bold underline decoration-wavy decoration-purple-500">Zanvexis</span>. Sou o criador e a mente técnica por trás dela, transformando ideias impossíveis em realidade.
            </p>
          </div>

          {/* BOTÃO DE AÇÃO */}
          <div className="mt-6 sm:mt-8 flex justify-center">
            {/* Usando Link para garantir o SEO e a navegação correta */}
            <Link 
              href="https://www.zanvexis.com/" 
              className={`px-6 sm:px-8 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white text-base sm:text-xl rounded-lg sm:rounded-xl border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_#000] transition-all active:translate-y-2 active:shadow-none ${markerFont.className}`}
            >
              Zanvexis 
            </Link>
          </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
