"use client";

import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

const Table = <TData,>({ data, columns }: TableProps<TData>) => {
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
              <tr key={row.id} className="s">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-200 py-200 text-preset-5 text-grey-500 font-normal last:text-right"
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
