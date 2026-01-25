import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

interface siderbarItemsProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export default function SidebarItem({ to, icon, label }: siderbarItemsProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-4 rounded-lg px-4 py-3 text-lg transition",
          isActive
            ? "bg-accent font-medium text-accent-foreground"
            : "hover:bg-accent/50",
        )
      }
    >
      {icon} <span>{label} </span>
    </NavLink>
  );
}
