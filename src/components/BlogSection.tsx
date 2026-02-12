"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Permanent_Marker, Creepster } from "next/font/google";
import { BrainCircuit, Cog, Bitcoin, BookOpen } from "lucide-react";

const markerFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const horrorFont = Creepster({ weight: "400", subsets: ["latin"] });

const scareImages = [
  "/blog/scare-1.png", // 0: Longe
  "/blog/scare-2.png", // 1: Médio
  "/blog/scare-3.png", // 2: Perto
  "/blog/scare-4.png", // 3: JUMP SCARE
];

const blogTopics = [
  {
    title: "INTELIGÊNCIA ARTIFICIAL",
    icon: <BrainCircuit size={40} className="text-red-500" />,
    desc: "O fim dos devs ou a nova era? Como a IA está reescrevendo o código.",
  },
  {
    title: "ECOSSISTEMA RUST",
    icon: <Cog size={40} className="text-orange-500" />,
    desc: "Performance e segurança: Por que Rust é o futuro do backend robusto.",
  },
  {
    title: "CRIPTO & WEB3",
    icon: <Bitcoin size={40} className="text-yellow-500" />,
    desc: "Além do hype: Smart contracts e a descentralização real.",
  },
];

export function BlogSection() {
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  
  const [stage, setStage] = useState(0);
  const [hasScaredThisTime, setHasScaredThisTime] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Detecta mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Carrossel automático no mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogTopics.length);
    }, 4000); // Troca a cada 4 segundos

    return () => clearInterval(interval);
  }, [isMobile]);

  // Jump Scare
  useEffect(() => {
    let timer1: NodeJS.Timeout, timer2: NodeJS.Timeout, timer3: NodeJS.Timeout;

    if (isInView && !hasScaredThisTime) {
      timer1 = setTimeout(() => setStage(1), 3000);
      timer2 = setTimeout(() => setStage(2), 7000);
      timer3 = setTimeout(() => {
        setStage(3);
        setHasScaredThisTime(true);
        setTimeout(() => setStage(2), 1200);
      }, 10000);
    } 

    if (!isInView) {
      setStage(0);
      setHasScaredThisTime(false);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isInView, hasScaredThisTime]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-12 sm:py-20 overflow-hidden bg-black border-t-4 sm:border-t-8 border-red-900"
    >
      
      {/* --- FUNDO EVOLUTIVO --- */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {stage < 3 && (
            <motion.div
              key={stage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <Image
                src={scareImages[stage]}
                alt="Fundo de Terror"
                fill
                className="object-cover opacity-60"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- JUMP SCARE OVERLAY --- */}
      <AnimatePresence>
        {stage === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
                opacity: 1, 
                scale: 1.2,
                x: [-20, 20, -20, 20, 0],
                y: [-10, 10, -10, 10, 0]
            }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 z-[100] bg-black flex items-center justify-center pointer-events-none"
          >
            <Image
                src={scareImages[3]}
                alt="JUMP SCARE"
                fill
                className="object-cover"
            />
            <motion.div 
                animate={{ opacity: [0.8, 0, 0.8, 0] }}
                transition={{ duration: 0.2, repeat: 3 }}
                className="absolute inset-0 bg-red-600 mix-blend-overlay" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CONTEÚDO DO BLOG --- */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        
        {/* Título */}
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="mb-8 sm:mb-12 md:mb-16"
        >
            <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-red-600 drop-shadow-[0_3px_0_rgba(0,0,0,1)] sm:drop-shadow-[0_5px_0_rgba(0,0,0,1)] leading-tight ${horrorFont.className}`}>
                O LADO SOMBRIO DA TECH
            </h2>
            <p className={`text-gray-400 mt-3 sm:mt-4 text-sm sm:text-lg md:text-xl px-4 ${markerFont.className}`}>
                // Blog Zanvexis: Segredos que a documentação oficial esconde.
            </p>
        </motion.div>

        {/* CARDS - Desktop: Grid | Mobile: Carrossel Horizontal */}
        <div className="mb-10 sm:mb-16">
          {/* Desktop: Grid normal */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {blogTopics.map((topic, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, borderColor: "#dc2626" }}
                    className="bg-black/80 border-3 sm:border-4 border-red-900/30 p-6 sm:p-8 rounded-xl sm:rounded-2xl relative overflow-hidden backdrop-blur-md"
                >
                    <div className="mb-4 sm:mb-6 flex justify-center">{topic.icon}</div>
                    <h3 className={`text-xl sm:text-2xl text-white mb-2 sm:mb-3 ${markerFont.className}`}>
                        {topic.title}
                    </h3>
                    <p className="text-gray-400 font-mono text-xs sm:text-sm leading-relaxed">
                        {topic.desc}
                    </p>
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                </motion.div>
            ))}
          </div>

          {/* Mobile: Carrossel horizontal com loop */}
          <div className="md:hidden relative overflow-hidden">
            <div className="flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="w-full max-w-sm mx-4"
                >
                  <div className="bg-black/80 border-3 border-red-900/30 p-6 rounded-xl relative overflow-hidden backdrop-blur-md">
                    <div className="mb-4 flex justify-center">
                      {blogTopics[currentSlide].icon}
                    </div>
                    <h3 className={`text-xl text-white mb-2 ${markerFont.className}`}>
                      {blogTopics[currentSlide].title}
                    </h3>
                    <p className="text-gray-400 font-mono text-sm leading-relaxed">
                      {blogTopics[currentSlide].desc}
                    </p>
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicadores de slide */}
            <div className="flex justify-center gap-2 mt-4">
              {blogTopics.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index 
                      ? "bg-red-600 w-6" 
                      : "bg-red-900/40"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Botão */}
        <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#991b1b" }}
            whileTap={{ scale: 0.9 }}
            className={`px-6 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white text-base sm:text-xl md:text-2xl border-3 sm:border-4 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] md:shadow-[8px_8px_0px_#000] rounded-lg sm:rounded-xl flex items-center gap-2 sm:gap-3 mx-auto ${markerFont.className}`}
        >
            <BookOpen size={20} className="sm:w-6 sm:h-6 md:w-7 md:h-7" />
            <span className="hidden sm:inline">LER O BLOG (SE TIVER CORAGEM)</span>
            <span className="sm:hidden">LER O BLOG</span>
        </motion.button>

      </div>
    </section>
  );
}
