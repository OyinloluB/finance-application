import { Budget } from "@/types/budget";
import { getUserIdToken } from "./authService";

const API_BASE_URL = "/api/budgets";

export const fetchBudgets = async (): Promise<Budget> => {
  const token = await getUserIdToken();
  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch budgets");
  return response.json();
};

export const createBudget = async (
  newBudget: Partial<Budget>
): Promise<Budget> => {
  const token = await getUserIdToken();
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBudget),
  });

  if (!response.ok) {
    throw new Error("Failed to create budget");
  }
  return response.json();
};

export const updateBudget = async (
  id: string,
  updatedBudget: Partial<Budget>
): Promise<Budget> => {
  const token = await getUserIdToken();
  const response = await fetch(`API_BASE_URL/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedBudget),
  });

  if (!response.ok) throw new Error("Failed to update budget");
  return response.json();
};

export const deleteBudget = async (id: string): Promise<void> => {
  const token = await getUserIdToken();

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to delete budget");
};
