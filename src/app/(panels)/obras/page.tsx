import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { Hammer } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="obras" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Obras' }]}>
        <EmptyState title="Obras" description="Template base para o painel de Obras."
          icon={<Hammer className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
