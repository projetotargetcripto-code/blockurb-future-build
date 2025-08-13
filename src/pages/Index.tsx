import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Cpu,
  Coins,
  Store,
  Users,
  BadgeCheck,
  Rocket,
  MapPinned,
  Building2,
  Timer,
  HandCoins,
  Layers3,
} from "lucide-react";
import { StatsSection } from "@/components/sections/Stats";
import { LogoRowSection } from "@/components/sections/LogoRow";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { FAQSection } from "@/components/sections/FAQ";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import heroImg from "@/assets/hero-blockurb.webp";
import aboutImg from "@/assets/about-blockurb.webp";
import impactoImg from "@/assets/impacto-blockurb.webp";
import qrImg from "@/assets/qr-agendamento.webp";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useParallax } from "@/hooks/useParallax";

const Index = () => {
  const sectionIds = ["sobre","solucao","franquia","beneficios","passos","contato"];
  const activeSection = useScrollSpy(sectionIds, { rootMargin: "-45% 0px -45% 0px" });
  const { ref: heroParallaxRef, style: heroParallaxStyle } = useParallax(0.25);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 glass">
        <nav className="container flex items-center justify-between h-14">
          <a href="#" className="font-bold tracking-tight text-lg">
            <span className="text-primary">Block</span>URB
          </a>
          <div className="hidden sm:flex items-center gap-3">
            <a href="#sobre" className={cn("story-link text-sm", activeSection==="sobre" && "text-primary")} aria-current={activeSection==="sobre" ? "page" : undefined}>Sobre</a>
            <a href="#solucao" className={cn("story-link text-sm", activeSection==="solucao" && "text-primary")} aria-current={activeSection==="solucao" ? "page" : undefined}>Solução</a>
            <a href="#franquia" className={cn("story-link text-sm", activeSection==="franquia" && "text-primary")} aria-current={activeSection==="franquia" ? "page" : undefined}>Franquia</a>
            <a href="#beneficios" className={cn("story-link text-sm", activeSection==="beneficios" && "text-primary")} aria-current={activeSection==="beneficios" ? "page" : undefined}>Tokenização</a>
            <a href="#passos" className={cn("story-link text-sm", activeSection==="passos" && "text-primary")} aria-current={activeSection==="passos" ? "page" : undefined}>Próximos passos</a>
            <a href="#contato">
              <Button variant="cta" size="sm" className="hover-scale btn-glow">Falar com Especialista</Button>
            </a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section id="hero" className="relative">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={heroImg}
              alt="Bairro planejado com tecnologia e natureza integrada"
              className="desat w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
            <div className="absolute inset-0 pattern-grid opacity-20 pointer-events-none" ref={heroParallaxRef} style={heroParallaxStyle} />
          </div>

          <div className="relative container min-h-[70vh] sm:min-h-[78vh] flex items-center animate-enter">
            <div className="max-w-2xl py-16">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs">
                <BadgeCheck className="opacity-80" /> Licenças limitadas por território
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight gradient-text">
                A Nova Geração de Urbanização Inteligente
              </h1>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Franquia BlockURB — Urbanismo + Tecnologia + Tokenização Parcial
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a href="#franquia">
                  <Button variant="hero" size="lg" className="hover-scale btn-glow">Garanta sua Região</Button>
                </a>
                <a href="#contato">
                  <Button variant="cta" size="lg" className="hover-scale btn-glow">Falar com Especialista</Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="container py-16 grid md:grid-cols-2 gap-10 items-center scroll-mt-24">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Sobre a BlockURB</h2>
            <p className="mt-4 text-muted-foreground">
              Somos uma urbanizadora moderna que transforma glebas em projetos de alto valor, unindo franquia, tecnologia e tokenização parcial para acelerar vendas e reduzir riscos.
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3">
                <Building2 className="text-primary mt-1" />
                <span>Urbanização planejada e padronizada</span>
              </li>
              <li className="flex items-start gap-3">
                <Cpu className="text-primary mt-1" />
                <span>Plataforma digital integrada</span>
              </li>
              <li className="flex items-start gap-3">
                <Coins className="text-primary mt-1" />
                <span>Tokenização parcial para atrair investidores de todos os portes</span>
              </li>
            </ul>
          </div>
          <div className="image-card relative">
            <img
              src={aboutImg}
              alt="Ilustração de masterplan e urbanização planejada"
              className="desat w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        {/* Problema */}
        <section id="problema" className="bg-muted/60 border-y border-border scroll-mt-24">
          <div className="container py-16">
            <h2 className="text-2xl sm:text-3xl font-semibold">Por que o modelo tradicional está ultrapassado?</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="card-elevated">
                <HandCoins />
                <p className="mt-3">Investimento imobiliário restrito a grandes players</p>
              </div>
              <div className="card-elevated">
                <Timer />
                <p className="mt-3">Urbanização lenta e com altos custos</p>
              </div>
              <div className="card-elevated">
                <Layers3 />
                <p className="mt-3">Distratos e gargalos administrativos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solução */}
        <section id="solucao" className="container py-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold">Urbanismo Inteligente + Tokenização Parcial</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl">
            Um modelo plug-and-play que une o melhor do mercado tradicional com o futuro dos investimentos. A tokenização parcial permite que pequenos investidores participem, sem eliminar o formato convencional de aquisição de lotes.
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center gap-2">
              <Cpu className="text-primary" />
              <span>Tecnologia</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Coins className="text-primary" />
              <span>Tokenização</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Store className="text-primary" />
              <span>Franquia</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Users className="text-primary" />
              <span>Comunidade</span>
            </div>
          </div>
        </section>

        <StatsSection />
        <LogoRowSection />

        {/* Retorno Triplo */}
        <section id="retorno" className="container py-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold">Três públicos, três fontes de retorno</h2>
          {/* Mobile Carousel */}
          <div className="mt-8 md:hidden">
            <Carousel>
              <CarouselContent>
                <CarouselItem>
                  <div className="card-elevated">
                    <h3 className="font-semibold">Franqueado</h3>
                    <p className="text-muted-foreground mt-2">Lucro recorrente com vendas e valorização</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="card-elevated">
                    <h3 className="font-semibold">Investidor</h3>
                    <p className="text-muted-foreground mt-2">Liquidez e acessibilidade (investir a partir de R$ 100)</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className="card-elevated">
                    <h3 className="font-semibold">Terrenista</h3>
                    <p className="text-muted-foreground mt-2">Monetização rápida da gleba com valorização antecipada</p>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex items-center justify-end gap-2 mt-4">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          </div>
          {/* Desktop Cards */}
          <div className="mt-8 hidden md:grid md:grid-cols-3 gap-6">
            <article className="card-elevated">
              <h3 className="font-semibold">Franqueado</h3>
              <p className="text-muted-foreground mt-2">Lucro recorrente com vendas e valorização</p>
            </article>
            <article className="card-elevated">
              <h3 className="font-semibold">Investidor</h3>
              <p className="text-muted-foreground mt-2">Liquidez e acessibilidade (investir a partir de R$ 100)</p>
            </article>
            <article className="card-elevated">
              <h3 className="font-semibold">Terrenista</h3>
              <p className="text-muted-foreground mt-2">Monetização rápida da gleba com valorização antecipada</p>
            </article>
          </div>
        </section>

        {/* Modelo de Franquia */}
        <section id="franquia" className="container py-16 scroll-mt-24">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-semibold">Modelo de Franquia</h2>
            <p className="mt-4 text-muted-foreground">
              Você opera com exclusividade territorial e suporte completo da BlockURB.
            </p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              <li className="flex items-start gap-3"><BadgeCheck className="text-primary mt-0.5"/> Equipe de urbanismo</li>
              <li className="flex items-start gap-3"><BadgeCheck className="text-primary mt-0.5"/> Plataforma de vendas e marketing</li>
              <li className="flex items-start gap-3"><BadgeCheck className="text-primary mt-0.5"/> Tokenização e captação de investidores</li>
              <li className="flex items-start gap-3"><BadgeCheck className="text-primary mt-0.5"/> Suporte jurídico e contábil</li>
            </ul>
            <div className="mt-6 badge-scalable w-fit">Modelo escalável • Operação simplificada</div>
          </div>
        </section>

        {/* Benefícios da Tokenização */}
        <section id="beneficios" className="scroll-mt-24">
          <div className="container py-16 text-accent-foreground">
            <h2 className="text-2xl sm:text-3xl font-semibold">Benefícios da Tokenização</h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="card-elevated bg-background/70"><Rocket className="text-primary"/> <p className="mt-2">Captação mais rápida</p></div>
              <div className="card-elevated bg-background/70"><HandCoins className="text-primary"/> <p className="mt-2">Menos risco de capital próprio</p></div>
              <div className="card-elevated bg-background/70"><Users className="text-primary"/> <p className="mt-2">Comunidade de investidores em cada projeto</p></div>
              <div className="card-elevated bg-background/70"><Coins className="text-primary"/> <p className="mt-2">Facilidade de revenda de cotas</p></div>
            </div>
          </div>
        </section>

        {/* Impacto Social */}
        <section id="impacto" className="container py-16 grid md:grid-cols-2 gap-10 items-center scroll-mt-24">
          <div className="image-card relative order-2 md:order-1">
            <img
              src={impactoImg}
              alt="Bairro sustentável e integrado socialmente"
              className="desat w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl sm:text-3xl font-semibold">Impacto Social</h2>
            <p className="mt-4 text-muted-foreground">
              Mais do que empreendimentos, criamos comunidades planejadas e oportunidades reais de valorização.
            </p>
            <p className="mt-2 text-muted-foreground">
              Integramos marketplace e iniciativas sociais para fortalecer a economia local.
            </p>
          </div>
        </section>

        <TestimonialsSection />
        <FAQSection />

        {/* Perfis */}
        <section id="perfis" className="container py-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold">Perfis que Podem Franquear</h2>
          <p className="mt-4 text-muted-foreground max-w-3xl">
            Investidores, incorporadoras, empreendedores, arquitetos, engenheiros, advogados, produtores rurais, donos de imobiliárias.
          </p>
          <p className="mt-2 text-sm opacity-80">Uma licença por território. Escassez planejada.</p>
        </section>

        {/* Próximos Passos */}
        <section id="passos" className="container py-16 scroll-mt-24">
          <h2 className="text-2xl sm:text-3xl font-semibold">Pronto para transformar sua região?</h2>
          <ol className="mt-6 space-y-4">
            <li className="flex gap-3"><span className="font-semibold">1.</span> Agende um diagnóstico do território</li>
            <li className="flex gap-3"><span className="font-semibold">2.</span> Receba análise de viabilidade e plano tokenizado</li>
            <li className="flex gap-3"><span className="font-semibold">3.</span> Inicie seu primeiro loteamento com suporte completo</li>
          </ol>
          <div className="mt-6">
            <a href="#contato">
              <Button variant="hero" size="lg" className="hover-scale btn-glow">Falar com Especialista</Button>
            </a>
          </div>
        </section>

        {/* Contato / Footer */}
        <section id="contato" className="bg-muted/60 border-t border-border scroll-mt-24">
          <footer className="container py-12 grid md:grid-cols-[1.2fr_1fr_auto] gap-8 items-center">
            <div>
              <div className="text-2xl font-bold"><span className="text-primary">Block</span>URB</div>
              <p className="mt-2 text-muted-foreground">© {new Date().getFullYear()} BlockURB. Todos os direitos reservados.</p>
            </div>
            <div>
              <h3 className="font-semibold">Contatos</h3>
              <ul className="mt-3 space-y-2">
                <li><a className="story-link" href="#">WhatsApp</a></li>
                <li><a className="story-link" href="mailto:contato@blockurb.com">contato@blockurb.com</a></li>
              </ul>
            </div>
            <aside className="hidden md:flex flex-col items-center">
              <img src={qrImg} alt="QR code para agendamento com especialista" className="w-32 h-32 border border-border rounded" loading="lazy" decoding="async" />
              <span className="mt-2 text-xs opacity-80">Escaneie para agendar</span>
            </aside>
          </footer>
        </section>
      </main>

      {/* CTA fixo mobile */}
      <div className="fixed bottom-0 inset-x-0 sm:hidden z-50 bg-background/95 backdrop-blur border-t border-border p-3">
        <div className="container">
          <a href="#contato">
            <Button variant="hero" className="w-full hover-scale btn-glow">Falar com Especialista</Button>
          </a>
        </div>
      </div>

      {/* CTA flutuante desktop */}
      <div className="hidden sm:block fixed bottom-6 right-6 z-50">
        <a href="#contato">
          <Button variant="cta" size="lg" className="hover-scale btn-glow">Falar com Especialista</Button>
        </a>
      </div>
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
