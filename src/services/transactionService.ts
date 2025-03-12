import { TransactionFormData } from "@/types/transaction";
import { getUserIdToken } from "./authService";
import { DateTime } from "luxon";

const API_BASE_URL = "/api/transactions";
const MAX_TRANSACTIONS_LIMIT = 1000;

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

export const fetchTransactions = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  fetchAll?: boolean;
}) => {
  const token = await getUserIdToken();

  const queryParams = new URLSearchParams({
    page: params?.fetchAll ? "1" : params?.page?.toString() || "1",
    limit: params?.fetchAll
      ? MAX_TRANSACTIONS_LIMIT.toString()
      : params?.limit?.toString() || "6",
    search: params?.search || "",
    category: params?.category || "all_transactions",
    sortBy: params?.sortBy || "latest",
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
