"use client";

import React, { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  CellContext,
} from "@tanstack/react-table";
import Image from "next/image";

interface Transaction {
  id: string;
  name: string;
  image: string;
  category: string;
  date: string;
  amount: number;
}

interface TableProps {
  data: Transaction[];
}

const Table = ({ data }: TableProps) => {
  const columns = useMemo<ColumnDef<Transaction>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Recipient / Sender",
        cell: (info: CellContext<Transaction, unknown>) => {
          const row = info.row.original;

          return (
            <div className="flex items-center gap-200">
              <Image
                src={row.image}
                alt={row.name}
                width={32}
                height={32}
                className="w-12 h-12 rounded-full "
              />
              <span className="font-bold text-grey-900">
                {String(info.getValue())}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info: CellContext<Transaction, unknown>) => info.getValue(),
      },
      {
        accessorKey: "date",
        header: "Transaction Date",
        cell: (info: CellContext<Transaction, unknown>) => info.getValue(),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: (info: CellContext<Transaction, unknown>) => {
          const value = Number(info.getValue());
          return (
            <span
              className={`font-bold ${
                value >= 0 ? "text-secondary-green" : "text-grey-900"
              }`}
            >
              {value >= 0
                ? `+$${value.toFixed(2)}`
                : `-$${Math.abs(value).toFixed(2)}`}
            </span>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
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
              <tr
                key={row.id}
                className="border-b last:border-b-0 border-grey-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-200 py-300 text-preset-5 text-grey-500 font-normal last:text-right"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default Table;
