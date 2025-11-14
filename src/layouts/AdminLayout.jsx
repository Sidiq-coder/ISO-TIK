import React from "react"
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton 
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  FileText, 
  Users,
  BarChart3,
  Settings,
  LogOut
} from "lucide-react"

export function AdminLayout({ children }) {
  const adminNavigation = [
    { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Kelola Formulir", url: "/admin/surveys", icon: FileText },
    { title: "Kelola Pengguna", url: "/admin/users", icon: Users },
    { title: "Laporan", url: "/admin/reports", icon: BarChart3 },
    { title: "Pengaturan", url: "/admin/settings", icon: Settings },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar className="bg-sidebar border-r">
          <SidebarContent>
            {/* Header */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-heading-3 text-sidebar-foreground">
                Admin Panel
              </SidebarGroupLabel>
            </SidebarGroup>

            {/* Navigation Menu */}
            <SidebarGroup>
              <SidebarGroupLabel className="text-caption text-sidebar-foreground/70 uppercase tracking-wide">
                Menu Utama
              </SidebarGroupLabel>
              <SidebarMenu>
                {adminNavigation.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span className="text-body-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            {/* Logout Section */}
            <SidebarGroup className="mt-auto">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/logout" className="flex items-center gap-3 text-red-600 hover:text-red-700">
                      <LogOut className="h-4 w-4" />
                      <span className="text-body-medium">Keluar</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}