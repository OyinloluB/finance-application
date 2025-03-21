"use client";

import ProtectedRoute from "@/components/atoms/ProtectedRoute";
import Table from "@/components/organisms/Table";
import Pagination from "@/components/organisms/Pagination";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import Spinner from "@/components/atoms/Spinner";
import { getErrorMessage } from "@/utils/errors";
import { useEffect, useState } from "react";
import useTransactions from "@/hooks/useTransactions";
import Button from "@/components/atoms/Button";
import TransactionFormModal from "@/components/molecules/modal/TransactionFormModal";
import { TransactionFormData } from "@/types/transaction";
import { transactionColumns } from "@/components/atoms/TableColumns";

const Transactions = () => {
  const methods = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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

  const { data, isLoading, error, createTransaction } = useTransactions({
    page: currentPage,
    search: watchedSearch || "",
    category: watchedCategory || "all_transactions",
    sortBy: watchedSortBy || "latest",
  });

  const handleAddTransaction = async (newTransaction: TransactionFormData) => {
    return new Promise<void>((resolve, reject) => {
      createTransaction.mutate(newTransaction, {
        onSuccess: () => {
          setIsAddModalOpen(false);
          resolve();
        },
        onError: (error) => {
          console.error("Error updating budget:", error);
          reject(error);
        },
      });
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [watchedSearch, watchedCategory, watchedSortBy]);

  return (
    <ProtectedRoute>
      <div className="flex-1 h-screen p-400">
        <div className="flex justify-between items-center mb-400">
          <h1 className="text-preset-1 font-bold text-grey-900">
            Transactions
          </h1>
          <Button
            type="primary"
            text="+ Add New Transaction"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>

        <div className="p-400 bg-white rounded-md">
          <FormProvider {...methods}>
            <div className="flex items-end justify-between gap-300 mb-400 ">
              <div className="max-w-[380px] flex-1">
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
              <Table data={data.transactions} columns={transactionColumns} />
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
        <TransactionFormModal
          title="Add New Transaction"
          actionButtonText="Add Transaction"
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddTransaction}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Transactions;
