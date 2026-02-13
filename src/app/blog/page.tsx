import Link from "next/link";
import Image from "next/image";
import { Permanent_Marker } from "next/font/google";

const titleFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });

const categories = [
  { id: "rust", title: "RUST HEAVY METAL", img: "/blog/card-rust.png", color: "border-orange-600 shadow-orange-900" },
  { id: "crypto", title: "CRIPTO & SCAMS", img: "/blog/card-crypto.png", color: "border-green-600 shadow-green-900" },
  { id: "effects", title: "ALUCINAÇÕES 3D", img: "/blog/card-effects.png", color: "border-purple-600 shadow-purple-900" },
  { id: "scripts", title: "GAMBIARRAS.PY", img: "/blog/card-scripts.png", color: "border-blue-600 shadow-blue-900" },
];

export default function BlogHome() {
  return (
    <main className="min-h-screen bg-[#111] py-20 px-4">
      <h1 className={`text-center text-5xl md:text-7xl text-yellow-400 mb-16 ${titleFont.className} drop-shadow-[5px_5px_0px_#000]`}>
        ESCOLHA O VENENO
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/blog/${cat.id}`} className="group relative">
            {/* O CARD */}
            <div className={`
              h-64 md:h-80 w-full relative bg-black 
              border-[6px] ${cat.color} rounded-[2rem] 
              transform transition-all duration-300
              group-hover:scale-105 group-hover:rotate-1 group-hover:shadow-[15px_15px_0px_#000]
              overflow-hidden
            `}>
              {/* Imagem de Fundo (As que você gerou) */}
              <Image 
                src={cat.img} 
                alt={cat.title} 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              
              {/* Título por cima */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-colors">
                <h2 className={`text-4xl md:text-5xl text-white text-center stroke-black stroke-2 ${titleFont.className} drop-shadow-[4px_4px_0px_#000]`}>
                  {cat.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}