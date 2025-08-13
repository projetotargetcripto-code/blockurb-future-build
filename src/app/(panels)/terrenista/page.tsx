import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { Landmark } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="terrenista" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Terrenista' }]}>
        <EmptyState title="Terrenista" description="Template base para o painel do Terrenista."
          icon={<Landmark className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
