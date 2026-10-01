"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Report } from "../page";

const RealMap = dynamic(() => import("../map-view"), {
  ssr: false,
  loading: () => <div className="mobile-map-loading"><span className="pulse" /> carregando mapa...</div>,
});

const mobileReports: Report[] = [
  { id: 1, title: "Ponto em frente a terreno baldio", location: "Av. Europa, Jardim Igapó", category: "Ponto de ônibus", categories: ["Ponto de ônibus", "Terreno baldio", "Iluminação"], confirmations: 18, status: "Priorizado", priority: "Alta", age: "há 2 h", x: 35, y: 31, lat: -23.3542, lng: -51.1834, photos: ["https://images.unsplash.com/photo-1557477201-078baa811af6?auto=format&fit=crop&w=1000&q=80", "https://images1.loopnet.com/i2/yjXZ3vrA9dkCQzRFqXBdiP6E4Yys5dnPB3EY6WdogBY/112/image.png"] },
  { id: 2, title: "Viela sem visibilidade", location: "R. Paranaguá, Centro", category: "Viela / beco", categories: ["Viela / beco", "Iluminação"], confirmations: 11, status: "Em análise", priority: "Média", age: "há 4 h", x: 63, y: 21, lat: -23.3109, lng: -51.1681, photos: ["https://images.unsplash.com/photo-1705844010832-87554d5903bc?auto=format&fit=crop&w=1000&q=80"] },
  { id: 4, title: "Abrigo escuro à noite", location: "Av. Maringá, Higienópolis", category: "Iluminação", categories: ["Iluminação", "Ponto de ônibus"], confirmations: 22, status: "Em execução", priority: "Alta", age: "ontem", x: 48, y: 67, lat: -23.3285, lng: -51.1775, photos: ["https://images.unsplash.com/photo-1631507623152-c027e253c632?auto=format&fit=crop&w=1000&q=80"] },
];

type Screen = "home" | "map";

export default function MobilePrototype() {
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [notice, setNotice] = useState("");
  const [street, setStreet] = useState("Localizando rua...");
  const [location, setLocation] = useState<[number, number]>([-23.3109, -51.1681]);
  const selected = mobileReports.find((report) => report.id === selectedId);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 2800);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function openMap() {
    setScreen("map");
    setSelectedId(null);
  }

  return (
    <main className="mobile-prototype-shell">
      <div className="prototype-caption"><span className="prototype-dot" /> Protótipo navegável · Londrina ON</div>
      <div className="phone-frame" aria-label="Simulação do aplicativo Londrina ON em um celular">
        <div className="phone-speaker" />
        <div className="phone-screen">
          {screen === "home" ? (
            <MobileHome onOpenMap={openMap} />
          ) : (
            <MobileMapScreen
              reports={mobileReports}
              selected={selected}
              street={street}
              onBack={() => setScreen("home")}
              onSelect={setSelectedId}
              onLocationChange={setLocation}
              onStreetChange={setStreet}
              onUserPinClick={() => setShowForm(true)}
            />
          )}
          {showForm && <MobileReportForm street={street} location={location} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); setNotice("Ponto enviado para análise"); }} />}
          {notice && <div className="mobile-toast"><span>✓</span>{notice}</div>}
        </div>
        <div className="phone-home-indicator" />
      </div>
      <p className="prototype-hint">Toque no banner para abrir o mapa. Depois, toque em um ponto para ver os detalhes ou no pin “Você” para registrar uma vulnerabilidade.</p>
    </main>
  );
}

function MobileHome({ onOpenMap }: { onOpenMap: () => void }) {
  return <div className="mobile-home-view">
    <header className="mobile-app-header">
      <button className="mobile-menu-button" aria-label="Abrir menu"><span /><span /><span /></button>
      <img src="/logo-londrina-on.svg" alt="Londrina ON" />
      <button className="mobile-profile-button" aria-label="Abrir perfil">PA</button>
    </header>
    <div className="mobile-home-content">
      <p className="mobile-greeting">Olá, Paulo</p>
      <h1>Como podemos<br /><strong>ajudar hoje?</strong></h1>
      <label className="mobile-search"><span>⌕</span><input placeholder="Busque um serviço" aria-label="Buscar serviço" /><b>⌘</b></label>
      <p className="mobile-section-label">Serviços mais acessados</p>
      <div className="mobile-service-grid">
        <button><span className="service-icon red">♧</span><strong>Saúde</strong><small>Atendimento e cuidados</small></button>
        <button><span className="service-icon blue">▣</span><strong>Iluminação</strong><small>Solicite manutenção</small></button>
        <button><span className="service-icon blue">⌂</span><strong>Urbanismo</strong><small>Melhorias na cidade</small></button>
        <button><span className="service-icon red">◌</span><strong>Ouvidoria</strong><small>Fale com a Prefeitura</small></button>
      </div>
      <p className="mobile-section-label mobile-section-spaced">Para você</p>
      <button className="safe-banner" onClick={onOpenMap}>
        <span className="safe-banner-art"><i /><b>✦</b><em>⌁</em></span>
        <span className="safe-banner-copy"><small>PREVENÇÃO URBANA</small><strong>Caminhos<br /><i>Seguros</i></strong><span>Veja e sinalize pontos que precisam de atenção.</span></span>
        <span className="safe-banner-arrow">→</span>
      </button>
      <div className="mobile-app-card"><span>▣</span><div><strong>Londrina ON</strong><small>Todos os serviços da Prefeitura em um só lugar.</small></div><b>›</b></div>
    </div>
    <nav className="mobile-bottom-nav"><button className="active"><span>⌂</span>Início</button><button><span>▦</span>Serviços</button><button><span>♧</span>Ajuda</button><button><span>◉</span>Perfil</button></nav>
  </div>;
}

