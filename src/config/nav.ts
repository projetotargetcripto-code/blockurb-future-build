export type NavEntry = { label: string; href: string; icon?: string };

export const NAV: Record<string, NavEntry[]> = {
  superadmin: [
    { label: "Home", href: "/superadmin", icon: "shield" },
    { label: "Organizações", href: "/superadmin/organizacoes", icon: "building" },
    { label: "Usuários", href: "/superadmin/usuarios", icon: "user" },
    { label: "Relatórios", href: "/superadmin/relatorios", icon: "chart" },
    { label: "Configurações", href: "/superadmin/config", icon: "settings" },
  ],
  adminfilial: [
    { label: "Home", href: "/adminfilial", icon: "layout" },
    { label: "Equipe", href: "/adminfilial/equipe", icon: "users" },
    { label: "Empreendimentos", href: "/adminfilial/empreendimentos", icon: "building" },
    { label: "Relatórios", href: "/adminfilial/relatorios", icon: "chart" },
    { label: "Configurações", href: "/adminfilial/config", icon: "settings" },
  ],
  urbanista: [
    { label: "Home", href: "/urbanista", icon: "layout" },
    { label: "Mapas", href: "/urbanista/mapas", icon: "map" },
    { label: "Projetos", href: "/urbanista/projetos", icon: "map" },
    { label: "Relatórios", href: "/urbanista/relatorios", icon: "chart" },
    { label: "Configurações", href: "/urbanista/config", icon: "settings" },
  ],
  juridico: [
    { label: "Home", href: "/juridico", icon: "layout" },
    { label: "Contratos", href: "/juridico/contratos", icon: "file" },
    { label: "Processos", href: "/juridico/processos", icon: "file" },
    { label: "Relatórios", href: "/juridico/relatorios", icon: "chart" },
    { label: "Configurações", href: "/juridico/config", icon: "settings" },
  ],
  contabilidade: [
    { label: "Home", href: "/contabilidade", icon: "layout" },
    { label: "Financeiro", href: "/contabilidade/financeiro", icon: "chart" },
    { label: "Fiscal", href: "/contabilidade/fiscal", icon: "chart" },
    { label: "Relatórios", href: "/contabilidade/relatorios", icon: "chart" },
    { label: "Configurações", href: "/contabilidade/config", icon: "settings" },
  ],
  marketing: [
    { label: "Home", href: "/marketing", icon: "layout" },
    { label: "Campanhas", href: "/marketing/campanhas", icon: "inbox" },
    { label: "Materiais", href: "/marketing/materiais", icon: "file" },
    { label: "Relatórios", href: "/marketing/relatorios", icon: "chart" },
    { label: "Configurações", href: "/marketing/config", icon: "settings" },
  ],
  comercial: [
    { label: "Home", href: "/comercial", icon: "layout" },
    { label: "Leads", href: "/comercial/leads", icon: "inbox" },
    { label: "Propostas", href: "/comercial/propostas", icon: "file" },
    { label: "Relatórios", href: "/comercial/relatorios", icon: "chart" },
    { label: "Configurações", href: "/comercial/config", icon: "settings" },
  ],
  imobiliaria: [
    { label: "Home", href: "/imobiliaria", icon: "layout" },
    { label: "Corretores", href: "/imobiliaria/corretores", icon: "users" },
    { label: "Leads", href: "/imobiliaria/leads", icon: "inbox" },
    { label: "Relatórios", href: "/imobiliaria/relatorios", icon: "chart" },
    { label: "Configurações", href: "/imobiliaria/config", icon: "settings" },
  ],
  corretor: [
    { label: "Home", href: "/corretor", icon: "layout" },
    { label: "Leads", href: "/corretor/leads", icon: "inbox" },
    { label: "Vendas", href: "/corretor/vendas", icon: "chart" },
    { label: "Relatórios", href: "/corretor/relatorios", icon: "chart" },
    { label: "Configurações", href: "/corretor/config", icon: "settings" },
  ],
  obras: [
    { label: "Home", href: "/obras", icon: "layout" },
    { label: "Cronograma", href: "/obras/cronograma", icon: "calendar" },
    { label: "Andamento", href: "/obras/andamento", icon: "calendar" },
    { label: "Relatórios", href: "/obras/relatorios", icon: "chart" },
    { label: "Configurações", href: "/obras/config", icon: "settings" },
  ],
  investidor: [
    { label: "Home", href: "/investidor", icon: "layout" },
    { label: "Carteira", href: "/investidor/carteira", icon: "chart" },
    { label: "Suporte", href: "/investidor/suporte", icon: "user" },
    { label: "Relatórios", href: "/investidor/relatorios", icon: "chart" },
    { label: "Configurações", href: "/investidor/config", icon: "settings" },
  ],
  terrenista: [
    { label: "Home", href: "/terrenista", icon: "layout" },
    { label: "Status", href: "/terrenista/status", icon: "chart" },
    { label: "Pagamentos", href: "/terrenista/pagamentos", icon: "chart" },
    { label: "Relatórios", href: "/terrenista/relatorios", icon: "chart" },
    { label: "Configurações", href: "/terrenista/config", icon: "settings" },
  ],
};

export function inferMenuKey(pathname: string) {
  const key = (pathname.split("/")[1] || "adminfilial").toLowerCase();
  return key;
}
