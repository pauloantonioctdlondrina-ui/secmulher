"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";

const RealMap = dynamic(() => import("./map-view"), { ssr: false, loading: () => <div className="map-loading"><span className="pulse" /> carregando mapa de Londrina...</div> });

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

const reports: Report[] = [
  { id: 1, title: "Ponto em frente a terreno baldio", location: "Av. Europa, Jardim Igapó", category: "Ponto de ônibus", categories: ["Ponto de ônibus", "Terreno baldio", "Iluminação"], confirmations: 18, status: "Priorizado", priority: "Alta", age: "há 2 h", x: 35, y: 31, lat: -23.3542, lng: -51.1834, photos: ["https://images.unsplash.com/photo-1557477201-078baa811af6?auto=format&fit=crop&w=1000&q=80", "https://images1.loopnet.com/i2/yjXZ3vrA9dkCQzRFqXBdiP6E4Yys5dnPB3EY6WdogBY/112/image.png", "https://buvoice.com/wp-content/uploads/2023/09/IMG_2504.jpeg"] },
  { id: 2, title: "Viela sem visibilidade", location: "R. Paranaguá, Centro", category: "Viela / beco", categories: ["Viela / beco", "Iluminação"], confirmations: 11, status: "Em análise", priority: "Média", age: "há 4 h", x: 63, y: 21, lat: -23.3109, lng: -51.1681, photos: ["https://images.unsplash.com/photo-1705844010832-87554d5903bc?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1639164311554-f42f14d3a570?auto=format&fit=crop&w=1000&q=80"] },
  { id: 3, title: "Vegetação bloqueia a calçada", location: "R. Bélgica, Vila Brasil", category: "Vegetação", categories: ["Vegetação", "Iluminação"], confirmations: 7, status: "Em execução", priority: "Média", age: "ontem", x: 75, y: 56, lat: -23.2966, lng: -51.1477, photos: ["https://buvoice.com/wp-content/uploads/2023/09/IMG_2504.jpeg", "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80"] },
  { id: 4, title: "Abrigo escuro à noite", location: "Av. Maringá, Higienópolis", category: "Iluminação", categories: ["Iluminação", "Ponto de ônibus"], confirmations: 22, status: "Em execução", priority: "Alta", age: "ontem", x: 48, y: 67, lat: -23.3285, lng: -51.1775, photos: ["https://images.unsplash.com/photo-1631507623152-c027e253c632?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1563357700-656993d6bc15?auto=format&fit=crop&w=1000&q=80"] },
  { id: 5, title: "Acesso lateral sem iluminação", location: "R. Faria Lima, Gleba Palhano", category: "Iluminação", categories: ["Iluminação", "Viela / beco"], confirmations: 5, status: "Resolvido", priority: "Baixa", age: "há 3 dias", x: 19, y: 72, lat: -23.3471, lng: -51.1994, photos: ["https://images.unsplash.com/photo-1639164311554-f42f14d3a570?auto=format&fit=crop&w=1000&q=80"] },
];

const defaultUserLocation: [number, number] = [-23.3109, -51.1681];

const categoryMeta: Record<Category, { icon: string; tone: string }> = {
  "Ponto de ônibus": { icon: "▰", tone: "coral" },
  Iluminação: { icon: "✦", tone: "amber" },
  "Terreno baldio": { icon: "△", tone: "sage" },
  "Viela / beco": { icon: "⌁", tone: "blue" },
  Vegetação: { icon: "❋", tone: "green" },
};

