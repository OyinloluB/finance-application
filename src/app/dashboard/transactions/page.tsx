"use client";

import ProtectedRoute from "@/components/molecules/ProtectedRoute";
import Table, { Transaction } from "@/components/organisms/Table";
import Pagination from "@/components/molecules/Pagination";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import useTransactions from "@/hooks/useTransactions";
import Spinner from "@/components/atoms/Spinner";
import { getErrorMessage } from "@/utils/errors";
import { useMemo } from "react";

const Transactions = () => {
  const methods = useForm();
  const { data: transactions, isLoading, error } = useTransactions();

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

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    const searchQuery = (watchedSearch || "").toLowerCase().trim();
    const selectedCategory = (watchedCategory || "all_transactions")
      .toLowerCase()
      .trim();
    const sortBy = watchedSortBy || "latest";

    let result = transactions.filter((tx: Transaction) => {
      const matchesSearch = tx.name.toLowerCase().includes(searchQuery);
      const matchesCategory =
        selectedCategory === "all_transactions"
          ? true
          : tx.category.toLowerCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      if (sortBy === "a_to_z") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "z_to_a") {
        return b.name.localeCompare(a.name);
      }
      if (sortBy === "highest") {
        return b.amount - a.amount;
      }
      if (sortBy === "lowest") {
        return a.amount - b.amount;
      }
      return 0;
    });

    return result;
  }, [transactions, watchedSearch, watchedCategory, watchedSortBy]);

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
          ) : filteredTransactions.length > 0 ? (
            <>
              <Table data={filteredTransactions} />
              <Pagination />
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
