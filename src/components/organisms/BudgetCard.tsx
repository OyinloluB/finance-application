import React from "react";

import { themeColors } from "@/utils/themeColors";
import { Budget } from "@/types/budget";
import DropdownMenu from "../atoms/Dropdown";
import BudgetStat from "../molecules/BudgetStat";
import BudgetTransactionItem from "../molecules/BudgetTransactionItem";

const BudgetCard = ({ budget }: { budget: Budget }) => {
  const handleEdit = () => {
    console.log(`Editing budget: ${budget.id}`);
  };

  const handleDelete = () => {
    console.log(`Deleting budget: ${budget.id}`);
  };

  return (
    <div className="bg-white p-400 rounded-lg">
      <div className="flex justify-between items-center mb-250">
        <h3 className="text-preset-2 font-bold text-gray-900 flex items-center">
          <span
            className={`w-200 h-200 rounded-full ${
              themeColors[budget.theme]
            } mr-200`}
          />
          {budget.category}
        </h3>
        <DropdownMenu
          items={[
            { label: "Edit Budget", action: handleEdit },
            { label: "Delete Budget", action: handleDelete, danger: true },
          ]}
        />
      </div>

      <div className="mb-250">
        <span className="text-preset-4 text-grey-500">
          Maximum of ${budget.maxLimit.toFixed(2)}
        </span>
        <div className="mt-200 bg-beige-100 h-400 p-50 rounded-sm overflow-hidden">
          <div
            className={`h-full rounded-md ${themeColors[budget.theme]}`}
            style={{
              width: `${(budget.currentSpend / budget.maxLimit) * 100}%`,
              maxWidth: "100%",
            }}
          />
        </div>
      </div>

      <div className="flex gap-200 text-preset-5 mb-250">
        <BudgetStat
          label="Spent"
          value={budget.currentSpend}
          theme={themeColors[budget.theme]}
        />
        <BudgetStat
          label="Remaining"
          value={budget.remaining}
          theme="bg-beige-100"
        />
      </div>

      <div className="p-250 bg-beige-100 rounded-lg">
        <h4 className="text-preset-3 text-grey-900 font-bold mb-200">
          Latest Spending
        </h4>
        {budget.transactions.slice(0, 3).map((tx) => (
          <BudgetTransactionItem key={tx.id} tx={tx} />
        ))}
      </div>
    </div>
  );
};

export default BudgetCard;
