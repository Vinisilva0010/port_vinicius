"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github } from "lucide-react";
import { Permanent_Marker, Patrick_Hand } from "next/font/google";

const titleFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handFont = Patrick_Hand({ weight: "400", subsets: ["latin"] });

const webProjects = [
  {
    id: 1,
    title: "Excel Zanvexis",
    desc: "Planilha inteligente com suporte a fórmulas e IA.",
    github: "https://github.com/Vinisilva0010",
    image: "/web/project-excel.png" 
  },
  {
    id: 2,
    title: "Fluency Master",
    desc: "App de inglês com avatares animados e ElevenLabs.",
    github: "https://github.com/Vinisilva0010",
    image: "/web/project-fluency.png"
  },
  {
    id: 3,
    title: "3D Marketing Persona",
    desc: "Sites com personalidades únicas e interações 3D imersivas.",
    github: "https://github.com/Vinisilva0010",
    image: "/web/project-3d.png"
  },
];

export function WebProjects() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 50, stiffness: 80 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig); 
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  
  const [showDetails, setShowDetails] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  const handleDetonation = () => {
    if (isExploding) return;
    setIsExploding(true);
    setShowDetails(false); 
    
    setTimeout(() => {
      setCurrIndex((prev) => (prev + 1) % webProjects.length);
      setIsExploding(false);
    }, 300);
  };

  return (
    <section 
      onMouseMove={(e) => {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - left) / width - 0.5);
        mouseY.set((e.clientY - top) / height - 0.5);
      }}
      className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center border-t-8 border-black"
      style={{ perspective: "1500px" }}
    >
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full h-full origin-center">
        
        {/* --- CENÁRIO (SUAS MÉTRICAS PRESERVADAS) --- */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] z-0" style={{ transform: "translateZ(-150vh) scale(1.8)" }}>
          <Image src="/web/wall3.png" alt="Studio Wall" fill className="object-cover brightness-50" priority />
        </div>
        <div className="absolute bottom-[-40%] left-[-50%] w-[200%] h-[150vh] origin-bottom z-10" style={{ transform: "rotateX(90deg)" }}>
          <Image src="/web/floor3.png" alt="Studio Floor" fill className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>
        <div className="absolute top-[-41%] left-[-50%] w-[200%] h-[150vh] origin-top z-10" style={{ transform: "rotateX(-90deg)" }}>
          <Image src="/web/ceiling3.png" alt="Studio Ceiling" fill className="object-cover brightness-50" />
        </div>
        <div className="absolute top-[-50%] left-[-41%] w-[150vh] h-[200%] origin-left z-10" style={{ transform: "rotateY(90deg)" }}>
          <Image src="/web/left-wall3.png" alt="Studio Left" fill className="object-cover brightness-75" />
        </div>
        <div className="absolute top-[-50%] right-[-40%] w-[150vh] h-[200%] origin-right z-10" style={{ transform: "rotateY(-90deg)" }}>
          <Image src="/web/right-wall3.png" alt="Studio Right" fill className="object-cover brightness-75" />
        </div>

        {/* --- DESCRIÇÃO --- */}
        <div className="absolute top-10 w-full flex justify-center z-50 pointer-events-none" style={{ transform: "translateZ(100px)" }}>
            <div className="bg-purple-700 border-4 border-black p-4 md:p-6 rounded-2xl shadow-[8px_8px_0px_#000] text-center max-w-2xl rotate-[-1deg]">
                <h2 className={`text-4xl text-white ${titleFont.className}`}>SOLUÇÕES WEB & 3D</h2>
                <p className={`text-purple-100 ${handFont.className} text-xl mt-2 leading-tight`}>
                    Apps Web, Lojas, Deliveries, Marketplaces, E-commerce e Sites 3D com alma e marketing de alto impacto.
                </p>
            </div>
        </div>

        {/* --- CONTAINER INTERATIVO (AGORA EM Z-100) --- */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center z-[100] gap-10 pointer-events-none" 
          style={{ transform: "translateZ(50px)" }}
        >
            {/* O CARD */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currIndex}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ 
                        scale: isExploding ? 1.5 : 1, 
                        opacity: 1, 
                        filter: isExploding ? "brightness(5)" : "brightness(1)",
                        rotate: isExploding ? [0, -5, 5, 0] : 0
                    }}
                    exit={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-auto w-[450px] h-[600px] bg-white border-[6px] border-black rounded-[40px] shadow-[20px_20px_0px_#000] overflow-hidden flex flex-col relative"
                >
                    <div className="h-1/2 w-full bg-gray-200 border-b-4 border-black relative">
                        <Image src={webProjects[currIndex].image} alt="Projeto" fill className="object-cover" />
                    </div>

                    <div className="p-8 flex flex-col flex-1 bg-[#f9f9f9] relative">
                        <AnimatePresence>
                            {showDetails && (
                                <motion.div
                                    initial={{ x: "100%", opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: "100%", opacity: 0 }}
                                    className="absolute inset-0 z-50 bg-[#fff9c4] p-8 border-l-4 border-black"
                                    style={{ 
                                        backgroundImage: "linear-gradient(#aad4ff 1px, transparent 1px)",
                                        backgroundSize: "100% 1.5rem",
                                    }}
                                >
                                    <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-red-400 opacity-50" />
                                    <div className="relative z-10">
                                        <h4 className={`text-2xl text-black mb-4 underline ${titleFont.className}`}>Notas:</h4>
                                        <p className={`text-gray-800 text-lg leading-[1.5rem] ${handFont.className}`}>
                                            Este projeto foi desenvolvido com foco em alta performance e UX. Na Zanvexis, priorizamos o resultado final e a experiência do usuário.
                                        </p>
                                        <button onClick={(e) => { e.stopPropagation(); setShowDetails(false); }} className="mt-8 text-sm font-black text-red-600 hover:underline">
                                            [ FECHAR ]
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <h3 className={`text-3xl text-black mb-4 ${titleFont.className}`}>{webProjects[currIndex].title}</h3>
                        <p className={`text-gray-700 mb-6 flex-1 text-lg ${handFont.className}`}>{webProjects[currIndex].desc}</p>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <button 
                                onClick={() => setShowDetails(!showDetails)}
                                className="py-3 bg-purple-600 text-white font-bold border-4 border-black shadow-[4px_4px_0px_#000] rounded-xl transition-all active:translate-y-1 active:shadow-none"
                            >
                                DETALHES
                            </button>
                            <a href={webProjects[currIndex].github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center py-3 bg-black text-white font-bold border-4 border-black shadow-[4px_4px_0px_#000] rounded-xl active:translate-y-1 active:shadow-none">
                                GITHUB
                            </a>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* --- O DETONADOR (BOTÃO DE TROCA TURBO) --- */}
<div 
    className="pointer-events-auto w-56 h-56 cursor-pointer group relative flex flex-col items-center"
    onClick={handleDetonation}
>
    {/* Balão de Grito (Sempre visível e animado) */}
    <motion.div 
        animate={{ 
            y: [0, -8, 0],
            rotate: [-2, 3, -2] 
        }}
        transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut"
        }}
        className={`absolute -top-16 bg-yellow-400 border-4 border-black px-4 py-2 rounded-xl shadow-[6px_6px_0px_#000] z-[110] ${titleFont.className} text-black text-lg whitespace-nowrap transform`}
    >
        ¡APERTE AQUI! 💥
        {/* Triângulo do balão de fala (o biquinho embaixo) */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-black"></div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-yellow-400"></div>
    </motion.div>

    {/* O Detonador Pulsando */}
    <motion.div 
        animate={{ 
            scale: [1, 1.08, 1],
            rotate: [0, -1, 1, 0]
        }}
        transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
        }}
        whileHover={{ 
            scale: 1.2, 
            rotate: 5,
            filter: "brightness(1.2)"
        }} 
        whileTap={{ scale: 0.8, y: 15 }} 
        className="w-full h-full relative"
    >
        <Image 
            src="/web/detonador.png" 
            alt="Detonador" 
            fill 
            className="object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]" 
        />
    </motion.div>
    
    {/* Sombra no chão do detonador para dar volume */}
    <div className="absolute bottom-4 w-24 h-6 bg-black/40 blur-md rounded-full -z-10" />
</div>
        </div>

      </motion.div>
    </section>
  );
}