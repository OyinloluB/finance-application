import React from "react";

const BudgetStat = ({
  label,
  value,
  theme,
}: {
  label: string;
  value: number;
  theme: string;
}) => (
  <div className="w-full flex items-center gap-200">
    <span className={`w-50 h-full rounded-md ${theme}`} />
    <div className="flex flex-col gap-50">
      <span className="text-preset-5 text-gray-500">{label}</span>
      <span className="text-preset-4 text-gray-900 font-bold">
        ${value}
      </span>
    </div>
  </div>
);

export default BudgetStat;
