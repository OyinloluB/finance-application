"use client";

import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createTransaction,
  fetchTransactions,
} from "@/services/transactionService";
import { useBudgets } from "./useBudgets";

const useTransactions = (params: {
  page: number;
  search?: string;
  category?: string;
  sortBy?: string;
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
