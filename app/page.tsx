import { Hero } from "@/src/components/sections/Hero";
import { About } from "@/src/components/About";
import { Projetos } from "@/src/components/projetos";
import { TechTicker } from "@/src/components/TechTicker";
import { CloudTicker } from "@/src/components/CloudTicker";
import { WebProjects } from "@/src/components/WebProjects";
import { FullStackTicker } from "@/src/components/FullStackTicker";
import { BlogSection } from "@/src/components/BlogSection";
import { FooterSection } from "@/src/components/FooterSection";


export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Hero />
      <div className="relative z-50 my-[-10px]">
        <CloudTicker />
      </div>
      <About />
      <div className="relative z-50 mt-12 mb-12">
         <TechTicker />
      </div>
      <Projetos />
      
      <div className="relative z-50 mt-16 mb-24">
        <FullStackTicker />
      </div>
      <WebProjects />
      <BlogSection />
      <FooterSection />
    </main>
  );
}