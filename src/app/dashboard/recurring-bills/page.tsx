"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { billColumns } from "@/components/atoms/TableColumns";
import Table from "@/components/organisms/Table";
import BillSummary from "@/components/molecules/summary/BillSummaryItem";
import BillFilters from "@/components/molecules/BillFilters";
import { useBills } from "@/hooks/useBills";
import Spinner from "@/components/atoms/Spinner";
import Image from "next/image";
import { DateTime } from "luxon";
import { formatCurrency } from "@/utils/formatCurrency";

const Bills = () => {
  const methods = useForm({
    defaultValues: { search_bills: "", sort_by: "latest" },
  });

  const watchedSearch = useWatch({
    control: methods.control,
    name: "search_bills",
  });
  const watchedSortBy = useWatch({ control: methods.control, name: "sort_by" });

  const { data: bills, isLoading } = useBills(watchedSortBy, watchedSearch);

  return (
    <div className="flex-1 min-h-screen px-200 py-300 sm:px-400 sm:py-400">
      <h1 className="text-preset-1 font-bold text-grey-900 mb-400">
        Recurring Bills
      </h1>

      <div className="flex flex-col sm:flex-row gap-300 sm:gap-400">
        <BillSummary bills={bills} />

        <div className="w-full sm:w-2/3 flex flex-col">
          <div className="bg-white rounded-lg shadow-md px-250 py-300 sm:py-400 sm:px-400">
            <FormProvider {...methods}>
              <BillFilters />
            </FormProvider>

            {isLoading ? (
              <div className="flex justify-center items-center py-400">
                <Spinner />
              </div>
            ) : bills?.length > 0 ? (
              <Table
                data={bills}
                columns={billColumns}
                renderMobileRow={(bill) => {
                  const isDueSoon = bill.status === "DUE_SOON";
                  const amountClass = isDueSoon
                    ? "text-red-500"
                    : "text-grey-900";

                  return (
                    <div className="flex justify-between items-center border-b border-grey-100 pb-300">
                      <div className="flex items-center gap-150">
                        <Image
                          src={bill.image}
                          alt={bill.name}
                          width={28}
                          height={28}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col">
                          <span className="text-preset-4 text-grey-900 font-bold">
                            {bill.name}
                          </span>
                          <span className="text-grey-500 text-preset-5">
                            Monthly - {DateTime.fromISO(bill.dueDate).day}th
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`text-preset-4 font-bold ${amountClass}`}
                        >
                          {formatCurrency(Number(bill.amount))}
                        </span>
                        <span className="text-grey-500 text-preset-5">
                          {bill.status === "DUE_SOON" ? "Due soon" : "Upcoming"}
                        </span>
                      </div>
                    </div>
                  );
                }}
              />
            ) : (
              <p>No bills found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bills;
