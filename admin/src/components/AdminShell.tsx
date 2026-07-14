import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Images,
  Wrench,
  ListChecks,
  Sparkles,
  Tags,
  MessageSquareQuote,
  Building2,
  Film,
  Compass,
  Phone,
  Inbox,
  Receipt,
  FolderOpen,
  LogOut,
} from "lucide-react";
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
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/hero-slides", label: "Hero Slides", icon: Images },
  { to: "/services", label: "Services", icon: Wrench },
  { to: "/pricing-plans", label: "Pricing Plans", icon: Tags },
  { to: "/how-it-works", label: "How It Works", icon: ListChecks },
  { to: "/why-us", label: "Why Us", icon: Sparkles },
  { to: "/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/clients", label: "Clients", icon: Building2 },
  { to: "/video-gallery", label: "Video Gallery", icon: Film },
  { to: "/mission-about", label: "Mission & About", icon: Compass },
  { to: "/contact-info", label: "Contact Info", icon: Phone },
  { to: "/bookings", label: "Bookings", icon: Inbox },
  { to: "/orders", label: "Orders", icon: Receipt },
  { to: "/media", label: "Media Library", icon: FolderOpen },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="px-4 py-4">
          <p className="font-display text-lg font-bold text-sidebar-foreground">EcoBloom Admin</p>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Content</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) =>
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                        }
                      >
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="gap-2 px-4 py-4">
          <p className="truncate text-xs text-sidebar-foreground/70">{user?.email}</p>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut className="size-4" />
            Log out
          </Button>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 overflow-y-auto">
        <div className="flex items-center gap-3 border-b border-border px-6 py-3 md:hidden">
          <SidebarTrigger />
          <span className="font-display font-semibold">EcoBloom Admin</span>
        </div>
        <div className="p-6 md:p-10">{children}</div>
      </main>
    </SidebarProvider>
  );
}
