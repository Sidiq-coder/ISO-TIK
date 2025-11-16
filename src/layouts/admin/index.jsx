import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { BaseSidebar } from "@/components/sidebar";
import { AdminSidebarContent } from "./AdminSidebarContent";
import { AdminNavbar } from "./AdminNavbar";
import { Outlet } from "react-router-dom";
import { AdminLayoutProvider } from "./AdminLayoutContext";
export function AdminLayout({ children }) {
  return (
    <AdminLayoutProvider>
    <SidebarProvider>
      <BaseSidebar title="Sistem TIK" subtitle="Admin Panel">
        <AdminSidebarContent />
      </BaseSidebar>

    <SidebarInset className="bg-gray-light">
        <AdminNavbar />
        <div className="pl-16 py-6 pr-8">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </AdminLayoutProvider>
  );
}
