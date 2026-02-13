// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

// Função para pegar TODOS (já tinha)
export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return { slug, ...(data as any), content };
  });
}

// NOVA FUNÇÃO: Pegar posts por categoria
export function getPostsByCategory(category: string) {
  const allPosts = getAllPosts();
  // Filtra onde o frontmatter 'category' é igual à categoria pedida
  return allPosts.filter((post) => post.category === category);
}

// NOVA FUNÇÃO: Pegar post específico
export function getPostBySlug(slug: string) {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}