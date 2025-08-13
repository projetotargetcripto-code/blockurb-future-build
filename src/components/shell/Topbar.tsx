import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/providers/AuthProvider";
import { Bell, Search, User as UserIcon, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Topbar({ breadcrumbs }: { breadcrumbs?: { label: string; href?: string }[] }) {
  const { user } = useAuth();
  const initials = (user?.email || "BU").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
      <div className="h-14 container flex items-center gap-3">
        {/* O trigger do Sidebar deve estar no layout pai */}
        <a href="/" className="font-bold tracking-tight text-lg"><span className="text-primary">Block</span>URB</a>

        <div className="flex-1 max-w-xl ml-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Buscar…" className="pl-10" aria-label="Buscar" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notificações"><Bell className="size-5" /></Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm">{user?.email || 'Usuário'}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><UserIcon className="mr-2 size-4" /> Perfil</DropdownMenuItem>
              <DropdownMenuItem><LogOut className="mr-2 size-4" /> Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="border-t border-border">
          <div className="container py-2">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((bc, i) => (
                  <>
                    <BreadcrumbItem key={i}>
                      {bc.href ? (
                        <BreadcrumbLink href={bc.href}>{bc.label}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{bc.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      )}
    </header>
  );
}
