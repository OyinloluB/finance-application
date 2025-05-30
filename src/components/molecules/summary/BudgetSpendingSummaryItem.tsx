import { Budget } from "@/types/budget";
import { CategoryLabels } from "@/types/categories";
import { themeColors } from "@/utils/themeColors";

interface BudgetSpendingSummaryProps {
  budget: Budget;
}

const BudgetSpendingSummaryItem = ({ budget }: BudgetSpendingSummaryProps) => {
  return (
    <div className="flex justify-between text-grey-500 text-preset-4 py-200 first:pt-0 border-b last:border-b-0 border-grey-100">
      <div className="flex items-center gap-200">
        <span
          className="w-50 h-full rounded-md"
          style={{ backgroundColor: `${themeColors[budget.theme]}` }}
        />
        <span>{CategoryLabels[budget.category]}</span>
      </div>
      <span>
        <span className="text-grey-900 text-preset-3 font-bold">
          ${budget.currentSpend}
        </span>{" "}
        of ${budget.maxLimit}
      </span>
    </div>
  );
};

export default BudgetSpendingSummaryItem;
