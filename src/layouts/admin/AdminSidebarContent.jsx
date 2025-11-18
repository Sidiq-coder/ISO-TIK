import React, { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import usersIcon from "../../assets/users.png"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  ClipboardCheck,
  FileChartLine,
  FileText,
  Folder,
  FolderOpen,
  House,
  HouseIcon,
  LogOut,
  LogOutIcon,
  TriangleAlert,
} from "lucide-react";

function SidebarNavItem({
  item,
  isActive,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const showHoverIcon = isActive || isHovered;
  const IconComponent = showHoverIcon ? item.hoverIcon : item.icon;

  const buttonClasses = "group/nav-item transition-all duration-200 rounded-lg";
  const activeClasses =
    "!bg-navy !text-gray-light hover:!bg-navy hover:!text-gray-light cursor-default";
  const inactiveClasses = "hover:bg-gray-dark2 hover:text-gray-light";

  const iconClasses = showHoverIcon
    ? `h-4 w-4 ${isActive ? "text-gray-light" : "text-navy scale-110"} transition-all duration-200`
    : "h-4 w-4 text-gray-dark transition-all duration-200";
  const resolvedIconClasses = showHoverIcon
    ? item.hoverIconClassName ?? iconClasses
    : item.iconClassName ?? iconClasses;

  const textClasses = `${
    isActive
      ? "text-gray-light"
      : "text-gray-dark group-hover/nav-item:text-navy-hover"
  } body-medium transition-all duration-200`;

  return (
    <SidebarMenuItem className="px-8">
      <SidebarMenuButton
        asChild
        isActive={isActive}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={`${buttonClasses} ${isActive ? activeClasses : inactiveClasses}`}
      >
        <NavLink to={item.url} className="flex items-center gap-3 p-6">
          <IconComponent className={resolvedIconClasses} />
          <span className={textClasses}>{item.title}</span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function UserIcon({ className = "h-4 w-4 text-gray-dark", style, ...props }) {
  const combinedClassName = `inline-block ${className}`.trim();

  return (
    <span
      role="img"
      aria-label="User icon"
      className={combinedClassName}
      style={{
        WebkitMaskImage: `url(${usersIcon})`,
        maskImage: `url(${usersIcon})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        backgroundColor: "currentColor",
        display: "inline-block",
        ...style,
      }}
      {...props}
    />
  );
}

export function AdminSidebarContent() {
  const navigation = useMemo(
    () => [
      { title: "Dashboard", url: "/admin/dashboard", icon: House, hoverIcon: HouseIcon },
      { title: "Dokumen", url: "/admin/dokumen", icon: Folder, hoverIcon: FolderOpen },
      { title: "SoA", url: "/admin/SoA", icon: FileText, hoverIcon: FileText },
      { title: "Audit", url: "/admin/Audit", icon: ClipboardCheck, hoverIcon: ClipboardCheck },
      { title: "NCR", url: "/admin/NCR", icon: TriangleAlert, hoverIcon: TriangleAlert },
      { title: "Manual", url: "/admin/manual", icon: FileChartLine, hoverIcon: FileChartLine },
      { title: "Manajemen Pengguna", url: "/admin/manajemen-pengguna", icon: UserIcon, hoverIcon: UserIcon, iconClassName: "!h-6 !w-6 text-gray-dark", hoverIconClassName: "!h-6 !w-6 text-navy", },
    ],
    []
  );

  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  const resolveActiveFromPath = useCallback(() => {
    const path = typeof window !== "undefined" ? window.location.pathname : "";
    const matched = navigation.find((item) => path.startsWith(item.url));
    return matched?.title ?? navigation[0]?.title ?? null;
  }, [navigation]);

  useEffect(() => {
    const updateActive = () => setActiveItem(resolveActiveFromPath());
    updateActive();
    window.addEventListener("popstate", updateActive);
    return () => window.removeEventListener("popstate", updateActive);
  }, [resolveActiveFromPath]);

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          {navigation.map((item, index) => (
            <React.Fragment>
            <SidebarNavItem
              key={index}
              item={item}
              isActive={activeItem === item.title}
              isHovered={hoveredItem === item.title && activeItem !== item.title}
              onClick={() => setActiveItem(item.title)}
              onMouseEnter={() => {
                if (activeItem !== item.title) {
                  setHoveredItem(item.title);
                }
              }}
              onMouseLeave={() => setHoveredItem(null)}
            />
            {index === 1 && (
              <div className="flex flex-col justify-center p-6 gap-3 text-gray-dark">
                <hr className="border border-b"/>
                <p className="small">Modul Audit</p>
            </div>
          )}
            {index === 5 && (
              <div className="flex flex-col justify-center p-6 gap-3 text-gray-dark">
                <hr className="border border-b"/>
                <p className="small">Administrasi</p>
            </div>
          )}
            </React.Fragment>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem className="px-8">
            <SidebarMenuButton
              asChild
              onMouseEnter={() => setHoveredItem("logout")}
              onMouseLeave={() => setHoveredItem(null)}
              className="group transition-all duration-200 hover:bg-red-50 hover:text-red-700"
            >
              <NavLink to="/logout" className="flex items-center gap-3 p-6 mb-8">
                {hoveredItem === "logout" ? (
                  <LogOutIcon className="h-4 w-4 text-red-700 transition-all duration-200" />
                ) : (
                  <LogOut className="h-4 w-4 text-red-600 transition-all duration-200" />
                )}
                <span className="transition-all text-red duration-200 body-medium">
                  Logout
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
