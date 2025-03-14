import ReceiptIconOutline from "@/components/atoms/icons/ReceiptIconOutline";
import { RecurringBill } from "@/types/bills";
import { formatCurrency } from "@/utils/formatCurrency";
import { useMemo } from "react";

interface BillSummaryProps {
  bills: RecurringBill[] | undefined;
}

const BillSummary = ({ bills = [] }: BillSummaryProps) => {
  const summaryData = useMemo(() => calculateSummary(bills), [bills]);

  return (
    <div className="w-1/3 flex flex-col gap-300">
      <TotalBills totalAmount={summaryData.totalAmount} />
      <SummaryList summaryData={summaryData} />
    </div>
  );
};

const TotalBills = ({ totalAmount }: { totalAmount: number }) => (
  <div className="flex flex-col gap-400 bg-grey-900 text-white p-300 rounded-lg">
    <ReceiptIconOutline className="w-8 h-8" />
    <div>
      <h2 className="text-preset-4 mb-50">Total Bills</h2>
      <p className="text-preset-1 font-bold"> {formatCurrency(totalAmount)}</p>
    </div>
  </div>
);

const SummaryList = ({
  summaryData,
}: {
  summaryData: ReturnType<typeof calculateSummary>;
}) => (
  <div className="bg-white p-250 rounded-lg mb-400">
    <h2 className="text-preset-3 text-grey-900 mb-250 font-bold">Summary</h2>
    <SummaryItem
      label="Paid Bills"
      count={summaryData.paid.count}
      total={summaryData.paid.total}
    />
    <SummaryItem
      label="Total Upcoming"
      count={summaryData.upcoming.count}
      total={summaryData.upcoming.total}
    />
    <SummaryItem
      label="Due Soon"
      count={summaryData.dueSoon.count}
      total={summaryData.dueSoon.total}
      highlight
    />
  </div>
);

const SummaryItem = ({
  label,
  count,
  total,
  highlight = false,
}: {
  label: string;
  count: number;
  total: number;
  highlight?: boolean;
}) => (
  <div className="flex justify-between text-preset-5 border-b border-grey-100 py-200">
    <span className={`text-grey-500 ${highlight ? "text-red-500" : ""}`}>
      {label}
    </span>
    <span
      className={`font-bold ${highlight ? "text-red-500" : "text-grey-900"}`}
    >
      {count} (${total.toFixed(2)})
    </span>
  </div>
);

const calculateSummary = (bills: RecurringBill[]) => {
  const summary = {
    totalAmount: 0,
    paid: { count: 0, total: 0 },
    upcoming: { count: 0, total: 0 },
    dueSoon: { count: 0, total: 0 },
  };

  for (const bill of bills) {
    summary.totalAmount += bill.amount;

    if (bill.status === "PAID") {
      summary.paid.count++;
      summary.paid.total += bill.amount;
    } else if (bill.status === "UPCOMING") {
      summary.upcoming.count++;
      summary.upcoming.total += bill.amount;
    } else if (bill.status === "DUE_SOON") {
      summary.dueSoon.count++;
      summary.dueSoon.total += bill.amount;
    }
  }

  return summary;
};

export default BillSummary;
