import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import usersIcon from "../../assets/users.png";
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

// Constants
const NAVIGATION_ITEMS = [
  { title: "Dashboard", url: "/admin/dashboard", icon: House, hoverIcon: HouseIcon },
  { title: "Dokumen", url: "/admin/dokumen", icon: Folder, hoverIcon: FolderOpen },
  { title: "SoA", url: "/admin/SoA", icon: FileText, hoverIcon: FileText },
  { title: "Audit", url: "/admin/Audit", icon: ClipboardCheck, hoverIcon: ClipboardCheck },
  { title: "NCR", url: "/admin/NCR", icon: TriangleAlert, hoverIcon: TriangleAlert },
  { title: "Manual", url: "/admin/manual", icon: FileChartLine, hoverIcon: FileChartLine },
  {
    title: "Manajemen Pengguna",
    url: "/admin/manajemen-pengguna",
    icon: UserIcon,
    hoverIcon: UserIcon,
    iconClassName: "!h-6 !w-6 text-gray-dark",
    hoverIconClassName: "!h-6 !w-6 text-navy",
  },
];

const SECTION_DIVIDERS = {
  1: "Modul Audit",
  5: "Administrasi",
};

const ICON_CLASSES = {
  base: "h-4 w-4 text-gray-dark transition-all duration-200",
  active: "h-4 w-4 text-gray-light transition-all duration-200",
  hover: "h-4 w-4 text-navy scale-110 transition-all duration-200",
};

const BUTTON_CLASSES = {
  base: "group/nav-item transition-all duration-200 rounded-lg",
  active: "!bg-navy !text-gray-light hover:!bg-navy hover:!text-gray-light cursor-default",
  inactive: "hover:bg-gray-dark2 hover:text-gray-light",
};

const TEXT_CLASSES = {
  active: "text-gray-light body-medium transition-all duration-200",
  inactive: "text-gray-dark group-hover/nav-item:text-navy-hover body-medium transition-all duration-200",
};

// Custom Icon Component
function UserIcon({ className = "h-4 w-4 text-gray-dark", ...props }) {
  return (
    <span
      role="img"
      aria-label="User icon"
      className={`inline-block ${className}`.trim()}
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
      }}
      {...props}
    />
  );
}

// Utility Functions
const getIconClasses = (showHover, isActive, customClass) => {
  if (customClass) return customClass;
  if (showHover) {
    return isActive ? ICON_CLASSES.active : ICON_CLASSES.hover;
  }
  return ICON_CLASSES.base;
};

const getButtonClasses = (isActive) => {
  const base = BUTTON_CLASSES.base;
  const style = isActive ? BUTTON_CLASSES.active : BUTTON_CLASSES.inactive;
  return `${base} ${style}`;
};

const getTextClasses = (isActive) => {
  return isActive ? TEXT_CLASSES.active : TEXT_CLASSES.inactive;
};

// Components
function SidebarNavItem({ item, isActive, isHovered, onClick, onMouseEnter, onMouseLeave }) {
  const showHoverIcon = isActive || isHovered;
  const IconComponent = showHoverIcon ? item.hoverIcon : item.icon;

  return (
    <SidebarMenuItem className="px-4 sm:px-6 md:px-8">
      <SidebarMenuButton
        asChild
        isActive={isActive}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className={getButtonClasses(isActive)}
      >
        <NavLink to={item.url} className="flex items-center gap-2 sm:gap-3 p-4 sm:p-6">
          <IconComponent
            className={getIconClasses(
              showHoverIcon,
              isActive,
              showHoverIcon ? item.hoverIconClassName : item.iconClassName
            )}
          />
          <span className={`${getTextClasses(isActive)} hidden sm:inline`}>
            {item.title}
          </span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function SectionDivider({ title }) {
  return (
    <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 py-3 gap-3 text-gray-dark">
      <hr className="border-navy" />
      <p className="small hidden sm:block">{title}</p>
    </div>
  );
}

export function AdminSidebarContent() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  // Get active item from URL
  const resolveActiveFromPath = useCallback(() => {
    if (typeof window === "undefined") return null;
    const path = window.location.pathname;
    const matched = NAVIGATION_ITEMS.find((item) => path.startsWith(item.url));
    return matched?.title ?? NAVIGATION_ITEMS[0]?.title ?? null;
  }, []);

  // Initialize active item and listen to path changes
  useEffect(() => {
    setActiveItem(resolveActiveFromPath());
    const handlePopstate = () => setActiveItem(resolveActiveFromPath());
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, [resolveActiveFromPath]);

  // Handler for mouse events
  const handleMouseEnter = useCallback(
    (itemTitle) => {
      if (activeItem !== itemTitle) {
        setHoveredItem(itemTitle);
      }
    },
    [activeItem]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  return (
    <div className="">
      <SidebarGroup>
        <SidebarMenu>
          {NAVIGATION_ITEMS.map((item, index) => (
            <div key={item.title}>
              {index === 0 && (
                <div className="flex flex-col justify-center px-4 sm:px-6 md:px-8 py-3 gap-3 text-gray-dark">
                  <p className="small hidden sm:block">Menu Utama</p>
                </div>
              )}

              <SidebarNavItem
              
                item={item}
                isActive={activeItem === item.title}
                isHovered={hoveredItem === item.title && activeItem !== item.title}
                onClick={() => setActiveItem(item.title)}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              />

              {SECTION_DIVIDERS[index] && <SectionDivider title={SECTION_DIVIDERS[index]} />}
            </div>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem className="px-4 sm:px-6 md:px-8">
            <SidebarMenuButton
              asChild
              onMouseEnter={() => setHoveredItem("logout")}
              onMouseLeave={handleMouseLeave}
              className="group transition-all duration-200 hover:bg-red-50 hover:text-red-700"
            >
              <NavLink to="/logout" className="flex items-center gap-2 sm:gap-3 p-4 sm:p-6 mb-4 sm:mb-8">
                <LogOutIcon
                  className={`h-4 w-4 transition-all duration-200 ${
                    hoveredItem === "logout" ? "text-red-700" : "text-red-600"
                  }`}
                />
                <span className="transition-all text-red duration-200 body-medium hidden sm:inline">
                  Logout
                </span>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </div>
  );
}
