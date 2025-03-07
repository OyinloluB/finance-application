import { Budget } from "@/types/budget";
import { themeColors } from "@/utils/themeColors";

const BudgetSpendingSummaryItem = ({ budget }: { budget: Budget }) => {
  return (
    <div className="flex justify-between text-grey-500 text-preset-4 py-200 first:pt-0 border-b last:border-b-0 border-grey-100">
      <div className="flex items-center gap-200">
        <span
          className={`w-50 h-full rounded-md ${themeColors[budget.theme]}`}
        />
        <span>{budget.category}</span>
      </div>
      <span>
        <span className="text-grey-900 text-preset-3 font-bold">
          ${budget.currentSpend.toFixed(2)}
        </span>{" "}
        of ${budget.maxLimit.toFixed(2)}
      </span>
    </div>
  );
};

export default BudgetSpendingSummaryItem;
