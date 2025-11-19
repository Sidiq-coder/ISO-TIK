import React from "react";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";

function SidebarHeader({ title, subtitle, titleClassName, subtitleClassName }) {
  if (!title && !subtitle) return null;

  return (
    <SidebarGroup className="px-8 pb-4 pt-6">
      {title && (
        <SidebarGroupLabel
          disableDefaultTypography
          className={titleClassName ?? "heading-3 text-navy"}
        >
          {title}
        </SidebarGroupLabel>
      )}
      {subtitle && (
        <SidebarGroupLabel
          disableDefaultTypography
          className={
            subtitleClassName ?? "text-gray-dark text-[14px] font-normal"
          }
        >
          {subtitle}
        </SidebarGroupLabel>
      )}
    </SidebarGroup>
  );
}

export function BaseSidebar({
  title,
  subtitle,
  children,
  className = "",
  titleClassName,
  subtitleClassName,
  dividerClassName = "border-navy-hover",
  headerSpacing = true,
}) {
  return (
    <SidebarRoot
      className={`bg-gray-light border-r-[1px]! border-navy w-[294px] ${className}`}
    >
      <SidebarContent>
        <SidebarHeader
          title={title}
          subtitle={subtitle}
          titleClassName={titleClassName}
          subtitleClassName={subtitleClassName}
        />

        {headerSpacing && <hr className={dividerClassName} />}

        {children}
      </SidebarContent>
    </SidebarRoot>
  );
}
