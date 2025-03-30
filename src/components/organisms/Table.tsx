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
  renderMobileRow?: (row: TData) => React.ReactNode;
}

const Table = <TData extends { id: string | number }>({
  data,
  columns,
  renderMobileRow,
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
                <td
                  colSpan={columns.length}
                  className="text-center text-grey-900 p-300"
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden space-y-400">
        {data?.length > 0 ? (
          renderMobileRow ? (
            data.map((row) => <div key={row.id}>{renderMobileRow(row)}</div>)
          ) : (
            <p className="text-center text-grey-900">
              No mobile layout provided
            </p>
          )
        ) : (
          <p className="text-center text-grey-900">No results found</p>
        )}
      </div>
    </>
  );
};

export default Table;
