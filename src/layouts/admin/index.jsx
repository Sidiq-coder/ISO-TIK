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
        {/* Sidebar - Fixed di kiri */}
        <BaseSidebar title="Sistem TIK" subtitle="Admin Panel" className="z-10">
          <AdminSidebarContent />
        </BaseSidebar>

        {/* Main Content Area */}
        <SidebarInset className="bg-gray-light flex flex-col min-h-screen">
          {/* Navbar - Sticky di atas, allow overlap with content */}
          <div className="sticky top-0 bg-white border-b border-navy-hover w-full">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
              <AdminNavbar />
            </div>
          </div>

          {/* Main Content - Scrollable dengan responsive padding, tidak tertimpa navbar */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-5 md:py-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AdminLayoutProvider>
  );
}
