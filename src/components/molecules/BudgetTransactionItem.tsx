import React from "react";
import Image from "next/image";
import { LatestTransaction } from "@/types/budget";

const BudgetTransactionItem = ({ tx }: { tx: LatestTransaction }) => (
  <div className="flex justify-between text-sm text-grey-700 py-150 last:pb-0 first:pt-0 border-b last:border-b-0 border-gray-500/15">
    <div className="flex items-center gap-200">
      <Image
        src={tx.image}
        alt={tx.name}
        width={32}
        height={32}
        className="w-400 h-400 rounded-full"
      />
      <span className="font-bold text-grey-900">{tx.name}</span>
    </div>
    <div className="flex flex-col items-end gap-50 text-preset-5">
      <span className="font-bold text-gray-900">${tx.amount.toFixed(2)}</span>
      {/* <span>{DateTime.fromISO(tx.date).toFormat("MMM dd, yyyy")}</span> */}
      <span className="text-gray-500">{tx.date}</span>
    </div>
  </div>
);

export default BudgetTransactionItem;
