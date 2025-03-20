"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTransaction,
  fetchTransactions,
} from "@/services/transactionService";
import { useBudgets } from "./useBudgets";
import { CategoryType } from "@/types/categories";

const useTransactions = (params: {
  page: number;
  search?: string;
  category?: CategoryType | "all_transactions";
  sortBy?: "latest" | "oldest" | "a_to_z" | "z_to_a" | "highest" | "lowest";
}) => {
  const queryClient = useQueryClient();
  const queryKey = ["transactions", params];
  const { updateBudgetsAfterTransaction } = useBudgets();

  const createTransactionMutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      updateBudgetsAfterTransaction();
    },
  });

  const { data, isLoading, error } = useQuery(
    queryKey,
    () => fetchTransactions(params),
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading,
    error,
    createTransaction: createTransactionMutation,
  };
};

export default useTransactions;
