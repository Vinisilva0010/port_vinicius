import { getPostsByCategory } from "@/src/lib/blog";
import Link from "next/link";
import { Permanent_Marker, JetBrains_Mono } from "next/font/google";
import { ArrowLeft } from "lucide-react";

const titleFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const codeFont = JetBrains_Mono({ weight: "400", subsets: ["latin"] });

// Isso gera as rotas estáticas para não dar erro 404
export function generateStaticParams() {
  return [{ category: "rust" }, { category: "crypto" }, { category: "effects" }, { category: "scripts" }];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = getPostsByCategory(category);

  return (
    <main className="min-h-screen bg-[#0a0a0a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="text-yellow-400 font-bold mb-8 inline-flex items-center gap-2 hover:underline">
          <ArrowLeft /> VOLTAR PRO INÍCIO
        </Link>

        <h1 className={`text-6xl text-white mb-12 uppercase ${titleFont.className}`}>
          ARQUIVOS DE: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{category}</span>
        </h1>

        <div className="grid gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${category}/${post.slug}`}>
              <div className="bg-[#1a1a1a] border-4 border-gray-700 p-6 rounded-xl hover:border-yellow-400 hover:translate-x-2 transition-all cursor-pointer shadow-[8px_8px_0px_#000]">
                <h2 className={`text-3xl text-white mb-2 ${titleFont.className}`}>{post.title}</h2>
                <p className={`text-gray-400 ${codeFont.className}`}>// {post.description}</p>
                <div className="mt-4 text-xs font-bold text-gray-500 bg-black inline-block px-2 py-1 rounded">
                   {post.date}
                </div>
              </div>
            </Link>
          ))}
          
          {posts.length === 0 && (
            <p className="text-gray-500 text-xl">Nada aqui ainda. O Vinícius foi tomar café.</p>
          )}
        </div>
      </div>
    </main>
  );
}