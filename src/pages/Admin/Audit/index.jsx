import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { Outlet } from "react-router-dom";

export default function Audit() {
  const { setHeader } = useAdminLayout();
  const baseTab = "body-medium p-4 rounded-t-[4px] transition-all duration-200";
  const inactive = "text-navy hover:bg-state";
  const active = "bg-state text-navy shadow border-b-[3px] border-navy";

  useEffect(() => {
    setHeader({
      title: "Detail Checklist Audit",
      subtitle: "Kelola dokumen, checklist, aspek, pertanyaan audit",
      user: {
        name: "Admin User",
        role: "Administrator",
        urlDetail: "/admin/profil",
      },
    });
  }, [setHeader]);
  return (
    <div>
      <div className="flex gap-4" id="audit-sub-navbar">
        <NavLink
          to="/admin/audit/dokumen"
          className={({ isActive }) =>
            clsx(baseTab, isActive ? active : inactive)
          }
        >
          {" "}
          Dokumen Audit{" "}
        </NavLink>
        <NavLink
          to="/admin/audit/checklist"
          className={({ isActive }) =>
            clsx(baseTab, isActive ? active : inactive)
          }
        >
          {" "}
          Checklist Audit{" "}
        </NavLink>
        <NavLink
          to="/admin/audit/aspek"
          className={({ isActive }) =>
            clsx(baseTab, isActive ? active : inactive)
          }
        >
          {" "}
          Aspek Audit{" "}
        </NavLink>
        <NavLink
          to="/admin/audit/checklist-excel"
          className={({ isActive }) =>
            clsx(baseTab, isActive ? active : inactive)
          }
        >
          {" "}
          Checklist Excel{" "}
        </NavLink>
      </div>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
