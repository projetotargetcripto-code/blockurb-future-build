import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { Calculator } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="contabilidade" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contabilidade' }]}>
        <EmptyState title="Contabilidade" description="Template base para o painel de Contabilidade."
          icon={<Calculator className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
