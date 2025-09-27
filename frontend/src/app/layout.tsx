import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "SaaS - Controle de Estoque",
  description: "organize seu estoque do melhor jeito possível",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className="antialiased dark"
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
