import { useQuery } from "react-query";
import { fetchTransactions } from "@/services/transactionService";

const useTransactions = (params: {
  page: number;
  search?: string;
  category?: string;
  sortBy?: string;
}) => {
  return useQuery(["transactions", params], () => fetchTransactions(params), {
    keepPreviousData: true,
  });
};

export default useTransactions;
