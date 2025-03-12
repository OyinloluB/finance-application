import { Transaction } from "@/types/transaction";
import { formatCurrency } from "@/utils/formatCurrency";
import { useMemo } from "react";

interface FinancialSummaryProps {
  transactions: Transaction[];
}

const FinancialSummary = ({ transactions }: FinancialSummaryProps) => {
  const { currentBalance, totalIncome, totalExpenses } = useMemo(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach(({ amount, type }) => {
      const numericAmount = Number(amount);

      if (type === "INCOME") income += numericAmount;
      else expenses += Math.abs(numericAmount);
    });

    return {
      currentBalance: income - expenses,
      totalIncome: income,
      totalExpenses: expenses,
    };
  }, [transactions]);

  return (
    <div className="flex justify-between gap-300 mb-500 w-full">
      <SummaryCard title="Current Balance" amount={currentBalance} highlight />
      <SummaryCard title="Income" amount={totalIncome} />
      <SummaryCard title="Expenses" amount={totalExpenses} />
    </div>
  );
};

const SummaryCard = ({
  title,
  amount,
  highlight = false,
}: {
  title: string;
  amount: number;
  highlight?: boolean;
  negative?: boolean;
}) => (
  <div
    className={`p-300 rounded-lg shadow-md flex-1 h-[119px] ${
      highlight ? "bg-grey-900 text-white" : "bg-white text-gray-900"
    }`}
  >
    <h2 className="text-preset-4 mb-150">{title}</h2>
    <p className={`text-preset-1 font-bold`}>{formatCurrency(amount)}</p>
  </div>
);

export default FinancialSummary;
