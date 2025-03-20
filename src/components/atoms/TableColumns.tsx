import { ColumnDef, CellContext } from "@tanstack/react-table";
import Image from "next/image";
import { Transaction } from "@/types/transaction";
import { RecurringBill } from "@/types/bills";
import { DateTime } from "luxon";
import { formatCurrency } from "@/utils/formatCurrency";
import { CategoryLabels } from "@/types/categories";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Recipient / Sender",
    cell: (info: CellContext<Transaction, unknown>) => {
      const row = info.row.original;
      const isExpense = row.type === "EXPENSE";

      return (
        <div className="flex items-center gap-200">
          <Image
            src={row.image}
            alt={row.name || "name"}
            width={28}
            height={28}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-bold text-grey-900">
            {isExpense ? `${row.recipient.name}` : `${row.name}`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: (info: CellContext<Transaction, unknown>) => {
      const row = info.row.original;

      return <span>{CategoryLabels[row.category]}</span>;
    },
  },
  {
    accessorKey: "date",
    header: "Transaction Date",
    cell: (info: CellContext<Transaction, unknown>) => {
      const rawDate = info.getValue() as string;
      return <span>{DateTime.fromISO(rawDate).toFormat("MMM dd, yyyy")}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info: CellContext<Transaction, unknown>) => {
      const value = Number(info.getValue());
      return (
        <span
          className={`font-bold ${
            value >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {formatCurrency(value)}
        </span>
      );
    },
  },
];

export const billColumns: ColumnDef<RecurringBill>[] = [
  {
    accessorKey: "name",
    header: "Bill Title",
    cell: (info: CellContext<RecurringBill, unknown>) => {
      const bill = info.row.original;
      return (
        <div className="flex items-center gap-200">
          <Image
            src={bill.image}
            alt={bill.name || "bill name"}
            width={28}
            height={28}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-bold text-grey-900">{bill.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: (info: CellContext<RecurringBill, unknown>) => {
      const rawDate = info.getValue() as string;
      return <span>Monthly - {DateTime.fromISO(rawDate).day}th</span>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info: CellContext<RecurringBill, unknown>) => {
      const value = Number(info.getValue());
      const bill = info.row.original;
      return (
        <span
          className={`font-bold ${
            bill.status === "DUE_SOON" ? "text-red-500" : "text-black"
          }`}
        >
          {formatCurrency(value)}
        </span>
      );
    },
  },
];
