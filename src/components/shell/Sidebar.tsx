import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NAV, inferMenuKey } from "@/config/nav";
import {
  LayoutDashboard,
  Users,
  Inbox,
  FileText,
  Map,
  BarChart3,
  Settings,
  Building2,
  Network,
  User,
  Shield,
  Calendar,
  Circle,
} from "lucide-react";

function IconByName({ name }: { name?: string }) {
  const map: Record<string, any> = {
    layout: LayoutDashboard,
    users: Users,
    inbox: Inbox,
    file: FileText,
    map: Map,
    chart: BarChart3,
    settings: Settings,
    building: Building2,
    network: Network,
    user: User,
    shield: Shield,
    calendar: Calendar,
  };
  const Comp = (name && map[name]) || Circle;
  return <Comp className="mr-2 h-4 w-4" />;
}

export function AppSidebar({ menuKey }: { menuKey?: string }) {
  const location = useLocation();
  const current = location.pathname;
  const key = menuKey || inferMenuKey(current);
  const items = NAV[key] || [];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="px-2 py-2 text-sm font-semibold">Navegação</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={current === item.href}>
                    <NavLink to={item.href} className={({ isActive }) => cn(isActive && "text-primary font-medium") }>
                      <IconByName name={item.icon} />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-2 text-xs text-muted-foreground">BlockURB © {new Date().getFullYear()}</div>
      </SidebarFooter>
    </Sidebar>
  );
}
