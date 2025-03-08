import { getUserIdToken } from "./authService";

export const fetchTransactions = async ({
  page = 1,
  limit = 6,
  search = "",
  category = "all_transactions",
  sortBy = "latest",
}) => {
  const token = await getUserIdToken();

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
