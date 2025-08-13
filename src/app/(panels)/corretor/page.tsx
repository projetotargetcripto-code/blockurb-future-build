import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { User } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="corretor" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Corretor' }]}>
        <EmptyState title="Corretor" description="Template base para o painel do Corretor."
          icon={<User className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
