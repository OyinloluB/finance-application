"use client";

import ProtectedRoute from "@/components/atoms/ProtectedRoute";
import Table from "@/components/organisms/Table";
import Pagination from "@/components/organisms/Pagination";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import useTransactions from "@/hooks/useTransactions";
import Button from "@/components/atoms/Button";
import TransactionFormModal from "@/components/molecules/modal/TransactionFormModal";
import { TransactionFormData } from "@/types/transaction";
import { transactionColumns } from "@/components/atoms/TableColumns";
import DataStateHandler from "@/components/atoms/DataStateHandler";
import Image from "next/image";
import { CategoryLabels } from "@/types/categories";
import { formatCurrency } from "@/utils/formatCurrency";
import { DateTime } from "luxon";

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
      <div className="flex-1 h-screen px-200 py-300 sm:px-400 sm:py-400">
        <div className="flex justify-between items-center mb-400">
          <h1 className="sm:text-preset-1 text-preset-2 font-bold text-grey-900">
            Transactions
          </h1>
          <Button
            type="primary"
            text="+ Add New"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>

        <div className="px-250 py-300 sm:py-400 sm:px-400 bg-white rounded-md">
          <FormProvider {...methods}>
            <div className="flex items-center gap-200 flex-wrap sm:gap-300 mb-400">
              <div className="flex-grow min-w-[0] max-w-[60%] sm:max-w-[380px]">
                <InputField
                  name="search_transactions"
                  placeholder="Search transaction"
                  icon="MagnifyingGlassIcon"
                />
              </div>
              <div className="flex flex-1 gap-300 items-center justify-end">
                <div className="hidden lg:flex">
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
                </div>

                <div className="flex lg:hidden">
                  <SelectField
                    name="sort_by"
                    icon="SortByIcon"
                    variant="icon-only"
                    options={[
                      { label: "Latest", value: "latest" },
                      { label: "Oldest", value: "oldest" },
                      { label: "A to Z", value: "a_to_z" },
                      { label: "Z to A", value: "z_to_a" },
                      { label: "Highest", value: "highest" },
                      { label: "Lowest", value: "lowest" },
                    ]}
                  />
                </div>

                <div className="hidden lg:flex">
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

                <div className="flex lg:hidden">
                  <SelectField
                    name="category"
                    label="Category"
                    icon="FilterIcon"
                    variant="icon-only"
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
            </div>
          </FormProvider>

          <DataStateHandler
            isLoading={isLoading}
            error={error}
            data={data?.transactions}
          >
            <Table
              data={data?.transactions}
              columns={transactionColumns}
              renderMobileRow={(txn) => {
                const isExpense = txn.type === "EXPENSE";
                const amountClass =
                  Number(txn.amount) >= 0 ? "text-green-500" : "text-grey-900";

                return (
                  <div className="flex justify-between items-center border-b border-grey-100 pb-300">
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
                      <span
                        className={`text-preset-4 font-bold ${amountClass}`}
                      >
                        {formatCurrency(Number(txn.amount))}
                      </span>
                      <span className="text-grey-500 text-preset-5">
                        {DateTime.fromISO(txn.date).toFormat("dd MMM yyyy")}
                      </span>
                    </div>
                  </div>
                );
              }}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={data?.totalPages}
              onPageChange={setCurrentPage}
            />
          </DataStateHandler>
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
