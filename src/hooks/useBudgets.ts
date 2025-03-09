import {
  createBudget,
  deleteBudget,
  fetchBudgets,
  updateBudget,
} from "@/services/budgetService";
import { Budget } from "@/types/budget";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useBudgets = () => {
  const queryClient = useQueryClient();

  const {
    data: budgets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["budgets"],
    queryFn: fetchBudgets,
    staleTime: 1000 * 60 * 5,
  });

  const createBudgetMutation = useMutation({
    mutationFn: createBudget,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  });

  const updateBudgetMutation = useMutation({
    mutationFn: ({
      id,
      updatedBudget,
    }: {
      id: string;
      updatedBudget: Partial<Budget>;
    }) => updateBudget(id, updatedBudget),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  });

  const deleteBudgetMutation = useMutation({
    mutationFn: deleteBudget,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["budgets"] }),
  });

  const updateBudgetsAfterTransaction = () => {
    queryClient.invalidateQueries({ queryKey: ["budgets"] });
  };

  return {
    budgets,
    isLoading,
    error,
    createBudget: createBudgetMutation,
    updateBudget: updateBudgetMutation,
    deleteBudget: deleteBudgetMutation,
    updateBudgetsAfterTransaction,
  };
};
