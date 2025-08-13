import React from "react";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import { Topbar } from "./Topbar";
import { AppSidebar } from "./Sidebar";

export interface AppShellProps {
  breadcrumbs?: { label: string; href?: string }[];
  menuKey?: string;
  children: React.ReactNode;
}

export function AppShell({ breadcrumbs = [], menuKey, children }: AppShellProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-background text-foreground">
        <div className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
          <div className="h-14 container flex items-center gap-3">
            <SidebarTrigger className="mr-2" aria-label="Alternar menu" />
            <Topbar breadcrumbs={breadcrumbs} />
          </div>
        </div>

        <div className="flex min-h-[calc(100vh-56px)] w-full">
          <AppSidebar menuKey={menuKey} />
          <SidebarInset>
            <main className="container py-6">
              <div className="mt-4">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
