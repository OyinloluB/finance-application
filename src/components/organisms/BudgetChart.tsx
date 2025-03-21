"use client";

import { PieChart, Pie, Cell } from "recharts";
import Spinner from "../atoms/Spinner";
import { Budget } from "@/types/budget";
import { themeColors } from "@/utils/themeColors";

interface BudgetChartProps {
  isLoading: boolean;
  budgets: Budget[];
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

  // Filter budgets with spending
  const data = budgets
    .filter((budget) => budget.currentSpend > 0)
    .map((budget) => ({
      name: budget.category,
      value: budget.currentSpend,
      color: budget.theme,
    }));

  // 🔹 If no budgets exist OR all have zero spending, show an empty state
  if (budgets.length === 0 || totalSpending === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[250px] text-grey-500">
        <p className="text-preset-4 text-center font-medium">
          No spending data available
        </p>
        <p className="text-sm text-center">
          Add a budget and track your spending.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
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
              fill={themeColors[entry.color as keyof typeof themeColors]}
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
