import React from "react";
import { Link } from "react-router-dom";
import { useAdminLayout } from "./AdminLayoutContext";
function getInitials(name = "") {
  const [first = "", second = ""] = name.trim().split(" ");
  if (!first && !second) return "";
  if (!second) return first.slice(0, 2).toUpperCase();
  return `${first[0]}${second[0]}`.toUpperCase();
}

export function AdminNavbar() {
  const { header } = useAdminLayout();
  const { title, subtitle, user } = header;
  const initials = user.initials ?? getInitials(user.name);

  return (
    <header className="border-b  border-l border-navy-hover bg-white ml-8">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex flex-col">
          <h1 className="heading-4 text-navy">{title}</h1>
          {subtitle && (
            <p className="text-gray-dark text-sm">{subtitle}</p>
          )}
        </div>

        <Link className="flex items-center gap-3" to={user.urlDetail}>
          <div className="flex size-11 items-center justify-center rounded-full text-sm font-semibold text-[#1B2A49]">
            {initials}
          </div>
          <div className="flex flex-col text-right">
            <span className="text-[#1B2A49] body-medium" >
              {user.name}
            </span>
            <span className="text-gray-dark small">
              {user.role}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}
