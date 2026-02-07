import { Hero } from "@/src/components/sections/Hero";
import { About } from "@/src/components/About";
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
      <Hero />
      <About />
    </main>
  );
}