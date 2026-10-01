"use client";

import Link from "next/link";

export type Category = "Ponto de ônibus" | "Iluminação" | "Terreno baldio" | "Viela / beco" | "Vegetação";
export type Status = "Priorizado" | "Em análise" | "Em execução" | "Resolvido";

export type Report = {
  id: number;
  title: string;
  location: string;
  category: Category;
  categories: string[];
  confirmations: number;
  status: Status;
  priority: "Alta" | "Média" | "Baixa";
  age: string;
  x: number;
  y: number;
  lat: number;
  lng: number;
  photos: string[];
};

export default function EntryPage() {
  return <main className="entry-shell">
    <div className="entry-brand"><img src="/logo-londrina-on.svg" alt="Londrina ON — A Prefeitura na palma da sua mão" /><span /></div>
    <section className="entry-content">
      <p className="entry-kicker">CAMINHOS SEGUROS · PROTÓTIPO DE EXPERIÊNCIA</p>
      <h1>Como você quer<br /><i>acessar o módulo?</i></h1>
      <p className="entry-lead">Escolha a experiência que deseja simular dentro do ecossistema Londrina ON.</p>
      <div className="entry-options">
        <Link className="entry-card entry-web" href="/web"><span className="entry-card-icon">⌘</span><span><small>PORTAL DO CIDADÃO</small><strong>Visão Web</strong><p>Mapa colaborativo em tela ampla, com detalhes e painel de acompanhamento.</p></span><b>→</b></Link>
        <Link className="entry-card entry-app" href="/mobile"><span className="entry-card-icon">▯</span><span><small>APLICATIVO LONDRINA ON</small><strong>Visão App</strong><p>Jornada mobile integrada à home do aplicativo oficial.</p></span><b>→</b></Link>
      </div>
      <p className="entry-note"><span>i</span> Esta é uma simulação navegável do módulo Caminhos Seguros.</p>
    </section>
    <footer className="entry-footer">Londrina ON · A Prefeitura na palma da sua mão</footer>
  </main>;
}
