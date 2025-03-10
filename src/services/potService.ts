import { Pot } from "@/types/pot";
import { getUserIdToken } from "./authService";

const API_BASE_URL = "/api/pots";

export const fetchPots = async (): Promise<Pot[]> => {
  const token = await getUserIdToken();

  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch pots");
  }

  return response.json();
};

export const createPot = async (pot: Partial<Pot>): Promise<Pot> => {
  const token = await getUserIdToken();

  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pot),
  });

  if (!response.ok) {
    throw new Error("Failed to create pot");
  }

  return response.json();
};

export const updatePot = async (
  id: string,
  updatedPot: Partial<Pot>
): Promise<Pot> => {
  const token = await getUserIdToken();

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPot),
  });

  if (!response.ok) {
    throw new Error("Failed to update pot");
  }

  return response.json();
};

export const deletePot = async (id: string): Promise<void> => {
  const token = await getUserIdToken();

  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to delete pot");
  }
};

export const depositToPot = async (
  id: string,
  amount: number
): Promise<Pot> => {
  const token = await getUserIdToken();

  const response = await fetch(`${API_BASE_URL}/${id}/deposit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    throw new Error("Failed to deposit to pot");
  }

  return response.json();
};

export const withdrawFromPot = async (
  id: string,
  amount: number
): Promise<Pot> => {
  const token = await getUserIdToken();

  const response = await fetch(`${API_BASE_URL}/${id}/withdraw`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    throw new Error("Failed to withdraw from pot");
  }

  return response.json();
};
