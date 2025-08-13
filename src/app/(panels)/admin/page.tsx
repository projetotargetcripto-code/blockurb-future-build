import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { KPIStat } from "@/components/app/KPIStat";
import { FiltersBar } from "@/components/app/FiltersBar";
import { DataTable } from "@/components/app/DataTable";
import { ChartPlaceholder } from "@/components/app/ChartPlaceholder";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, FileText, Target } from "lucide-react";
import { adminKPIs } from "@/mocks/kpis";
import { adminTeamColumns, adminTeamRows } from "@/mocks/tables";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="admin" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Admin', href: '/admin' }, { label: 'Dashboard' }]}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPIs */}
          <div className="rounded-[14px]">
            <KPIStat label={adminKPIs[0].label} value={adminKPIs[0].value} icon={<Building2 className="text-primary" />} />
          </div>
          <div className="rounded-[14px]">
            <KPIStat label={adminKPIs[1].label} value={adminKPIs[1].value} tone="warning" icon={<FileText className="text-accent" />} />
          </div>
          <div className="rounded-[14px]">
            <KPIStat label={adminKPIs[2].label} value={adminKPIs[2].value} delta={adminKPIs[2].delta} tone="positive" icon={<FileText className="text-primary" />} />
          </div>
          <div className="rounded-[14px]">
            <KPIStat label={adminKPIs[3].label} value={adminKPIs[3].value} delta={adminKPIs[3].delta} tone="positive" icon={<Target className="text-primary" />} />
          </div>
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
            <h3 className="mb-2 font-semibold">Equipe</h3>
            <DataTable columns={adminTeamColumns} rows={adminTeamRows} pageSize={5} />
          </div>
          <div>
            <ChartPlaceholder title="Vendas por semana" />
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
