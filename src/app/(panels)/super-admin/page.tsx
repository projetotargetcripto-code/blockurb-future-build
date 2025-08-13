import { Protected } from "@/components/Protected";
import { AppShell } from "@/components/shell/AppShell";
import { EmptyState } from "@/components/app/EmptyState";
import { Shield } from "lucide-react";

export default function Page() {
  return (
    <Protected debugBypass={true}>
      <AppShell menuKey="super-admin" breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Super Admin' }]}>
        <EmptyState title="Super Admin" description="Template base para o painel do Super Admin."
          icon={<Shield className="size-12 text-muted-foreground" />} />
      </AppShell>
    </Protected>
  );
}
