import { Pot } from "@/types/pot";

export const fetchPots = async (): Promise<Pot[]> => {
  const res = await fetch("/api/pots");
  if (!res.ok) {
    throw new Error("Failed to fetch pots");
  }
  return res.json();
};

export const createPot = async (
  pot: Omit<Pot, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<Pot> => {
  const res = await fetch("/api/pots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pot),
  });
  if (!res.ok) {
    throw new Error("Failed to create pot");
  }
  return res.json();
};

export const updatePot = async (
  id: string,
  updatedPot: Partial<Pot>
): Promise<Pot> => {
  const res = await fetch(`/api/pots/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPot),
  });
  if (!res.ok) {
    throw new Error("Failed to update pot");
  }
  return res.json();
};

export const deletePot = async (id: string): Promise<void> => {
  const res = await fetch(`/api/pots/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete pot");
  }
};

export const depositToPot = async (
  id: string,
  amount: number
): Promise<Pot> => {
  const res = await fetch(`/api/pots/${id}/deposit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) {
    throw new Error("Failed to deposit to pot");
  }
  return res.json();
};

export const withdrawFromPot = async (
  id: string,
  amount: number
): Promise<Pot> => {
  const res = await fetch(`/api/pots/${id}/withdraw`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) {
    throw new Error("Failed to withdraw from pot");
  }
  return res.json();
};
