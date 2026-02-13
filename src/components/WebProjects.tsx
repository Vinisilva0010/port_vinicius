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
import { Permanent_Marker, Patrick_Hand } from "next/font/google";

const titleFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const handFont = Patrick_Hand({ weight: "400", subsets: ["latin"] });

const webProjects = [
  {
    id: 1,
    title: "Excel Zanvexis",
    desc: "Planilha inteligente com suporte a fórmulas e IA.",
    github: "https://github.com/Vinisilva0010",
    image: "/web/project-excel.png",
  },
  {
    id: 2,
    title: "Fluency Master",
    desc: "App de inglês com avatares animados e ElevenLabs.",
    github: "https://github.com/Vinisilva0010",
    image: "/web/project-fluency.png",
  },
  {
    id: 3,
    title: "3D Marketing Persona",
    desc: "Sites com personalidades únicas e interações 3D imersivas.",
    github: "https://github.com/Vinisilva0010",
    image: "/web/project-3d.png",
  },
];

export function WebProjects() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs: mais suaves no mobile
  const springConfig = isMobile
    ? { damping: 60, stiffness: 60 }
    : { damping: 50, stiffness: 80 };

  const rotateXRange = isMobile ? [14, -14] : [10, -10];
  const rotateYRange = isMobile ? [-18, 18] : [-15, 15];

  const rotateX = useSpring(useTransform(mouseY, [-1, 1], rotateXRange), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], rotateYRange), springConfig);

  const [showDetails, setShowDetails] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [isExploding, setIsExploding] = useState(false);

  // Mouse (desktop)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Touch (mobile) – tilt manual, sem 360 automático
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    const touch = e.touches[0];
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    const x = (touch.clientX - left) / width - 0.5;
    const y = (touch.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

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
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className="relative w-full min-h-screen overflow-hidden bg-black flex items-center justify-center border-t-4 sm:border-t-8 border-black py-8 sm:py-0"
      style={{ perspective: isMobile ? "900px" : "1500px" }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative w-full h-full min-h-screen origin-center"
      >
        {/* --- CENÁRIO 3D --- */}

        {/* FUNDO */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
          style={{
            width: isMobile ? "130vw" : "100vw",
            height: isMobile ? "130vh" : "100vh",
            transform: isMobile
              ? "translateZ(-220vh) scale(2.2)"
              : "translateZ(-150vh) scale(1.8)",
          }}
        >
          <Image
            src="/web/wall3.png"
            alt="Studio Wall"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>

        {/* CHÃO */}
        <div
          className="absolute origin-bottom z-10"
          style={{
            transform: "rotateX(90deg)",
            bottom: isMobile ? "-55%" : "-40%",
            left: isMobile ? "-100%" : "-50%",
            width: isMobile ? "280%" : "200%",
            height: isMobile ? "190vh" : "150vh",
          }}
        >
          <Image
            src="/web/floor3.png"
            alt="Studio Floor"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* TETO */}
        <div
          className="absolute origin-top z-10"
          style={{
            transform: "rotateX(-90deg)",
            top: isMobile ? "-55%" : "-41%",
            left: isMobile ? "-100%" : "-50%",
            width: isMobile ? "280%" : "200%",
            height: isMobile ? "190vh" : "150vh",
          }}
        >
          <Image
            src="/web/ceiling3.png"
            alt="Studio Ceiling"
            fill
            className="object-cover brightness-50"
          />
        </div>

        {/* PAREDE ESQUERDA */}
        <div
          className="absolute origin-left z-10"
          style={{
            transform: "rotateY(90deg)",
            top: isMobile ? "-100%" : "-50%",
            left: isMobile ? "-50%" : "-41%",
            width: isMobile ? "200vh" : "150vh",
            height: isMobile ? "280%" : "200%",
          }}
        >
          <Image
            src="/web/left-wall3.png"
            alt="Studio Left"
            fill
            className="object-cover brightness-75"
          />
        </div>

        {/* PAREDE DIREITA */}
        <div
          className="absolute origin-right z-10"
          style={{
            transform: "rotateY(-90deg)",
            top: isMobile ? "-100%" : "-50%",
            right: isMobile ? "-50%" : "-40%",
            width: isMobile ? "200vh" : "150vh",
            height: isMobile ? "280%" : "200%",
          }}
        >
          <Image
            src="/web/right-wall3.png"
            alt="Studio Right"
            fill
            className="object-cover brightness-75"
          />
        </div>

        {/* --- DESCRIÇÃO --- */}
        <div
          className="absolute top-4 sm:top-10 w-full flex justify-center z-50 pointer-events-none px-4"
          style={{ transform: isMobile ? "translateZ(60px)" : "translateZ(100px)" }}
        >
          <div className="bg-purple-700 border-3 sm:border-4 border-black p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000] text-center max-w-2xl rotate-[-1deg] w-full sm:w-auto">
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl text-white ${titleFont.className}`}
            >
              SOLUÇÕES WEB & 3D
            </h2>
            <p
              className={`text-purple-100 ${handFont.className} text-sm sm:text-lg md:text-xl mt-1 sm:mt-2 leading-tight`}
            >
              Apps Web, Lojas, Deliveries, Marketplaces, E-commerce e Sites 3D com alma e
              marketing de alto impacto.
            </p>
          </div>
        </div>

        {/* --- CONTAINER INTERATIVO --- */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center z-[100] gap-6 sm:gap-10 pointer-events-none px-4 pt-32 sm:pt-0"
          style={{ transform: "translateZ(50px)" }}
        >
          {/* CARD */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currIndex}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: isExploding ? 1.3 : 1, // menos agressivo
                opacity: 1,
                filter: isExploding ? "brightness(2)" : "brightness(1)",
                rotate: isExploding ? [0, -3, 3, 0] : 0,
              }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="pointer-events-auto w-full max-w-[340px] sm:max-w-[400px] md:max-w-[450px] h-auto sm:h-[550px] md:h-[600px] bg-white border-4 sm:border-[6px] border-black rounded-3xl sm:rounded-[40px] shadow-[10px_10px_0px_#000] sm:shadow-[20px_20px_0px_#000] overflow-hidden flex flex-col relative"
            >
              <div className="h-48 sm:h-64 md:h-80 w-full bg-gray-200 border-b-3 sm:border-b-4 border-black relative">
                <Image
                  src={webProjects[currIndex].image}
                  alt="Projeto"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 sm:p-6 md:p-8 flex flex-col flex-1 bg-[#f9f9f9] relative">
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ x: "100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "100%", opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 z-50 bg-[#fff9c4] p-4 sm:p-6 md:p-8 border-l-3 sm:border-l-4 border-black overflow-y-auto"
                      style={{
                        backgroundImage: "linear-gradient(#aad4ff 1px, transparent 1px)",
                        backgroundSize: "100% 1.5rem",
                      }}
                    >
                      <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[2px] bg-red-400 opacity-50" />
                      <div className="relative z-10">
                        <h4
                          className={`text-xl sm:text-2xl text-black mb-3 sm:mb-4 underline ${titleFont.className}`}
                        >
                          Notas:
                        </h4>
                        <p
                          className={`text-gray-800 text-base sm:text-lg leading-[1.5rem] ${handFont.className}`}
                        >
                          Este projeto foi desenvolvido com foco em alta performance e UX. Na
                          Zanvexis, priorizamos o resultado final e a experiência do usuário.
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDetails(false);
                          }}
                          className="mt-4 sm:mt-8 text-xs sm:text-sm font-black text-red-600 hover:underline active:underline"
                        >
                          [ FECHAR ]
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <h3
                  className={`text-2xl sm:text-3xl text-black mb-2 sm:mb-4 ${titleFont.className}`}
                >
                  {webProjects[currIndex].title}
                </h3>
                <p
                  className={`text-gray-700 mb-4 sm:mb-6 flex-1 text-sm sm:text-base md:text-lg ${handFont.className}`}
                >
                  {webProjects[currIndex].desc}
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="py-2 sm:py-3 text-sm sm:text-base bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold border-3 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] rounded-lg sm:rounded-xl transition-all active:translate-y-1 active:shadow-none"
                  >
                    DETALHES
                  </button>
                  <a
                    href={webProjects[currIndex].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center py-2 sm:py-3 text-sm sm:text-base bg-black hover:bg-gray-800 text-white font-bold border-3 sm:border-4 border-black shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] rounded-lg sm:rounded-xl active:translate-y-1 active:shadow-none"
                  >
                    GITHUB
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* DETONADOR */}
          <div
            className="pointer-events-auto w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 cursor-pointer group relative flex flex-col items-center"
            onClick={handleDetonation}
          >
            <motion.div
              animate={
                isMobile
                  ? { y: [0, -4, 0] } // mobile mais leve
                  : { y: [0, -6, 0], rotate: [-2, 3, -2] }
              }
              transition={{
                repeat: Infinity,
                duration: 2.4,
                ease: "easeInOut",
              }}
              className={`absolute -top-10 sm:-top-14 md:-top-16 bg-yellow-400 border-3 sm:border-4 border-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] z-[110] ${titleFont.className} text-black text-sm sm:text-base md:text-lg whitespace-nowrap transform`}
            >
              ¡APERTE AQUI! 💥
              <div className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] sm:border-l-[12px] border-l-transparent border-r-[10px] sm:border-r-[12px] border-r-transparent border-t-[12px] sm:border-t-[16px] border-t-black"></div>
              <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] sm:border-l-[10px] border-l-transparent border-r-[8px] sm:border-r-[10px] border-r-transparent border-t-[10px] sm:border-t-[14px] border-t-yellow-400"></div>
            </motion.div>

            <motion.div
              animate={
                isMobile
                  ? { scale: [1, 1.03, 1] } // pulso bem leve no mobile
                  : { scale: [1, 1.08, 1], rotate: [0, -1, 1, 0] }
              }
              transition={{
                repeat: Infinity,
                duration: 1.8,
                ease: "easeInOut",
              }}
              whileHover={!isMobile ? { scale: 1.2, rotate: 5, filter: "brightness(1.2)" } : {}}
              whileTap={{ scale: 0.8, y: 10 }}
              className="w-full h-full relative"
            >
              <Image
                src="/web/detonador.png"
                alt="Detonador"
                fill
                className="object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)] sm:drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]"
              />
            </motion.div>

            <div className="absolute bottom-2 sm:bottom-4 w-16 sm:w-20 md:w-24 h-4 sm:h-5 md:h-6 bg-black/40 blur-md rounded-full -z-10" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
