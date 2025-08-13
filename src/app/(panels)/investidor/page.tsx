import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { LineChart } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="investidor" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Investidor' }]}>
        <EmptyState title="Investidor" description="Template base para o painel do Investidor."
          icon={<LineChart className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
