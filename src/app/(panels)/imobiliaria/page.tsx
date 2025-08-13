import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { Building2 } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="imobiliaria" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Imobiliária' }]}>
        <EmptyState title="Imobiliária" description="Template base para o painel da Imobiliária."
          icon={<Building2 className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
