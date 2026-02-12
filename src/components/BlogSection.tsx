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
  const sectionRef = useRef(null);
  // Detecta se a seção está visível na tela
  const isInView = useInView(sectionRef, { amount: 0.3 }); // 30% da seção visível para ativar
  
  const [stage, setStage] = useState(0);
  const [hasScaredThisTime, setHasScaredThisTime] = useState(false);

  useEffect(() => {
    let timer1: NodeJS.Timeout, timer2: NodeJS.Timeout, timer3: NodeJS.Timeout;

    if (isInView && !hasScaredThisTime) {
      // Começa a sequência quando o usuário entra na seção
      timer1 = setTimeout(() => setStage(1), 3000); // 3s aproxima
      timer2 = setTimeout(() => setStage(2), 7000); // 7s chega perto
      timer3 = setTimeout(() => {
        setStage(3); // 10s JUMP SCARE!
        setHasScaredThisTime(true);
        
        // Mantém o susto por 1.2s e depois volta para o monstro perto
        setTimeout(() => setStage(2), 1200);
      }, 10000);
    } 

    if (!isInView) {
      // RESET TOTAL quando o usuário sai da seção (rola para cima ou para baixo)
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
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden bg-black border-t-8 border-red-900"
    >
      
      {/* --- FUNDO EVOLUTIVO (Estágios 0, 1, 2) --- */}
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

      {/* --- JUMP SCARE OVERLAY (Estágio 3 - COBRE TUDO) --- */}
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
            {/* Flash Vermelho Intenso */}
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
        
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="mb-16"
        >
            <h2 className={`text-6xl md:text-8xl text-red-600 drop-shadow-[0_5px_0_rgba(0,0,0,1)] ${horrorFont.className}`}>
                O LADO SOMBRIO DA TECH
            </h2>
            <p className={`text-gray-400 mt-4 text-xl ${markerFont.className}`}>
                // Blog Zanvexis: Segredos que a documentação oficial esconde.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {blogTopics.map((topic, index) => (
                <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, borderColor: "#dc2626" }}
                    className="bg-black/80 border-4 border-red-900/30 p-8 rounded-2xl relative overflow-hidden backdrop-blur-md"
                >
                    <div className="mb-6">{topic.icon}</div>
                    <h3 className={`text-2xl text-white mb-3 ${markerFont.className}`}>
                        {topic.title}
                    </h3>
                    <p className="text-gray-400 font-mono text-sm leading-relaxed">
                        {topic.desc}
                    </p>
                    {/* Linhas de scanline estilo TV velha */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
                </motion.div>
            ))}
        </div>

        <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#991b1b" }}
            whileTap={{ scale: 0.9 }}
            className={`px-12 py-5 bg-red-700 text-white text-2xl border-4 border-black shadow-[8px_8px_0px_#000] rounded-xl flex items-center gap-3 mx-auto ${markerFont.className}`}
        >
            <BookOpen size={28} />
            LER O BLOG (SE TIVER CORAGEM)
        </motion.button>

      </div>
    </section>
  );
}