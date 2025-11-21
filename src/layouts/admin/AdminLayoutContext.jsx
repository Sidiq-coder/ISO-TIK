import { createContext, useContext, useState } from "react";

const AdminLayoutContext = createContext(null);

export function AdminLayoutProvider({ children }) {
  const [header, setHeader] = useState({
    title: "Dashboard",
    subtitle: "Selamat datang di sistem audit management",
    user: {
      name: "Admin User",
      role: "Administrator",
      urlDetail: '/admin/profil'
    },
  });

  const value = {
    header,
    setHeader,
  };

  return (
    <AdminLayoutContext.Provider value={value}>
      {children}
    </AdminLayoutContext.Provider>
  );
}

export function useAdminLayout() {
  const ctx = useContext(AdminLayoutContext);
  if (!ctx) throw new Error("useAdminLayout must be used inside AdminLayoutProvider");
  return ctx;
}
