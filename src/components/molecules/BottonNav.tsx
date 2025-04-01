"use client";

import { usePathname, useRouter } from "next/navigation";
import { IconName, Icons } from "../atoms/icons";
import { useAuth } from "@/context/AuthContext";

const navItems: {
  label: string;
  icon: IconName;
  route?: string;
  action?: () => void;
}[] = [
  { label: "Overview", icon: "HouseIcon", route: "/dashboard" },
  {
    label: "Transactions",
    icon: "ArrowsDownUpIcon",
    route: "/dashboard/transactions",
  },
  { label: "Budgets", icon: "ChartDonutIcon", route: "/dashboard/budgets" },
  { label: "Pots", icon: "ReceiptIcon", route: "/dashboard/pots" },
  {
    label: "Recurring bills",
    icon: "ListBulletsIcon",
    route: "/dashboard/recurring-bills",
  },
];

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 w-full h-[64px] bg-grey-900 flex justify-around items-end rounded-t-2xl shadow-md z-50">
      {navItems.map((item) => {
        const Icon = Icons[item.icon];
        const isActive = pathname === item.route;

        return (
          <button
            key={item.label}
            onClick={() => {
              if (item.route) {
                router.push(item.route);
              } else if (item.action) {
                item.action();
              }
            }}
            className={`flex flex-col items-center justify-center transition-colors h-[60px] w-full ${
              isActive
                ? "text-secondary-green border-b-4 border-secondary-green rounded-t-xl bg-beige-100 pt-100"
                : "text-grey-300"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden sm:inline text-preset-5 font-bold">
              {item.label}
            </span>
          </button>
        );
      })}

      <button
        onClick={logout}
        className="flex flex-col items-center justify-center transition-colors h-[60px] w-full text-grey-300"
      >
        <Icons.WrenchIcon className="w-5 h-5" />
        <span className="hidden sm:inline text-preset-5 font-bold">Logout</span>
      </button>
    </nav>
  );
};

export default BottomNav;
