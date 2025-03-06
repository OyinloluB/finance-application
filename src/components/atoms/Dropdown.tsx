import React, { useEffect, useRef, useState } from "react";
import DotsThreeOutlineIcon from "../atoms/icons/DotsThreeOutlineIcon";

interface MenuItem {
  label: string;
  action: () => void;
  danger?: boolean;
}

interface DropdownMenuProps {
  items: MenuItem[];
}

const DropdownMenu = ({ items }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        <DotsThreeOutlineIcon className="text-gray-300 cursor-pointer" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-100 px-250 w-[136px] bg-white border rounded-md shadow-lg z-10">
          {items.map((item, index) => (
            <span
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className={`block w-full py-150 text-preset-4 text-gray-900 ${
                item.danger ? "text-red-500" : ""
              } border-b last:border-b-0 border-gray-100 cursor-pointer`}
            >
              {item.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
