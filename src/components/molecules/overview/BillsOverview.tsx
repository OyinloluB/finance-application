import Button from "@/components/atoms/Button";
import Spinner from "@/components/atoms/Spinner";
import useOverviewData from "@/hooks/useOverview";
import { RecurringBill } from "@/types/bills";
import { formatCurrency } from "@/utils/formatCurrency";
import { useRouter } from "next/navigation";
import React from "react";

const BillsOverview = () => {
  const router = useRouter();
  const { data, isLoading } = useOverviewData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data || !data.bills) {
    return <p>No bills available.</p>;
  }

  const bills = data.bills;

  const totalPaid = bills
    .filter((bill: RecurringBill) => bill.status === "PAID")
    .reduce((sum: number, bill: RecurringBill) => sum + bill.amount, 0);

  const totalUpcoming = bills
    .filter((bill: RecurringBill) => bill.status === "UPCOMING")
    .reduce((sum: number, bill: RecurringBill) => sum + bill.amount, 0);

  const totalDueSoon = bills
    .filter((bill: RecurringBill) => bill.status === "DUE_SOON")
    .reduce((sum: number, bill: RecurringBill) => sum + bill.amount, 0);

  return (
    <div className="p-400 bg-white rounded-lg w-full h-fit">
      <div className="flex items-center justify-between mb-250">
        <h3 className="text-preset-2 text-grey-900 font-bold">
          Recurring Bills
        </h3>
        <Button
          text="See details"
          type="tertiary"
          iconRight="CaretRightIcon"
          hideOutline
          className="text-grey-500 pr-0"
          onClick={() => router.push("/dashboard/recurring-bills")}
        />
      </div>
      <div className="flex flex-col gap-150">
        <BillItem title="Paid Bills" amount={totalPaid} />
        <BillItem title="Total Upcoming" amount={totalUpcoming} />
        <BillItem title="Due Soon" amount={totalDueSoon} />
      </div>
    </div>
  );
};

const BillItem = ({ title, amount }: { title: string; amount: number }) => (
  <div className="flex justify-between text-preset-4 bg-beige-100 py-250 px-200 rounded-lg border-l-4 border-secondary-yellow w-full">
    <span className="text-grey-500">{title}</span>
    <span className="font-bold text-grey-900"> {formatCurrency(amount)}</span>
  </div>
);

export default BillsOverview;
