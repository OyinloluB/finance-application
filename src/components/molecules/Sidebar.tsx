import React, { useEffect, useState } from "react";
import SidebarItem from "../atoms/SidebarItem";
import { IconName } from "../atoms/icons";
import Logo from "../atoms/icons/Logo";
import MinLogo from "../atoms/icons/MinLogo";
import { useAuth } from "@/context/AuthContext";

interface SidebarItemsProps {
  label: string;
  icon: IconName;
  route: string;
}

const sidebarItems: SidebarItemsProps[] = [
  { label: "Overview", icon: "HouseIcon", route: "/dashboard" },
  { label: "Transactions", icon: "ArrowsDownUpIcon", route: "/transactions" },
  { label: "Budgets", icon: "ChartDonutIcon", route: "/budgets" },
  { label: "Pots", icon: "ReceiptIcon", route: "/pots" },
  {
    label: "Recurring Bills",
    icon: "ListBulletsIcon",
    route: "/recurring-bills",
  },
];

const Sidebar = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");

  const [showItem, setShowItem] = useState(!collapsed);

  useEffect(() => {
    if (!collapsed) {
      const timer = setTimeout(() => setShowItem(true), 300);
      return () => clearTimeout(timer);
    } else {
      setShowItem(false);
    }
  }, [collapsed]);

  return (
    <div
      className={`flex flex-col justify-between bg-grey-900 text-white h-screen transition-all duration-300 rounded-r-5xl py-500 ${
        collapsed ? "w-[88px]" : "w-[300px]"
      }`}
    >
      <div className="flex flex-col gap-16">
        <div className="pl-400 transition-opacity duration-300">
          <div
            className={`transition-opacity duration-300 ${
              collapsed ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            <Logo />
          </div>

          <div
            className={`transition-opacity duration-300 ${
              collapsed ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            <MinLogo />
          </div>
        </div>
        <div>
          {sidebarItems.map((item) => (
            <SidebarItem
              label={item.label}
              active={activeItem === item.route}
              icon={item.icon}
              key={item.route}
              onClick={() => setActiveItem(item.route)}
              showItem={showItem}
            />
          ))}
        </div>
      </div>

      <div>
        <SidebarItem
          label="Log Out"
          icon={"ArrowFatLinesLeftIcon"}
          onClick={() => logout()}
          showItem={showItem}
        />
        <SidebarItem
          label="Minimize Menu"
          icon={
            collapsed
              ? ("ArrowFatLinesLeftIcon" as IconName)
              : ("ArrowFatLinesRightIcon" as IconName)
          }
          onClick={() => setCollapsed(!collapsed)}
          showItem={showItem}
        />
      </div>
    </div>
  );
};

export default Sidebar;
