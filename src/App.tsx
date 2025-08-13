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
import AdminDashboard from "./pages/AdminDashboard";

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

            {/* Example admin shell */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
