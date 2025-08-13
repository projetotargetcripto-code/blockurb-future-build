import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { useEffect } from "react";

export default function EmpreendimentoNovo() {
  useEffect(() => { document.title = "Novo Empreendimento | BlockURB"; }, []);

  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="adminfilial" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admin' }, { label: 'Empreendimentos' }, { label: 'Novo' }]}> 
        <header className="mb-4">
          <h1 className="text-2xl font-semibold">Novo Empreendimento</h1>
          <p className="text-sm text-muted-foreground">Envie o GeoJSON, masterplan e defina os limites para pré-visualizar no mapa.</p>
        </header>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-[14px] border border-border bg-secondary/60 p-4">
            <h2 className="font-medium mb-2">Formulário (em breve)</h2>
            <p className="text-sm text-muted-foreground">Placeholder da funcionalidade completa. Implementação detalhada virá na próxima etapa.</p>
          </section>
          <section className="rounded-[14px] border border-border bg-secondary/60 p-4">
            <h2 className="font-medium mb-2">Pré-visualização</h2>
            <div className="h-[520px] grid place-items-center text-muted-foreground text-sm">
              Mapa Leaflet e overlay do masterplan serão exibidos aqui.
            </div>
          </section>
        </div>
      </AppShell>
    </Protected>
  );
}
