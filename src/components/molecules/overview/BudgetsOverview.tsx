import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";
import BudgetChart from "@/components/organisms/BudgetChart";
import useOverviewData from "@/hooks/useOverview";
import { CategoryLabels } from "@/types/categories";
import { formatCurrency } from "@/utils/formatCurrency";
import { themeColors } from "@/utils/themeColors";
import React from "react";

const BudgetsOverview = () => {
  const { data, isLoading } = useOverviewData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <p>No data...</p>;
  }

  const budgets = data.budgets ?? [];

  return (
    <div className="p-400 bg-white rounded-lg w-full h-fit">
      <div className="flex items-center justify-between mb-250">
        <h3 className="text-preset-2 text-grey-900 font-bold">Budgets</h3>
        <Button
          text="See details"
          type="tertiary"
          iconRight="CaretRightIcon"
          hideOutline
          className="text-grey-500 pr-0"
        />
      </div>
      <div className="flex items-center">
        <BudgetChart budgets={budgets} isLoading={false} />
        <div className="grid grid-cols-[auto-fit,minmax(200px,1fr)] gap-200 w-full">
          {budgets.slice(0, 4).map((budget) => (
            <div key={budget.id} className="flex gap-200">
              <div
                className="w-50 rounded-md"
                style={{ backgroundColor: `${themeColors[budget.theme]}` }}
              />
              <div className="flex flex-col gap-50">
                <span className="text-preset-4 text-grey-500">
                  {CategoryLabels[budget.category]}
                </span>
                <span className="text-preset-4 text-grey-900 font-bold">
                  {formatCurrency(budget.currentSpend)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetsOverview;
