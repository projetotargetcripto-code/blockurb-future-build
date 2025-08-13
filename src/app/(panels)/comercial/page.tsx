import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { Briefcase } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="comercial" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Comercial' }]}>
        <EmptyState title="Comercial" description="Template base para o painel Comercial."
          icon={<Briefcase className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
