"use client";

import Spinner from "@/components/atoms/Spinner";
import FinancialSummary from "@/components/molecules/summary/FinancialSummary";
import useOverviewData from "@/hooks/useOverview";

const Overview = () => {
  const { data, isLoading } = useOverviewData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  console.log({ data });

  return (
    <div className="flex-1 min-h-screen">
      <h1 className="text-preset-1 font-bold text-grey-900 mb-400">Overview</h1>

      <div className="flex gap-400">
        <FinancialSummary transactions={data?.allTransactions.transactions} />
      </div>
      <div className="flex gap-400"></div>
    </div>
  );
};

export default Overview;
