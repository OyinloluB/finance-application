import { Pot } from "@/types/pot";
import { Transaction } from "@/types/transaction";
import { formatCurrency } from "@/utils/formatCurrency";
import { useMemo } from "react";

interface FinancialSummaryProps {
  transactions: Transaction[];
  pots: Pot[] | undefined;
}

const FinancialSummary = ({ transactions, pots }: FinancialSummaryProps) => {
  const { currentBalance, totalIncome, totalExpenses } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    let savings = 0;

    transactions.forEach(({ amount, type }) => {
      const numericAmount = Number(amount);

      if (type === "INCOME") income += numericAmount;
      else expenses += Math.abs(numericAmount);
    });

    savings = pots ? pots.reduce((acc, pot) => acc + pot.currentAmount, 0) : 0;

    const calculatedBalance = income - expenses + savings;

    const finalBalance = Math.max(calculatedBalance, 0);

    return {
      currentBalance: finalBalance,
      totalIncome: income,
      totalExpenses: expenses,
    };
  }, [transactions, pots]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-150 sm:gap-300 mb-400 w-full">
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
      highlight ? "bg-grey-900 text-white" : "bg-white text-grey-900"
    }`}
  >
    <h2
      className={`text-preset-4 mb-150 ${
        highlight ? "text-white" : " text-grey-500"
      }`}
    >
      {title}
    </h2>
    <p className={`text-preset-1 font-bold`}>{formatCurrency(amount)}</p>
  </div>
);

export default FinancialSummary;
