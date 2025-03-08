"use client";

import { PieChart, Pie, Cell } from "recharts";
import Spinner from "../atoms/Spinner";

interface BudgetChartProps {
  isLoading: boolean;
  budgets: {
    category: string;
    currentSpend: number;
    maxLimit: number;
    theme: string;
  }[];
}

const BudgetChart = ({ budgets, isLoading }: BudgetChartProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[250px]">
        <Spinner />
      </div>
    );
  }

  const totalSpending = budgets.reduce(
    (acc, budget) => acc + budget.currentSpend,
    0
  );
  const totalLimit = budgets.reduce((acc, budget) => acc + budget.maxLimit, 0);

  const data = budgets
    .filter((budget) => budget.currentSpend > 0)
    .map((budget) => ({
      name: budget.category,
      value: budget.currentSpend,
      color: budget.theme,
    }));

  const COLORS = {
    GREEN: "#16A34A",
    YELLOW: "#EAB308",
    CYAN: "#06B6D4",
    NAVY: "#1E3A8A",
    RED: "#DC2626",
    PURPLE: "#9333EA",
    TURQUOISE: "#14B8A6",
    BROWN: "#92400E",
    MAGENTA: "#DB2777",
    BLUE: "#2563EB",
    GREY: "#6B7280",
    ARMY: "#4D7C0F",
    PINK: "#EC4899",
  };

  return (
    <div className="flex flex-col items-center mb-400 ">
      <PieChart width={250} height={250} className="relative">
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={100}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[entry.color as keyof typeof COLORS]}
              pointerEvents="none"
            />
          ))}
        </Pie>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={85}
          fill="white"
          fillOpacity={0.3}
          stroke="none"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="20px"
          fontWeight="bold"
          fill="#111"
          dy="-5px"
        >
          ${totalSpending}
        </text>

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fontSize="12px"
          fill="#6B7280"
          dy="15px"
        >
          of ${totalLimit} limit
        </text>
      </PieChart>
    </div>
  );
};

export default BudgetChart;
