import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

// A URL oficial de produção do seu portfólio
const BASE_URL = 'https://vinicius.zanvexis.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. ROTAS ESTÁTICAS (A raiz e as páginas principais)
  // O priority diz pro Google o que é mais importante (1.0 é o máximo)
  const staticRoutes = ['', '/projetos', '/blog'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. ROTAS DINÂMICAS (Lendo os arquivos MDX do seu blog)
  // Ele vai procurar na pasta content/blog que a gente usou pra salvar os artigos
  const blogDirectory = path.join(process.cwd(), 'content/blog');
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const files = fs.readdirSync(blogDirectory);
    blogRoutes = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        // Tira o .mdx do nome do arquivo para formar a URL final
        const slug = file.replace(/\.mdx$/, '');
        return {
          url: `${BASE_URL}/blog/${slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.6, // Artigos têm uma prioridade um pouco menor que a Home
        };
      });
  } catch (error) {
    console.warn("Aviso de Build: Pasta do blog não encontrada ou vazia.");
  }

  // 3. FUSÃO
  // Retorna tudo junto pro Next.js compilar o XML
  return [...staticRoutes, ...blogRoutes];
}