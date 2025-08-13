import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { Map } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="urbanismo" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Urbanismo' }]}>
        <EmptyState title="Urbanismo" description="Template base para o painel de Urbanismo."
          icon={<Map className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
