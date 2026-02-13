"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import { Hero } from "@/src/components/sections/Hero";
import { About } from "@/src/components/About";
import { Projetos } from "@/src/components/projetos";
import { TechTicker } from "@/src/components/TechTicker";
import { CloudTicker } from "@/src/components/CloudTicker";
import { WebProjects } from "@/src/components/WebProjects";
import { FullStackTicker } from "@/src/components/FullStackTicker";
import { BlogSection } from "@/src/components/BlogSection";
import { FooterSection } from "@/src/components/FooterSection";
import { LoadingScreen } from "@/src/components/LoadingScreen";

export default function Home() {
  // 1. DEFININDO O ESTADO QUE FALTAVA
  const [isLoading, setIsLoading] = useState(true);

  // 2. TRAVAR O SCROLL ENQUANTO CARREGA
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"; // Trava a rolagem
      window.scrollTo(0, 0); // Garante que começa no topo
    } else {
      document.body.style.overflow = "auto"; // Libera
    }
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      
      {/* --- A TELA DE CARREGAMENTO (VINÍCIUS EM PÂNICO) --- */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Dica: O conteúdo abaixo só aparece depois que o loading acabar (!isLoading).
         Isso evita que o site fique pesado rodando o 3D atrás da animação de loading.
      */}
      {!isLoading && (
        <>
          <Hero />
          
          <div className="relative z-50 my-[-10px]">
            <CloudTicker />
          </div>
          
          <About />
          
          <div className="relative z-50 mt-12 mb-12">
             <TechTicker />
          </div>
          
          <Projetos />
          
          <div className="relative z-50 mt-16 mb-24">
            <FullStackTicker />
          </div>
          
          <WebProjects />
          <BlogSection />
          <FooterSection />
        </>
      )}

    </main>
  );
}