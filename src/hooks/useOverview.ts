import { useQuery } from "react-query";
import { fetchTransactions } from "@/services/transactionService";
import { fetchPots } from "@/services/potService";
import { fetchBudgets } from "@/services/budgetService";
import { fetchBills } from "@/services/billService";

const useOverviewData = () => {
  return useQuery({
    queryKey: ["overviewData"],
    queryFn: async () => {
      const [allTransactions, latestTransactions, pots, budgets, bills] =
        await Promise.all([
          fetchTransactions(),
          fetchTransactions({ limit: 5 }),
          fetchPots(),
          fetchBudgets(),
          fetchBills(),
        ]);

      return { allTransactions, latestTransactions, pots, budgets, bills };
    },
  });
};

export default useOverviewData;