export default function Home() {
  const [activeId, setActiveId] = useState(1);
  const [filter, setFilter] = useState<"Todas" | Category>("Todas");
  const [view, setView] = useState<"map" | "admin">("map");
  const [notice, setNotice] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [userLocation, setUserLocation] = useState<[number, number]>(defaultUserLocation);
  const [streetName, setStreetName] = useState("Localizando rua...");

  const visibleReports = useMemo(
    () => filter === "Todas" ? reports : reports.filter((report) => report.categories.includes(filter)),
    [filter],
  );
  const activeReport = reports.find((report) => report.id === activeId) ?? reports[0];

  useEffect(() => setPhotoIndex(0), [activeId]);

  const handleUserLocation = useCallback((location: [number, number]) => setUserLocation(location), []);
  const handleStreetName = useCallback((street: string) => setStreetName(street), []);
  const openReportForm = useCallback(() => setShowForm(true), []);

  function confirmReport() {
    setNotice("Sua confirmação foi registrada. Obrigado por manter este ponto visível.");
    window.setTimeout(() => setNotice(""), 3200);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand-lockup">
          <img className="brand-logo-image" src="/logo-londrina-on.svg" alt="Londrina ON — A Prefeitura na palma da sua mão" />
          <div className="brand-divider" />
          <div><p className="eyebrow">Londrina ON</p><h1>Caminhos <em>Seguros</em></h1></div>
        </div>
        <div className="topbar-actions">
          <nav className="main-nav" aria-label="Navegação principal"><button>Início</button><button>Carta de Serviços</button><button>Estatísticas</button><button>Ouvidoria - Geral</button></nav>
          <button className="mode-toggle" onClick={() => setView(view === "map" ? "admin" : "map")}>
            <span className="live-dot" /> {view === "map" ? "Visão institucional" : "Visão cidadã"}
          </button>
          <button className="profile-button" aria-label="Abrir perfil">AP</button>
        </div>
      </header>

      {view === "map" ? (
        <section className="workspace citizen-view">
          <div className="intro-row">
            <div>
              <p className="section-kicker">Mapa colaborativo de prevenção</p>
              <h2>Onde a cidade pede<br /><i>mais atenção.</i></h2>
            </div>
            <div className="intro-copy">
              <p>Identifique riscos urbanos, confirme pontos que continuam vulneráveis e ajude a orientar a próxima ação pública.</p>
            </div>
          </div>

          <div className="filter-row">
            <span className="filter-label">Filtrar por</span>
            <button className={filter === "Todas" ? "filter active" : "filter"} onClick={() => setFilter("Todas")}>Todos os pontos <strong>38</strong></button>
            {(Object.keys(categoryMeta) as Category[]).map((category) => (
              <button key={category} className={filter === category ? `filter active tone-${categoryMeta[category].tone}` : "filter"} onClick={() => setFilter(category)}>
                <span className={`filter-dot dot-${categoryMeta[category].tone}`} /> {category}
              </button>
            ))}
          </div>

          <div className="map-layout">
            <div className="map-card">
              <div className="map-toolbar">
                <span className="map-status"><span className="pulse" /> atualizando agora</span>
                <div className="street-readout" aria-live="polite"><span className="street-readout-icon">⌖</span><div><strong>{streetName}</strong><small>localização selecionada no mapa</small></div></div>
              </div>
              <div className="map-canvas" aria-label="Mapa real de ocorrências em Londrina"><RealMap reports={visibleReports} activeId={activeId} onSelect={setActiveId} onUserPinClick={openReportForm} onLocationChange={handleUserLocation} onStreetChange={handleStreetName} /></div>
              <div className="map-footer"><span><b className="legend-dot high" /> alta prioridade</span><span><b className="legend-dot mid" /> em acompanhamento</span><span><b className="legend-dot done" /> resolvido</span><span className="map-count">{visibleReports.length} pontos visíveis</span></div>
            </div>

            <aside className="report-panel">
              <div className="panel-heading"><div><p className="section-kicker">Ponto em destaque</p><h3>{activeReport.category}</h3></div><span className={`priority priority-${activeReport.priority.toLowerCase()}`}>{activeReport.priority}</span></div>
              <div className="photo-carousel"><img src={activeReport.photos[photoIndex]} alt={`Foto cidadã ${photoIndex + 1} de ${activeReport.photos.length}: ${activeReport.title}`} /><div className="photo-shade" /><span className="photo-credit">foto enviada por cidadão</span><span className="photo-count">{photoIndex + 1} / {activeReport.photos.length}</span>{activeReport.photos.length > 1 && <><button className="photo-arrow photo-prev" onClick={() => setPhotoIndex((photoIndex - 1 + activeReport.photos.length) % activeReport.photos.length)} aria-label="Foto anterior">‹</button><button className="photo-arrow photo-next" onClick={() => setPhotoIndex((photoIndex + 1) % activeReport.photos.length)} aria-label="Próxima foto">›</button></>}<div className="photo-dots">{activeReport.photos.map((photo, index) => <button key={photo} className={index === photoIndex ? "selected" : ""} onClick={() => setPhotoIndex(index)} aria-label={`Ver foto ${index + 1}`} />)}</div></div>
              <h4>{activeReport.title}</h4>
              <p className="report-location">⌖ {activeReport.location}</p>
              <div className="tag-row">{activeReport.categories.map((category) => <span key={category}>{category}</span>)}</div>
              <div className="confirmation-box"><div><strong>{activeReport.confirmations}</strong><span>pessoas confirmaram<br />que continua assim</span></div><div className="avatar-stack"><i>ML</i><i>FC</i><i>+</i></div></div>
              <div className="report-meta"><span>Atualizado {activeReport.age}</span><span className={`status status-${activeReport.status.toLowerCase().replaceAll(" ", "-")}`}><i /> {activeReport.status}</span></div>
              <button className="confirm-button" onClick={confirmReport}>Confirmar que continua <span>→</span></button>
              <button className="text-button" onClick={() => setNotice("Obrigado. Vamos sinalizar este ponto para revisão.")}>Informar que foi resolvido</button>
            </aside>
          </div>
          <div className="trust-note"><span>♧</span><p>Este mapa trata de <strong>prevenção urbana</strong>. Em situações de emergência, ligue <strong>190</strong> ou <strong>153</strong>.</p><span className="note-link">Como funciona? →</span></div>
        </section>
      ) : <AdminView onBack={() => setView("map")} />}

      {notice && <div className="toast"><span>✓</span>{notice}</div>}
      {showForm && <ReportModal streetName={streetName} location={userLocation} onClose={() => setShowForm(false)} onSaved={() => { setShowForm(false); setNotice("Ponto salvo para análise. Obrigado por cuidar da cidade."); }} />}
    </main>
  );
}

