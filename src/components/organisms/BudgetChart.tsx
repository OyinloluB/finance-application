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

  const data = budgets
    .filter((budget) => budget.currentSpend > 0)
    .map((budget) => ({
      name: budget.category,
      value: budget.currentSpend,
      color: budget.theme,
    }));

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
          {data.map((entry, index) => {
            return (
              <Cell
                className="bg-blue-700"
                key={`cell-${index}`}
                fill={themeColors[entry.color as keyof typeof themeColors]}
                pointerEvents="none"
              />
            );
          })}
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
