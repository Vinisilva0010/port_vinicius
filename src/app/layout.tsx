import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Fonte principal (Texto)
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

// Fonte de código (Títulos tech)
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Vinicius | Desenvolvedor Fullstack",
  description: "Portfólio criativo de desenvolvimento web e software.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}