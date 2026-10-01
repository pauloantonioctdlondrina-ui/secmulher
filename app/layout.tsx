import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caminhos Seguros | Londrina ON",
  description: "Mapa colaborativo de vulnerabilidades urbanas e segurança preventiva.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
