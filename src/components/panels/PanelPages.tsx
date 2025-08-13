import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { KPIStat } from "@/components/app/KPIStat";
import { FiltersBar } from "@/components/app/FiltersBar";
import { DataTable } from "@/components/app/DataTable";
import { ChartPlaceholder } from "@/components/app/ChartPlaceholder";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, FileText, Target, Plus } from "lucide-react";
import { adminTeamColumns, adminTeamRows } from "@/mocks/tables";
import { Link } from "react-router-dom";
export function PanelHomePage({ menuKey, title }: { menuKey: string; title: string }) {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey={menuKey} breadcrumbs={[{ label: 'Home', href: '/' }, { label: title }]}>
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-xl font-semibold">Ações rápidas</h2>
          <Link to="/admin/empreendimentos/novo">
            <Button variant="cta" className="gap-2"><Plus className="size-4" /> Novo Empreendimento</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPIStat label="Indicador A" value={128} icon={<Building2 className="text-primary" />} />
          <KPIStat label="Indicador B" value={12} icon={<FileText className="text-accent" />} tone="warning" />
          <KPIStat label="Indicador C" value={46} delta="+12%" icon={<FileText className="text-primary" />} tone="positive" />
          <KPIStat label="Indicador D" value="18%" delta="+2pp" icon={<Target className="text-primary" />} tone="positive" />
        </div>

        <div className="mt-6">
          <FiltersBar>
            {/* TODO: ligar selects a dados reais */}
            <Select defaultValue="alfa">
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Empreendimento" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="alfa">Alfa</SelectItem>
                <SelectItem value="beta">Beta</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="todos">
              <SelectTrigger className="w-[200px]"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="disponivel">Disponível</SelectItem>
                <SelectItem value="reservado">Reservado</SelectItem>
                <SelectItem value="vendido">Vendido</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="cta">Aplicar filtros</Button>
          </FiltersBar>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <h3 className="mb-2 font-semibold">Tabela exemplo</h3>
            <DataTable columns={adminTeamColumns} rows={adminTeamRows} pageSize={5} />
          </div>
          <div>
            <ChartPlaceholder title="Gráfico (placeholder)" />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="mb-2 font-semibold">Mapa (placeholder)</h3>
          <div className="rounded-[14px] border border-border bg-secondary/60 h-[380px] grid place-items-center text-sm text-muted-foreground">
            {/* TODO: integrar Leaflet + RPC lotes_geojson */}
            Integração futura com Leaflet / RPC lotes_geojson
            <div className="mt-4">
              <Button variant="outline">Abrir mapa completo</Button>
            </div>
          </div>
        </div>
      </AppShell>
    </Protected>
  );
}

export function PanelSectionPage({ menuKey, title, section }: { menuKey: string; title: string; section: string }) {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey={menuKey} breadcrumbs={[{ label: 'Home', href: '/' }, { label: title }, { label: section }]}>
        {/* TODO: Substituir por conteúdo real desta seção */}
        <div className="rounded-[14px] border border-border bg-secondary/60 p-6">
          <h2 className="text-xl font-semibold">{title} — {section}</h2>
          <p className="mt-2 text-sm text-muted-foreground">Template de seção com dados mock. Integração real virá na próxima fase.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <ChartPlaceholder title="KPI da seção (placeholder)" />
            <ChartPlaceholder title="Tendências (placeholder)" />
          </div>
        </div>
      </AppShell>
    </Protected>
  );
}
