import { useQuery } from "react-query";
import { fetchTransactionSummary } from "@/services/transactionService";

const useTransactionSummary = () => {
  const { data, error, isLoading } = useQuery(
    "transactionSummary",
    fetchTransactionSummary
  );

  return {
    totalIncome: data?.totalIncome ?? 0,
    totalExpenses: data?.totalExpenses ?? 0,
    isLoading,
    error,
  };
};

export default useTransactionSummary;
