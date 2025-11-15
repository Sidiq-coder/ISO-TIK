import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { BaseSidebar } from "@/components/sidebar";
import { AdminSidebarContent } from "./AdminSidebarContent";
import { AdminNavbar } from "./AdminNavbar";
import { Outlet } from "react-router-dom";
export function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      <BaseSidebar title="Admin" subtitle="Sistem TIK">
        <AdminSidebarContent />
      </BaseSidebar>

      <SidebarInset className="bg-[#dce2ee]">
        <AdminNavbar />
        <div className="pl-18 py-8 pr-12 ">
          <Outlet/>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
