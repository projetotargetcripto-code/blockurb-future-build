import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { Megaphone } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="marketing" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Marketing' }]}>
        <EmptyState title="Marketing" description="Template base para o painel de Marketing."
          icon={<Megaphone className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
