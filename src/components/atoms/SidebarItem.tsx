import React, { useEffect, useState } from "react";
import { Icons, IconName } from "../atoms/icons";

interface SidebarItemProps {
  icon: IconName;
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

  const [showText, setShowText] = useState(!collapsed);

  useEffect(() => {
    if (!collapsed) {
      const timer = setTimeout(() => setShowText(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowText(false);
    }
  }, [collapsed]);

  return (
    <div>
      <div
        className={`flex items-center gap-200 px-400 py-200 border-l-4 border-transparent cursor-pointer text-preset-3 font-bold transition-all duration-300 ${
          active
            ? "text-grey-900 bg-beige-100 rounded-r-lg border-l-secondary-green w-[85%]"
            : "text-grey-300"
        }`}
        onClick={onClick}
      >
        {IconComponent && (
          <div className="w-5 h-5 flex-shrink-0">
            <IconComponent
              className={`w-full h-full ${
                active ? "text-secondary-green" : ""
              }`}
            />
          </div>
        )}
        <span
          className={`whitespace-nowrap flex-1 transition-opacity duration-300 ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

export default SidebarItem;
