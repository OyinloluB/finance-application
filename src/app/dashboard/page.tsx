"use client";

import DataStateHandler from "@/components/atoms/DataStateHandler";
import ProtectedRoute from "@/components/atoms/ProtectedRoute";
import Spinner from "@/components/atoms/Spinner";
import BillsOverview from "@/components/molecules/overview/BillsOverview";
import BudgetsOverview from "@/components/molecules/overview/BudgetsOverview";
import FinancialSummary from "@/components/molecules/overview/FinancialOverview";
import PotsOverview from "@/components/molecules/overview/PotsOverview";
import TransactionsOverview from "@/components/molecules/overview/TransactionsOverview";
import useOverviewData from "@/hooks/useOverview";

const Overview = () => {
  const { data, isLoading, error } = useOverviewData();

  const isEmpty =
    (!data?.allTransactions?.transactions?.length ||
      data?.allTransactions?.transactions.length === 0) &&
    (!data?.pots?.length || data?.pots.length === 0) &&
    (!data?.budgets?.length || data?.budgets.length === 0);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <DataStateHandler isLoading={isLoading} error={error} data={!isEmpty}>
        <div className="flex-1 min-h-screen p-400">
          <h1 className="text-preset-1 font-bold text-grey-900 mb-400">
            Overview   
          </h1>
          <div className="flex gap-400">
            <FinancialSummary
              transactions={data?.allTransactions.transactions}
              pots={data?.pots}
            />
          </div>
          <div className="flex gap-300">
            <div className="w-3/5 flex flex-col gap-400">
              <PotsOverview />
              <TransactionsOverview />
            </div>
            <div className="w-2/5 flex flex-col gap-400">
              <BudgetsOverview />
              <BillsOverview />
            </div>
          </div>
        </div>
      </DataStateHandler>
    </ProtectedRoute>
  );
};

export default Overview;
