import React from "react";
import Image from "next/image";
import { themeColors } from "@/app/dashboard/budgets/page";
import DropdownMenu from "./Dropdown";

interface BudgetCardProps {
  budget: {
    id: string;
    category: string;
    maxLimit: number;
    currentSpend: number;
    remaining: number;
    theme: string;
    transactions: {
      id: string;
      image: string;
      name: string;
      amount: number;
      date: string;
    }[];
  };
}

const BudgetCard: React.FC<BudgetCardProps> = ({ budget }) => {
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

      {/* Progress Bar */}
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
        <div className="w-full flex items-center gap-200">
          <span
            className={`w-50 h-full rounded-md ${themeColors[budget.theme]}`}
          />
          <div className="flex flex-col gap-50">
            <span className="text-preset-5 text-gray-500">Spent</span>
            <span className="text-preset-4 text-gray-900 font-bold">
              ${budget.currentSpend.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="w-full flex items-center gap-200">
          <span className="w-50 h-full rounded-md bg-beige-100" />
          <div className="flex flex-col gap-50">
            <span className="text-preset-5 text-gray-500">Remaining</span>
            <span className="text-preset-4 text-gray-900 font-bold">
              ${budget.remaining.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Latest Transactions */}
      <div className="p-250 bg-beige-100 rounded-lg">
        <h4 className="text-preset-3 text-grey-900 font-bold mb-200">
          Latest Spending
        </h4>
        {budget.transactions.slice(0, 3).map((tx) => (
          <div
            key={tx.id}
            className="flex justify-between text-sm text-grey-700 py-150 last:pb-0 first:pt-0 border-b last:border-b-0 border-gray-500/15"
          >
            <div className="flex items-center gap-200">
              <Image
                src={tx.image}
                alt={tx.name}
                width={32}
                height={32}
                className="w-400 h-400 rounded-full "
              />
              <span className="font-bold text-grey-900">{tx.name}</span>
            </div>

            <div className="flex flex-col items-end gap-50 text-preset-5 ">
              <span className="font-bold text-gray-900">
                ${tx.amount.toFixed(2)}
              </span>
              {/* <span>{DateTime.fromISO(tx.date).toFormat("MMM dd, yyyy")}</span> */}
              <span className="text-gray-500">{tx.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetCard;
