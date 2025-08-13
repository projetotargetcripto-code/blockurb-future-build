import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProgressBar } from "@/components/ui/ProgressBar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Whitepaper from "./pages/Whitepaper";
import Acesso from "./pages/Acesso";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Reset from "./pages/Reset";
import LoginSuperAdmin from "./pages/login/SuperAdmin";
import LoginAdmin from "./pages/login/Admin";
import LoginImobiliaria from "./pages/login/Imobiliaria";
import LoginCorretor from "./pages/login/Corretor";
import LoginJuridico from "./pages/login/Juridico";
import LoginUrbanismo from "./pages/login/Urbanismo";
import LoginContabilidade from "./pages/login/Contabilidade";
import LoginMarketing from "./pages/login/Marketing";
import LoginComercial from "./pages/login/Comercial";
import LoginObras from "./pages/login/Obras";
import LoginInvestidor from "./pages/login/Investidor";
import LoginTerrenista from "./pages/login/Terrenista";
import { AuthProvider } from "@/providers/AuthProvider";
import { PanelHomePage, PanelSectionPage } from "@/components/panels/PanelPages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ProgressBar />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/whitepaper" element={<Whitepaper />} />
            <Route path="/acesso" element={<Acesso />} />

            {/* Auth base routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<Reset />} />

            {/* Auth scoped routes */}
            <Route path="/login/super-admin" element={<LoginSuperAdmin />} />
            <Route path="/login/admin" element={<LoginAdmin />} />
            <Route path="/login/imobiliaria" element={<LoginImobiliaria />} />
            <Route path="/login/corretor" element={<LoginCorretor />} />
            <Route path="/login/juridico" element={<LoginJuridico />} />
            <Route path="/login/urbanismo" element={<LoginUrbanismo />} />
            <Route path="/login/contabilidade" element={<LoginContabilidade />} />
            <Route path="/login/marketing" element={<LoginMarketing />} />
            <Route path="/login/comercial" element={<LoginComercial />} />
            <Route path="/login/obras" element={<LoginObras />} />
            <Route path="/login/investidor" element={<LoginInvestidor />} />
            <Route path="/login/terrenista" element={<LoginTerrenista />} />

            {/* Panels - rotas curtas */}
            {/* Super Admin */}
            <Route path="/superadmin" element={<PanelHomePage menuKey="superadmin" title="Super Admin" />} />
            <Route path="/superadmin/relatorios" element={<PanelSectionPage menuKey="superadmin" title="Super Admin" section="Relatórios" />} />
            <Route path="/superadmin/config" element={<PanelSectionPage menuKey="superadmin" title="Super Admin" section="Configurações" />} />
            <Route path="/superadmin/organizacoes" element={<PanelSectionPage menuKey="superadmin" title="Super Admin" section="Organizações" />} />
            <Route path="/superadmin/usuarios" element={<PanelSectionPage menuKey="superadmin" title="Super Admin" section="Usuários" />} />

            {/* Admin Filial */}
            <Route path="/adminfilial" element={<PanelHomePage menuKey="adminfilial" title="Admin Filial" />} />
            <Route path="/adminfilial/relatorios" element={<PanelSectionPage menuKey="adminfilial" title="Admin Filial" section="Relatórios" />} />
            <Route path="/adminfilial/config" element={<PanelSectionPage menuKey="adminfilial" title="Admin Filial" section="Configurações" />} />
            <Route path="/adminfilial/equipe" element={<PanelSectionPage menuKey="adminfilial" title="Admin Filial" section="Equipe" />} />
            <Route path="/adminfilial/empreendimentos" element={<PanelSectionPage menuKey="adminfilial" title="Admin Filial" section="Empreendimentos" />} />
            {/* Alias antigo */}
            <Route path="/admin" element={<PanelHomePage menuKey="adminfilial" title="Admin Filial" />} />

            {/* Urbanista */}
            <Route path="/urbanista" element={<PanelHomePage menuKey="urbanista" title="Urbanista" />} />
            <Route path="/urbanista/relatorios" element={<PanelSectionPage menuKey="urbanista" title="Urbanista" section="Relatórios" />} />
            <Route path="/urbanista/config" element={<PanelSectionPage menuKey="urbanista" title="Urbanista" section="Configurações" />} />
            <Route path="/urbanista/mapas" element={<PanelSectionPage menuKey="urbanista" title="Urbanista" section="Mapas" />} />
            <Route path="/urbanista/projetos" element={<PanelSectionPage menuKey="urbanista" title="Urbanista" section="Projetos" />} />

            {/* Jurídico */}
            <Route path="/juridico" element={<PanelHomePage menuKey="juridico" title="Jurídico" />} />
            <Route path="/juridico/relatorios" element={<PanelSectionPage menuKey="juridico" title="Jurídico" section="Relatórios" />} />
            <Route path="/juridico/config" element={<PanelSectionPage menuKey="juridico" title="Jurídico" section="Configurações" />} />
            <Route path="/juridico/contratos" element={<PanelSectionPage menuKey="juridico" title="Jurídico" section="Contratos" />} />
            <Route path="/juridico/processos" element={<PanelSectionPage menuKey="juridico" title="Jurídico" section="Processos" />} />

            {/* Contabilidade */}
            <Route path="/contabilidade" element={<PanelHomePage menuKey="contabilidade" title="Contabilidade" />} />
            <Route path="/contabilidade/relatorios" element={<PanelSectionPage menuKey="contabilidade" title="Contabilidade" section="Relatórios" />} />
            <Route path="/contabilidade/config" element={<PanelSectionPage menuKey="contabilidade" title="Contabilidade" section="Configurações" />} />
            <Route path="/contabilidade/financeiro" element={<PanelSectionPage menuKey="contabilidade" title="Contabilidade" section="Financeiro" />} />
            <Route path="/contabilidade/fiscal" element={<PanelSectionPage menuKey="contabilidade" title="Contabilidade" section="Fiscal" />} />

            {/* Marketing */}
            <Route path="/marketing" element={<PanelHomePage menuKey="marketing" title="Marketing" />} />
            <Route path="/marketing/relatorios" element={<PanelSectionPage menuKey="marketing" title="Marketing" section="Relatórios" />} />
            <Route path="/marketing/config" element={<PanelSectionPage menuKey="marketing" title="Marketing" section="Configurações" />} />
            <Route path="/marketing/campanhas" element={<PanelSectionPage menuKey="marketing" title="Marketing" section="Campanhas" />} />
            <Route path="/marketing/materiais" element={<PanelSectionPage menuKey="marketing" title="Marketing" section="Materiais" />} />

            {/* Comercial */}
            <Route path="/comercial" element={<PanelHomePage menuKey="comercial" title="Comercial" />} />
            <Route path="/comercial/relatorios" element={<PanelSectionPage menuKey="comercial" title="Comercial" section="Relatórios" />} />
            <Route path="/comercial/config" element={<PanelSectionPage menuKey="comercial" title="Comercial" section="Configurações" />} />
            <Route path="/comercial/leads" element={<PanelSectionPage menuKey="comercial" title="Comercial" section="Leads" />} />
            <Route path="/comercial/propostas" element={<PanelSectionPage menuKey="comercial" title="Comercial" section="Propostas" />} />

            {/* Imobiliária */}
            <Route path="/imobiliaria" element={<PanelHomePage menuKey="imobiliaria" title="Imobiliária" />} />
            <Route path="/imobiliaria/relatorios" element={<PanelSectionPage menuKey="imobiliaria" title="Imobiliária" section="Relatórios" />} />
            <Route path="/imobiliaria/config" element={<PanelSectionPage menuKey="imobiliaria" title="Imobiliária" section="Configurações" />} />
            <Route path="/imobiliaria/corretores" element={<PanelSectionPage menuKey="imobiliaria" title="Imobiliária" section="Corretores" />} />
            <Route path="/imobiliaria/leads" element={<PanelSectionPage menuKey="imobiliaria" title="Imobiliária" section="Leads" />} />

            {/* Corretor */}
            <Route path="/corretor" element={<PanelHomePage menuKey="corretor" title="Corretor" />} />
            <Route path="/corretor/relatorios" element={<PanelSectionPage menuKey="corretor" title="Corretor" section="Relatórios" />} />
            <Route path="/corretor/config" element={<PanelSectionPage menuKey="corretor" title="Corretor" section="Configurações" />} />
            <Route path="/corretor/leads" element={<PanelSectionPage menuKey="corretor" title="Corretor" section="Leads" />} />
            <Route path="/corretor/vendas" element={<PanelSectionPage menuKey="corretor" title="Corretor" section="Vendas" />} />

            {/* Obras */}
            <Route path="/obras" element={<PanelHomePage menuKey="obras" title="Obras" />} />
            <Route path="/obras/relatorios" element={<PanelSectionPage menuKey="obras" title="Obras" section="Relatórios" />} />
            <Route path="/obras/config" element={<PanelSectionPage menuKey="obras" title="Obras" section="Configurações" />} />
            <Route path="/obras/cronograma" element={<PanelSectionPage menuKey="obras" title="Obras" section="Cronograma" />} />
            <Route path="/obras/andamento" element={<PanelSectionPage menuKey="obras" title="Obras" section="Andamento" />} />

            {/* Investidor */}
            <Route path="/investidor" element={<PanelHomePage menuKey="investidor" title="Investidor" />} />
            <Route path="/investidor/relatorios" element={<PanelSectionPage menuKey="investidor" title="Investidor" section="Relatórios" />} />
            <Route path="/investidor/config" element={<PanelSectionPage menuKey="investidor" title="Investidor" section="Configurações" />} />
            <Route path="/investidor/carteira" element={<PanelSectionPage menuKey="investidor" title="Investidor" section="Carteira" />} />
            <Route path="/investidor/suporte" element={<PanelSectionPage menuKey="investidor" title="Investidor" section="Suporte" />} />

            {/* Terrenista */}
            <Route path="/terrenista" element={<PanelHomePage menuKey="terrenista" title="Terrenista" />} />
            <Route path="/terrenista/relatorios" element={<PanelSectionPage menuKey="terrenista" title="Terrenista" section="Relatórios" />} />
            <Route path="/terrenista/config" element={<PanelSectionPage menuKey="terrenista" title="Terrenista" section="Configurações" />} />
            <Route path="/terrenista/status" element={<PanelSectionPage menuKey="terrenista" title="Terrenista" section="Status" />} />
            <Route path="/terrenista/pagamentos" element={<PanelSectionPage menuKey="terrenista" title="Terrenista" section="Pagamentos" />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
