import { getAuth } from "firebase/auth";
import { useQuery } from "react-query";

export const fetchTransactions = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const token = await user.getIdToken();
  const response = await fetch("/api/transactions", {
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

const useTransactions = () => {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: fetchTransactions,
  });
};

export default useTransactions;
