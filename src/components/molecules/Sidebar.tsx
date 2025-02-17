import React, { useState } from "react";
import SidebarItem from "../atoms/SidebarItem";
import { IconName } from "../atoms/icons";

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
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("/dashboard");

  return (
    <div
      className={`bg-grey-900 text-white h-screen transition-all duration-300 rounded-r-5xl ${
        collapsed ? "w-[88px]" : "w-[300px]"
      }`}
    >
      <div>
        <div>
          {sidebarItems.map((item) => (
            <SidebarItem
              label={item.label}
              active={activeItem === item.route}
              collapsed={collapsed}
              icon={item.icon}
              key={item.route}
              onClick={() => setActiveItem(item.route)}
            />
          ))}
        </div>
      </div>
      <button onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? ">" : "<"}
      </button>
    </div>
  );
};

export default Sidebar;
