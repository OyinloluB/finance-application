"use client";

import ProtectedRoute from "@/components/molecules/ProtectedRoute";
import Table from "@/components/organisms/Table";
import Pagination from "@/components/molecules/Pagination";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Spinner from "@/components/atoms/Spinner";
import { getErrorMessage } from "@/utils/errors";
import { useEffect, useState } from "react";
import useTransactions from "@/hooks/useTransactions";

const Transactions = () => {
  const methods = useForm();
  const [currentPage, setCurrentPage] = useState(1);

  const watchedSearch = useWatch({
    control: methods.control,
    name: "search_transactions",
  });
  const watchedCategory = useWatch({
    control: methods.control,
    name: "category",
  });
  const watchedSortBy = useWatch({
    control: methods.control,
    name: "sort_by",
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [watchedSearch, watchedCategory, watchedSortBy]);

  const { data, isLoading, error } = useTransactions({
    page: currentPage,
    search: watchedSearch || "",
    category: watchedCategory || "all_transactions",
    sortBy: watchedSortBy || "latest",
  });

  return (
    <ProtectedRoute>
      <div className="flex-1 p-400 h-screen">
        <h1 className="text-preset-1 font-bold text-grey-900 mb-400">
          Transactions
        </h1>

        <div className="p-400 bg-white rounded-md">
          <FormProvider {...methods}>
            <div className="flex items-end justify-between gap-300 mb-400 ">
              <div className="max-w-[350px]">
                <InputField
                  name="search_transactions"
                  placeholder="Search transaction"
                  icon="MagnifyingGlassIcon"
                />
              </div>
              <div className="flex flex-1 gap-300 items-center justify-end">
                <SelectField
                  name="sort_by"
                  label="Sort by"
                  placeholder="Latest"
                  layout="row"
                  options={[
                    { label: "Latest", value: "latest" },
                    { label: "Oldest", value: "oldest" },
                    { label: "A to Z", value: "a_to_z" },
                    { label: "Z to A", value: "z_to_a" },
                    { label: "Highest", value: "highest" },
                    { label: "Lowest", value: "lowest" },
                  ]}
                />
                <SelectField
                  name="category"
                  label="Category"
                  placeholder="All Transactions"
                  layout="row"
                  options={[
                    { label: "All Transactions", value: "all_transactions" },
                    { label: "General", value: "general" },
                    { label: "Entertainment", value: "entertainment" },
                    { label: "Bills", value: "bills" },
                    { label: "Groceries", value: "groceries" },
                    { label: "Dining Out", value: "dining_out" },
                    { label: "Transportation", value: "transportation" },
                    { label: "Personal Care", value: "personal_care" },
                    { label: "Education", value: "education" },
                  ]}
                />
              </div>
            </div>
          </FormProvider>

          {isLoading ? (
            <div className="flex justify-center items-center py-400">
              <Spinner />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center py-400">
              {getErrorMessage(error)}
            </p>
          ) : data?.transactions.length > 0 ? (
            <>
              <Table data={data.transactions} />
              <Pagination
                currentPage={currentPage}
                totalPages={data.totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <p className="text-center text-grey-500 py-400">
              No transactions found.
            </p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Transactions;
