"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

// Array de vídeos que você pode adicionar mais conforme precisar
const VIDEOS = [
  {
    id: 1,
    title: "Video 1",
    youtubeId: "QVtV_r97h4Y",
  },
  {
    id: 2,
    title: "Video 2",
    youtubeId: "sGLtnZFak50",
  },
  {
    id: 3,
    title: "Video 3",
    youtubeId: "x6LtiItI_c8",
  },
  {
    id: 4,
    title: "Video 4",
    youtubeId: "0F2F3KwGSdc",
  },
  {
    id: 5,
    title: "Video 5",
    youtubeId: "uR1obI6dNCw",
  },
  {
    id: 6,
    title: "Video 6",
    youtubeId: "17ZJMqvdomw",
  },
];

export default function VideoPanel() {
  const containerRef = useRef<HTMLElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Mapeia o scroll na seção (150vh é o tamanho ideal para o efeito de subida)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // O fundo dá um leve zoom out para dar profundidade
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  // O painel vem lá de baixo e para no centro exato da tela
  const panelY = useTransform(scrollYProgress, [0, 1], ["50vh", "0vh"]);
  const panelScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  // Auto-play do carrossel
  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
    }, 6000); // Muda de vídeo a cada 6 segundos

    return () => clearInterval(interval);
  }, [isAutoplay]);

  const goToVideo = (index: number) => {
    setCurrentIndex(index);
    setIsAutoplay(false);
    
    // Volta ao auto-play após 10 segundos de inatividade
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % VIDEOS.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const currentVideo = VIDEOS[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] w-full bg-[#0A0A0A]"
    >
      {/* Sticky trava a tela enquanto o scroll acontece */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* LAYER 1: BACKGROUND ANIMADO (DRIFT & BREATHING) */}
        <motion.div
          style={{ scale: bgScale }}
          className="absolute inset-0 z-[1] pointer-events-none select-none opacity-40 overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              x: ["0%", "1%", "-1%", "0%"],
              y: ["0%", "-1%", "1%", "0%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full h-full"
          >
            <Image
              src="/alien-bg.webp"
              alt="Alien Tech Background"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
        </motion.div>

        {/* PAINEL DO CARROSSEL */}
        <motion.div
          style={{ y: panelY, scale: panelScale }}
          className="relative z-[10] w-[90%] md:w-[70%] max-w-[1200px] border-[6px] md:border-[8px] border-black bg-[#9945FF] p-2 md:p-6 rounded-xl shadow-[15px_15px_0px_0px_#000]"
        >
          {/* Estética do topo do painel */}
          <div className="flex justify-between items-center mb-4 px-2">
            <div className="flex gap-3">
              <div className="w-4 h-4 rounded-full bg-[#14F195] border-2 border-black animate-pulse"></div>
              <div className="w-4 h-4 rounded-full bg-black"></div>
              <div className="w-4 h-4 rounded-full bg-black"></div>
            </div>
            <h3
              className="text-black font-black uppercase tracking-widest text-sm md:text-xl"
              style={{ fontFamily: "var(--font-fira)" }}
            >
               supertean - google cloud 
            </h3>
          </div>

          {/* CONTAINER DO VÍDEO */}
          <div className="relative w-full aspect-video border-[6px] border-black bg-zinc-900 overflow-hidden rounded-lg">
            <iframe
              className="relative z-[2] w-full h-full"
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?modestbranding=1&rel=0&showinfo=0`}
              title={currentVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* INDICADORES DO CARROSSEL */}
          <div className="flex justify-center items-center gap-3 mt-6">
            {VIDEOS.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToVideo(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 h-3 bg-[#14F195] border-2 border-black"
                    : "w-3 h-3 bg-black border-2 border-[#14F195]"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>

          {/* CONTROLES DE NAVEGAÇÃO */}
          <div className="flex justify-between items-center mt-6 px-2">
            {/* BOTÃO ANTERIOR */}
            <motion.button
              onClick={goToPrev}
              className="flex items-center justify-center w-12 h-12 bg-black border-3 border-[#14F195] rounded-lg text-[#14F195] font-black text-xl hover:bg-[#14F195] hover:text-black transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ←
            </motion.button>

            {/* INFO DO VÍDEO ATUAL */}
            <div className="flex-1 text-center">
              <p className="text-black font-black uppercase tracking-widest text-sm md:text-base">
                {currentIndex + 1} / {VIDEOS.length}
              </p>
              <p className="text-black font-mono text-xs mt-1">
                {isAutoplay ? "▶ AUTO" : "⏸ PAUSED"}
              </p>
            </div>

            {/* BOTÃO PRÓXIMO */}
            <motion.button
              onClick={goToNext}
              className="flex items-center justify-center w-12 h-12 bg-black border-3 border-[#14F195] rounded-lg text-[#14F195] font-black text-xl hover:bg-[#14F195] hover:text-black transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}