import { getPostBySlug, getAllPosts } from "@/src/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Permanent_Marker, JetBrains_Mono, Patrick_Hand } from "next/font/google";
import { ArrowLeft, Terminal } from "lucide-react";

// Fonte do Título (Marcador Grosso)
const titleFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });

// Fonte do Texto (Escrita a mão, estilo Smiling Friends/Caderno)
const handFont = Patrick_Hand({ weight: "400", subsets: ["latin"] });

// Fonte APENAS para os blocos de código (Para alinhar Rust/Python)
const codeFont = JetBrains_Mono({ weight: "400", subsets: ["latin"] });

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts
    .filter((post) => post.category && typeof post.category === 'string')
    .map((post) => ({
      category: post.category,
      slug: post.slug,
    }));
}

export default async function PostPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return <div>404 - Post não encontrado.</div>;

  const catColors: Record<string, string> = {
    rust: "border-orange-500 shadow-orange-900 text-orange-400",
    crypto: "border-green-500 shadow-green-900 text-green-400",
    effects: "border-purple-500 shadow-purple-900 text-purple-400",
    scripts: "border-blue-500 shadow-blue-900 text-blue-400",
  };
  
  const theme = catColors[category] || catColors.scripts;
  const borderColor = theme.split(" ")[0];

  return (
    <main className="min-h-screen bg-[#050505] py-20 px-4 overflow-x-hidden">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Navegação */}
        <div className="mb-8">
           <Link href={`/blog/${category}`} className={`inline-flex items-center gap-2 text-xl font-bold uppercase ${theme} ${handFont.className} hover:scale-105 transition-transform`}>
              <ArrowLeft /> VOLTAR PARA {category}
           </Link>
        </div>

        {/* O ARTIGO */}
        <article className={`bg-[#111] border-[4px] md:border-[6px] ${borderColor} p-6 md:p-12 shadow-[8px_8px_0px_#000] relative`}>
            
            {/* Título do Post */}
            <h1 className={`text-5xl md:text-7xl text-white mb-10 leading-[0.9] ${titleFont.className} drop-shadow-[4px_4px_0px_#000]`}>
              {post.title}
            </h1>
            
            {/* AQUI ESTÁ A MUDANÇA:
               Usa 'handFont' para todo o texto (parece escrita a mão).
               Usa 'text-xl' (bem grande).
            */}
            <div className={`prose prose-invert max-w-none text-gray-200 ${handFont.className}
                
                /* Tamanho da letra (Gigante para ler fácil) */
                prose-p:text-x2 md:prose-p:text-2x2 prose-p:leading-snug prose-p:mb-6

                /* Títulos internos */
                prose-headings:font-bold prose-headings:text-white prose-headings:mt-12 prose-headings:mb-6
                prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:text-yellow-400 
                prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:border-b-4 prose-h2:${borderColor} prose-h2:pb-2

                /* Listas */
                prose-li:text-xl md:prose-li:text-2xl

                /* BLOCOS DE CÓDIGO (Esses precisam ser mono para não quebrar) */
                prose-pre:bg-[#000] 
                prose-pre:border-4 prose-pre:border-gray-800 
                prose-pre:shadow-[6px_6px_0px_#000] 
                prose-pre:rounded-none 
                prose-pre:overflow-x-auto 
                prose-pre:p-6 prose-pre:my-8
                
                /* Fonte do código (JetBrains Mono) forçada aqui dentro */
                prose-code:font-mono prose-code:text-pink-400 ${codeFont.className} prose-code:text-base md:prose-code:text-lg

                /* Links */
                prose-a:text-yellow-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-yellow-300
            `}>
                <MDXRemote source={post.content} />
            </div>

            {/* Rodapé */}
            <div className={`mt-16 pt-8 border-t-4 border-dashed border-gray-800 flex items-center gap-2 text-gray-500 text-lg ${handFont.className}`}>
                <Terminal size={20} />
                FIM DO ARQUIVO // {post.date}
            </div>
        </article>
      </div>
    </main>
  );
}