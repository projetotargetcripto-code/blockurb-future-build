export type NavEntry = { label: string; href: string; icon?: string };

export const NAV: Record<string, NavEntry[]> = {
  admin: [
    { label: "Dashboard", href: "/admin", icon: "layout" },
    { label: "Equipe", href: "/admin#equipe", icon: "users" },
    { label: "Leads", href: "/admin#leads", icon: "inbox" },
    { label: "Propostas", href: "/admin#propostas", icon: "file" },
    { label: "Mapa", href: "/admin#mapa", icon: "map" },
    { label: "Relatórios", href: "/admin#relatorios", icon: "chart" },
    { label: "Configurações", href: "/admin#config", icon: "settings" },
  ],
  "super-admin": [
    { label: "Dashboard", href: "/super-admin", icon: "shield" },
    { label: "Organizações", href: "/super-admin#orgs", icon: "building" },
    { label: "Filiais", href: "/super-admin#filiais", icon: "network" },
    { label: "Usuários", href: "/super-admin#users", icon: "user" },
    { label: "Relatórios", href: "/super-admin#reports", icon: "chart" },
    { label: "Configurações", href: "/super-admin#config", icon: "settings" },
  ],
  urbanismo: [
    { label: "Dashboard", href: "/urbanismo", icon: "layout" },
    { label: "Projetos", href: "/urbanismo#projetos", icon: "map" },
    { label: "Mapas", href: "/urbanismo#mapas", icon: "map" },
    { label: "Relatórios", href: "/urbanismo#relatorios", icon: "chart" },
    { label: "Configurações", href: "/urbanismo#config", icon: "settings" },
  ],
  juridico: [
    { label: "Dashboard", href: "/juridico", icon: "layout" },
    { label: "Contratos", href: "/juridico#contratos", icon: "file" },
    { label: "Processos", href: "/juridico#processos", icon: "file" },
    { label: "Relatórios", href: "/juridico#relatorios", icon: "chart" },
    { label: "Configurações", href: "/juridico#config", icon: "settings" },
  ],
  contabilidade: [
    { label: "Dashboard", href: "/contabilidade", icon: "layout" },
    { label: "Financeiro", href: "/contabilidade#financeiro", icon: "chart" },
    { label: "Relatórios", href: "/contabilidade#relatorios", icon: "chart" },
    { label: "Configurações", href: "/contabilidade#config", icon: "settings" },
  ],
  marketing: [
    { label: "Dashboard", href: "/marketing", icon: "layout" },
    { label: "Campanhas", href: "/marketing#campanhas", icon: "inbox" },
    { label: "Materiais", href: "/marketing#materiais", icon: "file" },
    { label: "Relatórios", href: "/marketing#relatorios", icon: "chart" },
  ],
  comercial: [
    { label: "Dashboard", href: "/comercial", icon: "layout" },
    { label: "Leads", href: "/comercial#leads", icon: "inbox" },
    { label: "Propostas", href: "/comercial#propostas", icon: "file" },
    { label: "Relatórios", href: "/comercial#relatorios", icon: "chart" },
  ],
  imobiliaria: [
    { label: "Dashboard", href: "/imobiliaria", icon: "layout" },
    { label: "Corretores", href: "/imobiliaria#corretores", icon: "users" },
    { label: "Imóveis", href: "/imobiliaria#imoveis", icon: "building" },
    { label: "Relatórios", href: "/imobiliaria#relatorios", icon: "chart" },
  ],
  corretor: [
    { label: "Dashboard", href: "/corretor", icon: "layout" },
    { label: "Leads", href: "/corretor#leads", icon: "inbox" },
    { label: "Agenda", href: "/corretor#agenda", icon: "calendar" },
    { label: "Vendas", href: "/corretor#vendas", icon: "chart" },
  ],
  obras: [
    { label: "Dashboard", href: "/obras", icon: "layout" },
    { label: "Cronograma", href: "/obras#cronograma", icon: "calendar" },
    { label: "Relatórios", href: "/obras#relatorios", icon: "chart" },
  ],
  investidor: [
    { label: "Dashboard", href: "/investidor", icon: "layout" },
    { label: "Investimentos", href: "/investidor#investimentos", icon: "chart" },
    { label: "Relatórios", href: "/investidor#relatorios", icon: "chart" },
  ],
  terrenista: [
    { label: "Dashboard", href: "/terrenista", icon: "layout" },
    { label: "Projeto", href: "/terrenista#projeto", icon: "file" },
    { label: "Status", href: "/terrenista#status", icon: "chart" },
  ],
};

export function inferMenuKey(pathname: string) {
  const key = (pathname.split("/")[1] || "admin").toLowerCase();
  return key;
}
