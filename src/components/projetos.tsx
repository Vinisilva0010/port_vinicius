"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { MoveLeft, MoveRight, Github, Cpu, Terminal, X } from "lucide-react";
import { Permanent_Marker, JetBrains_Mono, Patrick_Hand } from "next/font/google";

const titleFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const codeFont = JetBrains_Mono({ weight: "400", subsets: ["latin"] });
const handFont = Patrick_Hand({ weight: "400", subsets: ["latin"] });

// IMPORTANTE: NÃO usar window aqui (quebra no SSR). Escalamos só via CSS.
const satoshiVariants = {
  hidden: (c: number) => ({
    x: c % 2 === 0 ? "-150%" : "150%",
    y: c < 2 ? "-150%" : "150%",
    opacity: 0,
    scale: 0.5,
    rotate: c % 2 === 0 ? -45 : 45,
  }),
  visible: {
    x: "0%",
    y: "0%",
    opacity: 1,
    scale: 1.2,
    rotate: 0,
    transition: { type: "spring" as const, damping: 12, stiffness: 120 },
  },
  exit: () => ({
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.2 },
  }),
};

const projects = [
  {
    id: 1,
    title: "Solana Sniper Bot",
    desc: "Bot Rust de alta frequência. Monitora mempool e compra em <200ms.",
    techs: ["Rust", "Tokio", "Solana SDK"],
    github: "https://github.com/Vinisilva0010",
    image: "/projects/card-bot.png",
    details:
      "Algoritmo de front-running ético para proteção de liquidez. Usa arquitetura Event-Driven para reagir a blocos em milissegundos.",
  },
  {
    id: 2,
    title: "DeFi Auto-Staker",
    desc: "Smart Contract de juros compostos. Auditoria 100% aprovada.",
    techs: ["Solidity", "Hardhat", "Next.js"],
    github: "https://github.com/Vinisilva0010",
    image: "/projects/card-defi.png",
    details:
      "Contrato inteligente auditado com sistema de Rebase automático. Otimizado para reduzir taxas de gás na rede Ethereum.",
  },
  {
    id: 3,
    title: "Rust Chain Indexer",
    desc: "Indexador ultra-rápido para EVM. Milhares de tx/s sem delay.",
    techs: ["Rust", "Postgres", "gRPC"],
    github: "https://github.com/Vinisilva0010",
    image: "/projects/card-indexer.png",
    details:
      "Sistema capaz de indexar milhões de eventos de blockchain em tempo real. Utiliza paralelismo do Rust para máxima performance.",
  },
];

