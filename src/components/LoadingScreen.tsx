"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Permanent_Marker, JetBrains_Mono } from "next/font/google";

const titleFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const codeFont = JetBrains_Mono({ weight: "400", subsets: ["latin"] });

// --- FRASES PERSONALIZADAS DO VINÍCIUS ---
const funnyMessages = [
  "Vinícius está acordando o servidor...",
  "Compilando a gambiarra final...",
  "Opa, o Rust reclamou de novo...",
  "Injetando café no código...",
  "Segura! O Satoshi quase caiu...",
  "Vinícius está lendo a documentação (mentira)...",
  "Gerando bugs de alta qualidade...",
  "CARREGANDO O CAOS DA ZANVEXIS...",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // 1. Barra de Progresso Glitchy (Saltos aleatórios)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const jump = Math.floor(Math.random() * 15) + 1; // Salta de 1 a 15%
        const newProgress = prev + jump;
        
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 250);

    // 2. Troca de Frases
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % funnyMessages.length);
    }, 900);

    // 3. Tempo total (4.5 segundos de sofrimento)
    const completeTimeout = setTimeout(() => {
        onComplete();
    }, 4500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: "easeInOut" } }} // Sai subindo
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Scanline Fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(20,20,20,0.8)_50%)] bg-[length:100%_4px] pointer-events-none opacity-60 z-20"></div>

      {/* Container Tremendo */}
      <motion.div
        animate={{ 
            x: [-2, 2, -1, 3, 0], 
            y: [1, -2, 0, -1, 2] 
        }}
        transition={{ 
            repeat: Infinity, 
            duration: 0.15,
            ease: "linear"
        }}
        className="relative z-30 flex flex-col items-center max-w-lg px-4"
      >
        {/* Título de Erro */}
        <h1 className={`text-red-600 text-4xl md:text-6xl mb-6 animate-pulse drop-shadow-[4px_4px_0px_rgba(255,255,255,0.2)] ${titleFont.className}`}>
            SYSTEM OVERLOAD_
        </h1>

        {/* --- A SUA CARICATURA EM PÂNICO --- */}
        <div className="relative w-56 h-56 md:w-72 md:h-72 mb-8">
            <Image 
                src="/loading/vinicius-panic.png" // <-- SUA IMAGEM AQUI
                alt="Vinicius em Pânico" 
                fill 
                className="object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]"
            />
            {/* Efeito de Fumaça/Explosão atrás (CSS puro) */}
            <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 -z-10 animate-pulse"></div>
        </div>

        {/* Mensagens do Vinícius */}
        <div className={`h-12 flex items-center justify-center text-yellow-400 text-lg md:text-2xl text-center mb-6 px-4 ${codeFont.className}`}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={messageIndex}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    className="bg-black/50 px-2 rounded"
                >
                    {funnyMessages[messageIndex]}
                </motion.span>
            </AnimatePresence>
        </div>

        {/* Barra de Progresso Estilo "Danger" */}
        <div className="w-full h-8 bg-[#111] border-4 border-red-600 relative overflow-hidden">
            <motion.div 
                className="h-full bg-red-600 relative"
                style={{ width: `${progress}%` }}
                transition={{ type: "spring", damping: 15 }}
            >
                {/* Faixas de perigo na barra */}
                <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)]"></div>
            </motion.div>
            <p className={`absolute inset-0 flex items-center justify-center text-white text-sm font-black tracking-widest ${codeFont.className}`}>
                {progress}% CRITICAL
            </p>
        </div>

      </motion.div>
    </motion.div>
  );
}