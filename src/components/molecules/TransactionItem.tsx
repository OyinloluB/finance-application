import React from "react";
import Image from "next/image";
import { LatestTransaction } from "@/types/budget";
import { DateTime } from "luxon";

const TransactionItem = ({ tx }: { tx: LatestTransaction }) => (
  <div className="flex justify-between text-sm text-grey-700 py-150 last:pb-0 first:pt-0 border-b last:border-b-0 border-grey-500/15">
    <div className="flex items-center gap-200">
      <Image
        src={tx.image}
        alt={tx.name}
        width={32}
        height={32}
        className="w-400 h-400 rounded-full"
      />
      <span className="font-bold text-grey-900">{tx.recipient.name}</span>
    </div>
    <div className="flex flex-col items-end gap-50 text-preset-5">
      <span className="font-bold text-grey-900">${tx.amount}</span>
      <span className="text-grey-500">
        {DateTime.fromISO(tx.date).toFormat("MMM dd, yyyy")}
      </span>
    </div>
  </div>
);

export default TransactionItem;
