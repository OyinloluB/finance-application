import React from "react";
import * as Icons from "../atoms/icons";

interface SidebarItemProps {
  icon: keyof typeof Icons;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  active,
  collapsed,
  onClick,
}: SidebarItemProps) => {
  const IconComponent = Icons[icon];

  return (
    <div className="p0">
      <div
        className={`flex items-center gap-200 px-400 py-200  border-l-4 border-transparent cursor-pointer text-preset-3 font-bold ${
          active
            ? "text-grey-900  bg-beige-100 rounded-r-lg border-l-secondary-green w-[90%]"
            : "text-grey-300"
        }`}
        onClick={onClick}
      >
        {IconComponent && (
          <IconComponent
            className={`w-5 h-5 ${active ? "text-secondary-green" : ""} `}
          />
        )}
        {!collapsed && <span>{label}</span>}
      </div>
    </div>
  );
};

export default SidebarItem;
