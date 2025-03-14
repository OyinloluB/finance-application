"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { billColumns } from "@/components/atoms/TableColumns";
import Table from "@/components/organisms/Table";
import BillSummary from "@/components/molecules/summary/BillSummaryItem";
import BillFilters from "@/components/molecules/BillFilters";
import { useBills } from "@/hooks/useBills";
import Spinner from "@/components/atoms/Spinner";

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
    <div className="flex-1 min-h-screen">
      <h1 className="text-preset-1 font-bold text-grey-900 mb-400">
        Recurring Bills
      </h1>

      <div className="flex gap-400">
        <BillSummary bills={bills} />

        <div className="w-2/3 flex flex-col">
          <div className="bg-white rounded-lg shadow-md p-400">
            <FormProvider {...methods}>
              <BillFilters />
            </FormProvider>

            {isLoading ? (
              <div className="flex justify-center items-center py-400">
                <Spinner />
              </div>
            ) : bills?.length > 0 ? (
              <Table data={bills} columns={billColumns} />
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
