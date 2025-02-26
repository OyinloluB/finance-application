"use client";

import ProtectedRoute from "@/components/molecules/ProtectedRoute";
import Table from "@/components/organisms/Table";
import Pagination from "@/components/molecules/Pagination";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { FormProvider, useForm } from "react-hook-form";
import useTransactions from "@/hooks/useTransactions";
import Spinner from "@/components/atoms/Spinner";
import { getErrorMessage } from "@/utils/errors";

const Transactions = () => {
  const methods = useForm();
  const { data: transactions, isLoading, error } = useTransactions();

  return (
    <ProtectedRoute>
      <div className="flex-1 p-400 h-screen">
        <h1 className="text-preset-1 font-bold text-grey-900 mb-400">
          Transactions
        </h1>

        <div className="p-400 bg-white rounded-md">
          <FormProvider {...methods}>
            <div className="flex items-end justify-between gap-300 mb-400 ">
              <div className="max-w-[320px]">
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
              <Spinner /> {/* ✅ Replace text with centered spinner */}
            </div>
          ) : error ? (
            <p className="text-red-500 text-center py-400">
              {getErrorMessage(error)}
            </p>
          ) : transactions.length > 0 ? (
            <>
              <Table data={transactions} />
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
