import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import useOverviewData from "@/hooks/useOverview";
import { Transaction } from "@/types/transaction";
import { formatCurrency } from "@/utils/formatCurrency";
import { DateTime } from "luxon";
import DataStateHandler from "@/components/atoms/DataStateHandler";

const TransactionsOverview = () => {
  const { data, isLoading, error } = useOverviewData();

  const transactions = data?.latestTransactions.transactions ?? [];

  return (
    <div className="p-400 bg-white rounded-lg w-full h-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-preset-2 text-grey-900 font-bold">Transactions</h3>
        <Button
          text="View All"
          type="tertiary"
          iconRight="CaretRightIcon"
          hideOutline
          className="text-grey-500 pr-0"
        />
      </div>

      <DataStateHandler isLoading={isLoading} error={error} data={transactions}>
        {transactions.slice(0, 5).map((transaction: Transaction) => (
          <div
            className="flex justify-between text-sm text-grey-700 py-250 last:pb-0 first:pt-0 border-b last:border-b-0 border-grey-500/15"
            key={transaction.id}
          >
            <div className="flex items-center gap-200">
              <Image
                src={transaction.image}
                alt={transaction.name || "transaction name"}
                width={40}
                height={40}
                className="w-500 h-500 rounded-full"
              />
              <span className="font-bold text-grey-900">
                {transaction.name}
              </span>
            </div>
            <div className="flex flex-col items-end gap-50 text-preset-5">
              <span className="font-bold text-grey-900">
                {formatCurrency(Number(transaction.amount))}
              </span>
              <span className="text-grey-500">
                {DateTime.fromISO(transaction.date).toFormat("dd LLL yyyy")}
              </span>
            </div>
          </div>
        ))}
      </DataStateHandler>
    </div>
  );
};

export default TransactionsOverview;
