import { getAuth } from "firebase/auth";
import { useQuery } from "react-query";

export const fetchTransactions = async ({
  page = 1,
  limit = 6,
  search = "",
  category = "all_transactions",
  sortBy = "latest",
}) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();

  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    search,
    category,
    sortBy,
  });

  const response = await fetch(`/api/transactions?${queryParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  const data = await response.json();
  return data ?? [];
};

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
