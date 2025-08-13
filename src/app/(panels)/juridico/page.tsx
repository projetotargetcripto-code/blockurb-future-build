import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { ScrollText } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="juridico" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Jurídico' }]}>
        <EmptyState title="Jurídico" description="Template base para o painel Jurídico."
          icon={<ScrollText className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
