"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Transaction } from "@/types/transaction";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import { DateTime } from "luxon";
import { CategoryLabels } from "@/types/categories";

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

const Table = <TData extends Transaction>({
  data,
  columns,
}: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="hidden lg:block">
        <table className="w-full">
          <thead className="border-b border-grey-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left last:text-right text-preset-5 text-grey-500 font-normal py-150 px-200"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-200 py-200 text-preset-5 text-grey-500 font-normal last:text-right"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-grey-900 p-300">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="lg:hidden space-y-400">
        {data?.length > 0 ? (
          data.map((txn) => {
            const isExpense = txn.type === "EXPENSE";
            const amountClass =
              Number(txn.amount) >= 0 ? "text-green-500" : "text-grey-900";

            return (
              <div
                key={txn.id}
                className="flex justify-between items-center border-b border-grey-100 pb-300"
              >
                <div className="flex items-center gap-150">
                  <Image
                    src={txn.image}
                    alt={txn.name}
                    width={28}
                    height={28}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-preset-4 text-grey-900 font-bold">
                      {isExpense ? txn.recipient.name : txn.name}
                    </span>
                    <span className="text-grey-500 text-preset-5">
                      {CategoryLabels[txn.category]}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className={`text-preset-4 font-bold ${amountClass}`}>
                    {formatCurrency(Number(txn.amount))}
                  </span>
                  <span className="text-grey-500 text-preset-5">
                    {DateTime.fromISO(txn.date).toFormat("dd MMM yyyy")}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-grey-900">No transactions found</p>
        )}
      </div>
    </>
  );
};

export default Table;
