import { getPostBySlug, getAllPosts } from "@/src/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Permanent_Marker, JetBrains_Mono } from "next/font/google";
import { ArrowLeft } from "lucide-react";

const titleFont = Permanent_Marker({ weight: "400", subsets: ["latin"] });
const codeFont = JetBrains_Mono({ weight: "400", subsets: ["latin"] });

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return <div>404 - O estagiário apagou esse post.</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-gray-200 py-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Navegação */}
        <div className="flex gap-4 mb-8 text-sm font-bold">
           <Link href="/blog" className="text-gray-500 hover:text-white">BLOG</Link>
           <span className="text-gray-700">/</span>
           <Link href={`/blog/${category}`} className="text-gray-500 hover:text-white uppercase">{category}</Link>
           <span className="text-gray-700">/</span>
           <span className="text-yellow-500 uppercase">{slug}</span>
        </div>

        <article className="bg-[#111] border-[5px] border-white p-8 md:p-12 shadow-[15px_15px_0px_rgba(255,0,0,0.5)] transform rotate-1">
            <h1 className={`text-4xl md:text-6xl text-white mb-6 ${titleFont.className}`}>{post.title}</h1>
            
            <div className={`prose prose-invert prose-lg max-w-none ${codeFont.className}
                prose-headings:font-black prose-headings:text-yellow-400
                prose-pre:bg-black prose-pre:border-2 prose-pre:border-gray-500
            `}>
                <MDXRemote source={post.content} />
            </div>
        </article>
      </div>
    </main>
  );
}