function AdminView({ onBack }: { onBack: () => void }) {
  const rows = reports.slice(0, 4);
  return <section className="workspace admin-view">
    <div className="admin-header"><div><p className="section-kicker">Painel de gestão</p><h2>O que a cidade está<br /><i>pedindo agora.</i></h2></div><button className="back-button" onClick={onBack}>← voltar ao mapa cidadão</button></div>
    <div className="metric-grid"><div className="metric-card"><span>pontos ativos</span><strong>38</strong><small>+ 6 nesta semana</small></div><div className="metric-card accent"><span>alta prioridade</span><strong>07</strong><small>3 aguardam encaminhamento</small></div><div className="metric-card"><span>confirmados pela rede</span><strong>126</strong><small>+ 18% nos últimos 30 dias</small></div><div className="metric-card dark"><span>resolvidos</span><strong>24</strong><small>63% dos pontos tratados</small></div></div>
    <div className="admin-grid"><div className="queue-card"><div className="card-title"><div><p className="section-kicker">Fila de atenção</p><h3>Próximas ações</h3></div><span className="queue-badge">7 pendentes</span></div>{rows.map((row, index) => <div className="queue-row" key={row.id}><div className={`queue-icon pin-${categoryMeta[row.category].tone}`}>{categoryMeta[row.category].icon}</div><div className="queue-main"><strong>{row.title}</strong><span>{row.location} · {row.confirmations} confirmações</span></div><div className="queue-owner"><small>{index === 0 ? "CMTU + Guarda" : index === 1 ? "Guarda Municipal" : index === 2 ? "Zeladoria" : "CMTU"}</small><b className={`priority priority-${row.priority.toLowerCase()}`}>{row.priority}</b></div><button className="row-arrow">→</button></div>)}</div><div className="territory-card"><div className="card-title"><div><p className="section-kicker">Leitura territorial</p><h3>Onde concentrar esforço</h3></div><span className="mini-period">últimos 30 dias⌄</span></div><div className="bar-chart"><div className="chart-y"><span>40</span><span>30</span><span>20</span><span>10</span><span>0</span></div><div className="bars">{[55, 74, 44, 88, 63, 92, 69, 79, 52, 68, 84, 59].map((height, i) => <div className="bar-wrap" key={i}><div className={i === 5 ? "bar hot" : "bar"} style={{ height: `${height}%` }} />{i % 2 === 0 && <span>{["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"][i / 2]}</span>}</div>)}</div></div><div className="chart-caption"><span className="legend-dot high" /> confirmações e novos registros <strong>+ 18%</strong></div></div></div>
    <div className="admin-footer"><span><i className="live-dot" /> dados demonstrativos do protótipo</span><span>Última sincronização: hoje, 14:32</span></div>
  </section>;
}

function ReportModal({ streetName, location, onClose, onSaved }: { streetName: string; location: [number, number]; onClose: () => void; onSaved: () => void }) {
  const [selected, setSelected] = useState<Category[]>(["Ponto de ônibus"]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");

  function handlePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    setPhotoPreview(URL.createObjectURL(file));
  }

  return <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Sinalizar ponto vulnerável"><div className="modal"><button className="modal-close" onClick={onClose}>×</button><p className="section-kicker">Novo registro</p><h2>Qual ponto precisa<br /><i>de mais atenção?</i></h2><p className="modal-lead">O ponto foi marcado pela sua localização. Confirme o endereço, escolha o risco e envie uma foto do local.</p><div className="fake-location"><span>⌖</span><div><strong>{streetName}</strong><small>coordenadas: {location[0].toFixed(5)}, {location[1].toFixed(5)}</small></div><span className="location-lock">✓</span></div><label className="field-label">O que você observou?</label><div className="choice-grid">{(Object.keys(categoryMeta) as Category[]).map((category) => <button key={category} className={selected.includes(category) ? "choice selected" : "choice"} onClick={() => setSelected((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category])}><span className={`choice-icon pin-${categoryMeta[category].tone}`}>{categoryMeta[category].icon}</span>{category}<i>✓</i></button>)}</div><label className="field-label" htmlFor="risk-description">Descreva o risco <span>opcional</span></label><textarea id="risk-description" placeholder="Ex.: o abrigo fica de frente para uma viela e não há iluminação depois das 22h..." /><label className="field-label" htmlFor="citizen-photo">Foto do local <span>opcional</span></label><label className={photoPreview ? "photo-upload has-photo" : "photo-upload"} htmlFor="citizen-photo">{photoPreview ? <img src={photoPreview} alt="Prévia da foto selecionada" /> : <span className="upload-icon">＋</span>}<span><strong>{photoPreview ? "Foto anexada" : "Anexe uma foto do risco"}</strong><small>{photoName || "JPG ou PNG · até 10 MB"}</small></span><input id="citizen-photo" type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} /></label><div className="modal-actions"><button className="secondary-button" onClick={onClose}>Cancelar</button><button className="primary-button" onClick={onSaved}>Salvar ponto <span>→</span></button></div><p className="anonymous-note">♧ Você pode registrar anonimamente. Não publicamos seus dados pessoais.</p></div></div>;
}
