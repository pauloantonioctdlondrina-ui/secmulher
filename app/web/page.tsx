import Link from "next/link";

export const metadata = { title: "Londrina ON | Portal do cidadão" };

export default function WebPortalPage() {
  return <main className="portal-mock">
    <header className="portal-header"><img src="/logo-londrina-on.svg" alt="Londrina ON" /><nav><Link href="/">Início</Link><span>Carta de Serviços</span><span>Estatísticas</span><span>Ouvidoria - Geral</span></nav><button>▣ &nbsp; Paulo Cesar Antonio</button></header>
    <section className="portal-hero"><div className="portal-hero-content"><p>LONDRINA ON – PORTAL DO CIDADÃO</p><h1>Serviços da Prefeitura em um só lugar — busque o que precisa ou converse com o assistente IA.</h1><div className="portal-tabs"><b>⌕ &nbsp; Buscar serviço</b><span>♧ &nbsp; Assistente IA</span></div><div className="portal-search"><span>⌕ &nbsp; Digite o nome do serviço na Carta...</span><button>Buscar</button></div><small>SERVIÇOS MAIS ACESSADOS</small><div className="portal-chips"><span>♧ Lâmpada Apagada</span><span>╱ Capina e Roçagem</span><span>▧ Reposição da tampa/grelha de bueiro</span><span>▧ Tapa-Buraco</span></div></div></section>
    <section className="portal-feature-grid"><article className="portal-feature-card"><small>NOVO SERVIÇO</small><div className="portal-feature-body"><span className="portal-feature-icon">♧</span><div><h2>UPA Digital - Londrina On</h2><p>Atendimento médico online, adulto e infantil, gratuito, realizado por videoconferência.</p><button>▣ Consultar Médico Online</button></div></div></article><Link className="portal-feature-card safe-feature" href="/caminhos-seguros"><small>PREVENÇÃO URBANA</small><div className="portal-feature-body"><span className="portal-feature-icon">✦</span><div><h2>Caminhos Seguros</h2><p>Mapa colaborativo para identificar e acompanhar pontos vulneráveis da cidade.</p><button>⌖ Abrir mapa colaborativo&nbsp; →</button></div></div></Link></section>
    <section className="portal-services"><h2>Canais de Atendimento</h2><p>Escolha o canal que melhor atende às suas necessidades. Estamos disponíveis para ajudá-lo de múltiplas formas.</p><div><article>♧<h3>Telefone</h3></article><article>◎<h3>Atendimento Online</h3></article><article>▯<h3>Londrina ON APP</h3></article><article>◌<h3>WhatsApp</h3></article></div></section>
  </main>;
}