function MobileMapScreen({ reports, selected, street, onBack, onSelect, onLocationChange, onStreetChange, onUserPinClick }: { reports: Report[]; selected?: Report; street: string; onBack: () => void; onSelect: (id: number) => void; onLocationChange: (location: [number, number]) => void; onStreetChange: (street: string) => void; onUserPinClick: () => void }) {
  return <div className="mobile-map-view">
    <header className="mobile-map-header"><button className="mobile-back-button" onClick={onBack} aria-label="Voltar">‹</button><div><p>MAPA COLABORATIVO</p><h1>Caminhos <i>Seguros</i></h1></div><button className="mobile-help-button" aria-label="Como funciona">?</button></header>
    <div className="mobile-map-street"><span>⌖</span><div><small>VOCÊ ESTÁ NESTA REGIÃO</small><strong>{street}</strong></div></div>
    <div className="mobile-map-wrap"><RealMap reports={reports} activeId={selected?.id ?? -1} onSelect={onSelect} onUserPinClick={onUserPinClick} onLocationChange={onLocationChange} onStreetChange={onStreetChange} /></div>
    <div className="mobile-map-tip"><span>✦</span><p><strong>Toque no pin “Você”</strong> para sinalizar um ponto vulnerável.</p></div>
    {selected && <MobileDetail report={selected} onClose={() => onSelect(-1)} />}
    {!selected && <div className="mobile-map-legend"><span><i className="legend-blue" /> ponto de ônibus</span><span><i className="legend-amber" /> iluminação</span><span><i className="legend-red" /> terreno/viela</span></div>}
  </div>;
}

function MobileDetail({ report, onClose }: { report: Report; onClose: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  return <section className="mobile-detail-sheet" aria-label={`Detalhes: ${report.title}`}>
    <div className="mobile-sheet-handle" /><button className="mobile-detail-close" onClick={onClose} aria-label="Fechar detalhes">×</button>
    <div className="mobile-detail-photo"><img src={report.photos[photoIndex]} alt={`Foto cidadã ${photoIndex + 1}: ${report.title}`} /><span>foto enviada por cidadão</span>{report.photos.length > 1 && <><button onClick={() => setPhotoIndex((photoIndex - 1 + report.photos.length) % report.photos.length)} aria-label="Foto anterior">‹</button><button onClick={() => setPhotoIndex((photoIndex + 1) % report.photos.length)} aria-label="Próxima foto">›</button></>}</div>
    <div className="mobile-detail-heading"><div><small>PONTO EM DESTAQUE</small><h2>{report.title}</h2></div><b className={`mobile-priority ${report.priority === "Alta" ? "high" : "medium"}`}>{report.priority}</b></div>
    <p className="mobile-detail-location">⌖ {report.location}</p><div className="mobile-detail-tags">{report.categories.map((category) => <span key={category}>{category}</span>)}</div>
    <div className="mobile-detail-confirm"><strong>{report.confirmations}</strong><span>pessoas confirmaram que<br />este ponto continua vulnerável</span><button onClick={() => undefined}>Confirmar</button></div>
    <div className="mobile-detail-status"><span>Atualizado {report.age}</span><b><i /> {report.status}</b></div>
  </section>;
}

function MobileReportForm({ street, location, onClose, onSaved }: { street: string; location: [number, number]; onClose: () => void; onSaved: () => void }) {
  const [selectedCategory, setSelectedCategory] = useState("Iluminação");
  const [photoName, setPhotoName] = useState("");
  return <div className="mobile-form-backdrop" role="dialog" aria-modal="true" aria-label="Sinalizar ponto vulnerável"><section className="mobile-form-sheet"><button className="mobile-detail-close" onClick={onClose} aria-label="Fechar formulário">×</button><div className="mobile-sheet-handle" /><p className="mobile-form-kicker">NOVO REGISTRO</p><h2>O que você observou<br /><i>neste ponto?</i></h2><p className="mobile-form-lead">Ajude a Prefeitura a entender e priorizar este local.</p><div className="mobile-form-location"><span>⌖</span><div><strong>{street}</strong><small>{location[0].toFixed(4)}, {location[1].toFixed(4)}</small></div><b>✓</b></div><label className="mobile-form-label">Tipo de vulnerabilidade</label><div className="mobile-form-choices">{["Iluminação", "Ponto de ônibus", "Terreno baldio", "Viela / beco"].map((category) => <button key={category} className={category === selectedCategory ? "selected" : ""} onClick={() => setSelectedCategory(category)}>{category}<span>{category === selectedCategory ? "✓" : ""}</span></button>)}</div><label className="mobile-form-label" htmlFor="mobile-description">Descreva o risco <small>opcional</small></label><textarea id="mobile-description" placeholder="Ex.: o ponto fica em frente a uma viela sem iluminação..." /><label className="mobile-upload" htmlFor="mobile-photo"><span>＋</span><div><strong>{photoName || "Adicionar foto do local"}</strong><small>JPG ou PNG · até 10 MB</small></div><input id="mobile-photo" type="file" accept="image/*" onChange={(event) => setPhotoName(event.target.files?.[0]?.name ?? "")} /></label><button className="mobile-submit" onClick={onSaved}>Enviar sinalização <span>→</span></button><p className="mobile-anonymous">Você pode registrar anonimamente.</p></section></div>;
}