export function Projetos() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 90 };
  const rotateXRange = isMobile ? [16, -16] : [10, -10];
  const rotateYRange = isMobile ? [-20, 20] : [-10, 10];

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], rotateXRange), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], rotateYRange), springConfig);

  const [currIndex, setCurrIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [showSatoshi, setShowSatoshi] = useState(false);
  const [satoshiCorner, setSatoshiCorner] = useState(0);

  const nextProject = () => setCurrIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () =>
    setCurrIndex((prev) => (prev - 1 + projects.length) % projects.length);

  // autoplay dos cards
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      if (!showDetails) nextProject();
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, showDetails]);

  // satoshi random
  useEffect(() => {
    const triggerSatoshi = () => {
      setSatoshiCorner(Math.floor(Math.random() * 4));
      setShowSatoshi(true);
      setTimeout(() => setShowSatoshi(false), 1500);
      const nextTime = Math.random() * 5000 + 5000;
      setTimeout(triggerSatoshi, nextTime);
    };
    const initialTimer = setTimeout(triggerSatoshi, 3000);
    return () => clearTimeout(initialTimer);
  }, []);

  // mouse desktop
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // touch mobile (ainda funciona, mas tem 360 automático)
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (touch.clientX - left) / width - 0.5;
    const y = (touch.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // 360 automático no mobile
  useEffect(() => {
    if (!isMobile) return;

    let frameId: number;
    const start = performance.now();

    const loop = (t: number) => {
      const elapsed = (t - start) / 1000;
      const autoY = Math.sin(elapsed * 0.25); // gira devagar em Y
      const autoX = Math.cos(elapsed * 0.2) * 0.4; // balança de leve em X
      mouseX.set(autoY);
      mouseY.set(autoX);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isMobile, mouseX, mouseY]);

  return (
    <section
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full h-screen md:min-h-screen overflow-hidden bg-black flex items-center justify-center border-t-8 border-black"
      style={{ perspective: isMobile ? "900px" : "1000px" }}
    >
      {/* LABORATÓRIO 3D */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full origin-center"
      >
        {/* FUNDO */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            width: isMobile ? "150vw" : "200vw",
            height: isMobile ? "150vh" : "150vh",
            transform: isMobile
              ? "translateZ(-260vh) scale(2.8)"
              : "translateZ(-150vh) scale(2)",
          }}
        >
          <Image
            src="/projects/wall2.png"
            alt="Lab Wall"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* CHÃO */}
        <div
          className="absolute origin-bottom z-10"
          style={{
            transform: "rotateX(90deg)",
            bottom: isMobile ? "-60%" : "-40%",
            left: isMobile ? "-120%" : "-50%",
            width: isMobile ? "330%" : "200%",
            height: isMobile ? "220vh" : "200vh",
          }}
        >
          <Image
            src="/projects/floor2.png"
            alt="Lab Floor"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </div>

        {/* TETO */}
        <div
          className="absolute origin-top z-10"
          style={{
            transform: "rotateX(-90deg)",
            top: isMobile ? "-60%" : "-40%",
            left: isMobile ? "-120%" : "-50%",
            width: isMobile ? "330%" : "200%",
            height: isMobile ? "220vh" : "200vh",
          }}
        >
          <Image
            src="/projects/ceiling2.png"
            alt="Lab Ceiling"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-transparent to-transparent" />
        </div>

        {/* PAREDE ESQUERDA */}
        <div
          className="absolute origin-left z-10"
          style={{
            transform: "rotateY(90deg)",
            top: isMobile ? "-110%" : "-50%",
            left: isMobile ? "-60%" : "-30%",
            width: isMobile ? "220vh" : "200vh",
            height: isMobile ? "320%" : "200%",
          }}
        >
          <Image
            src="/projects/left-wall2.png"
            alt="Lab Left"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-transparent" />
        </div>

        {/* PAREDE DIREITA */}
        <div
          className="absolute origin-right z-10"
          style={{
            transform: "rotateY(-90deg)",
            top: isMobile ? "-110%" : "-50%",
            right: isMobile ? "-60%" : "-30%",
            width: isMobile ? "220vh" : "200vh",
            height: isMobile ? "320%" : "200%",
          }}
        >
          <Image
            src="/projects/right-wall2.png"
            alt="Lab Right"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-transparent to-transparent" />
        </div>

        {/* SATOSHI */}
        <AnimatePresence>
          {showSatoshi && (
            <motion.div
              custom={satoshiCorner}
              variants={satoshiVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`absolute z-30 w-32 h-32 md:w-80 md:h-80 pointer-events-none
                ${
                  satoshiCorner === 0
                    ? "top-[15%] left-0 md:top-[10%] md:left-[10%]"
                    : ""
                }
                ${
                  satoshiCorner === 1
                    ? "top-[15%] right-0 md:top-[10%] md:right-[10%]"
                    : ""
                }
                ${
                  satoshiCorner === 2
                    ? "bottom-[15%] left-0 md:bottom-[10%] md:left-[10%]"
                    : ""
                }
                ${
                  satoshiCorner === 3
                    ? "bottom-[15%] right-0 md:bottom-[10%] md:right-[10%]"
                    : ""
                }
              `}
              style={{ transform: "translateZ(-50px)" }}
            >
              <Image
                src="/blockchain/satoshi1.png"
                alt="Satoshi Nakamoto"
                fill
                className="object-contain drop-shadow-[10px_10px_0px_rgba(0,0,0,0.8)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* TÍTULO */}
        <div
          className="absolute top-6 md:top-20 left-0 w-full flex justify-center z-50 pointer-events-none px-4"
          style={{ transform: isMobile ? "translateZ(60px)" : "translateZ(50px)" }}
        >
          <div className="bg-[#111] border-3 md:border-4 border-orange-500 p-3 md:p-6 rounded-xl shadow-[4px_4px_0px_#ea580c] text-center max-w-2xl transform -rotate-1 w-full md:w-auto">
            <h2
              className={`text-2xl md:text-5xl text-white mb-1 md:mb-2 ${titleFont.className}`}
            >
              LAB <span className="text-orange-500">BLOCKCHAIN</span>
            </h2>
            <p
              className={`text-gray-300 text-xs md:text-base ${codeFont.className}`}
            >
              // DApps, Bots e Smart Contracts de alta performance.
            </p>
          </div>
        </div>

        {/* CARROSSEL */}
        <div
          className="absolute inset-0 flex items-center justify-center z-40"
          style={{ transform: "translateZ(-80px)" }}
        >
          {/* Setas */}
          <div className="w-full max-w-6xl px-2 md:px-4 flex justify-between items-center absolute z-50 pointer-events-none">
            <button
              onClick={prevProject}
              className="pointer-events-auto p-2 md:p-4 bg-orange-600 rounded-full border-2 md:border-4 border-black shadow-[2px_2px_0px_black] hover:scale-110 transition-transform text-white"
            >
              <MoveLeft size={20} className="md:w-8 md:h-8" strokeWidth={3} />
            </button>
            <button
              onClick={nextProject}
              className="pointer-events-auto p-2 md:p-4 bg-orange-600 rounded-full border-2 md:border-4 border-black shadow-[2px_2px_0px_black] hover:scale-110 transition-transform text-white"
            >
              <MoveRight size={20} className="md:w-8 md:h-8" strokeWidth={3} />
            </button>
          </div>

          {/* CARD */}
          <div className="w-[90vw] h-[60vh] md:w-[500px] md:h-[650px] relative perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={projects[currIndex].id}
                initial={{ scale: 0, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-full h-full bg-[#1a1a1a] border-[4px] md:border-[6px] border-black rounded-3xl overflow-hidden shadow-[10px_10px_0px_rgba(0,0,0,0.8)] md:shadow-[20px_20px_0px_rgba(0,0,0,0.8)] relative flex flex-col pointer-events-auto group"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ type: "spring", damping: 20, stiffness: 100 }}
                      className="absolute inset-0 z-50 bg-[#fff9c4] p-6 md:p-8 border-t-8 border-black flex flex-col"
                      style={{
                        backgroundImage:
                          "linear-gradient(#aad4ff 1px, transparent 1px)",
                        backgroundSize: "100% 1.5rem",
                      }}
                    >
                      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-red-400 opacity-40" />
                      <div className="flex justify-between items-start mb-4 pl-4 md:pl-6 relative z-10">
                        <h4
                          className={`text-xl md:text-2xl text-black underline ${titleFont.className}`}
                        >
                          CONFIDENCIAL:
                        </h4>
                        <button
                          onClick={() => setShowDetails(false)}
                          className="p-1 md:p-2 bg-red-600 text-white border-2 border-black rounded-full"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="pl-4 md:pl-6 relative z-10 overflow-y-auto custom-scrollbar h-full">
                        <p
                          className={`text-gray-800 text-lg md:text-xl leading-[1.5rem] ${handFont.className}`}
                        >
                          {projects[currIndex].details}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Imagem */}
                <div className="h-[40%] md:h-[45%] w-full bg-gray-800 relative border-b-[4px] md:border-b-[6px] border-black">
                  <div className="absolute inset-0 flex items-center justify-center bg-orange-900/20">
                    <Cpu size={60} className="text-orange-500/30" />
                  </div>
                  <Image
                    src={projects[currIndex].image}
                    alt="Project Image"
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-yellow-400 border-2 md:border-4 border-black px-2 py-1 text-black font-black text-xs transform rotate-3 z-10">
                    v1.0.0
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 p-4 md:p-8 flex flex-col bg-[#222]">
                  <div className="flex items-center gap-2 mb-2 md:mb-4">
                    <Terminal className="text-orange-500" size={20} />
                    <h3
                      className={`text-xl md:text-3xl text-white ${titleFont.className}`}
                    >
                      {projects[currIndex].title}
                    </h3>
                  </div>

                  <p
                    className={`text-gray-400 text-xs md:text-sm leading-relaxed mb-4 flex-1 ${codeFont.className}`}
                  >
                    {projects[currIndex].desc}
                  </p>

                  <div className="flex flex-wrap gap-1 md:gap-2 mb-4">
                    {projects[currIndex].techs.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 bg-orange-500/20 border border-orange-500 text-orange-400 text-[10px] md:text-xs font-bold rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 md:gap-4 mt-auto">
                    <button
                      onClick={() => setShowDetails(true)}
                      className="flex items-center justify-center gap-1 md:gap-2 py-3 md:py-4 bg-orange-600 text-white font-black border-2 md:border-4 border-black shadow-[3px_3px_0px_black] active:translate-y-1 active:shadow-none transition-all rounded-lg md:rounded-xl text-xs md:text-base"
                    >
                      DETALHES
                    </button>
                    <a
                      href={projects[currIndex].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 md:gap-2 py-3 md:py-4 bg-[#333] text-white font-bold border-2 md:border-4 border-black shadow-[3px_3px_0px_black] active:translate-y-1 active:shadow-none transition-all rounded-lg md:rounded-xl text-xs md:text-base"
                    >
                      <Github size={16} /> CODE
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
