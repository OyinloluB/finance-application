import { TransactionFormData } from "@/types/transaction";
import { getUserIdToken } from "./authService";
import { DateTime } from "luxon";

const API_BASE_URL = "/api/transactions";

export const createTransaction = async (
  newTransaction: TransactionFormData
) => {
  const token = await getUserIdToken();

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...newTransaction,
      amount:
        newTransaction.type === "EXPENSE"
          ? -Math.abs(newTransaction.amount)
          : Math.abs(newTransaction.amount),
      date: DateTime.fromISO(newTransaction.date).toISO(),
      recipientId:
        newTransaction.type === "EXPENSE" ? newTransaction.recipientId : null,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }
  return response.json();
};

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

  const response = await fetch(`${API_BASE_URL}?${queryParams}`, {
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
