
import { useAdminLayout } from "@/layouts/admin/AdminLayoutContext";
import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
export default function SoA(){
    const {setHeader} = useAdminLayout();
    const location = useLocation();
    const baseTab = "body-medium p-4 rounded-t-[4px] transition-all duration-200";
    const inactive = "text-navy hover:bg-state";
    const active = "bg-state text-navy shadow border-b-[3px] border-navy";
    const tabConfigs = [
        {label: "Dokumen SoA", path: "/admin/soa/dokumen"},
        {label: "Kategori SoA", path: "/admin/soa/kategori"},
        {label: "Pertanyaan SoA", path: "/admin/soa/pertanyaan"},
    ];
    const hideTabs = location.pathname.includes("/admin/soa/review");

    useEffect(() => {
        setHeader({
            title: "Statement of Applicability",
            subtitle: "Kelola dokumen, kategori, dan pertanyaan SoA",
            user: {
                name: "Admin User",
                role: "Administrator",
                urlDetail: '/admin/profile'
            }
        })
    }, [])
    return(
        <div>
            {!hideTabs && (
                <div className="flex gap-4" id="soa-sub-navbar">
                    {tabConfigs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={({ isActive }) => clsx(baseTab, isActive ? active : inactive)}
                        >
                            {tab.label}
                        </NavLink>
                    ))}
                </div>
            )}
        
        <div className="mt-6">
            <Outlet />
        </div>

        </div>
    )
}
