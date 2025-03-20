"use client";

import { useQuery } from "react-query";
import { fetchBills } from "@/services/billService";

export const useBills = (sortBy = "latest", search = "") => {
  const queryKey = ["bills", sortBy, search];

  const { data, isLoading, error } = useQuery(
    queryKey,
    () => fetchBills(sortBy, search),
    {
      keepPreviousData: true,
    }
  );

  return {
    data,
    isLoading,
    error,
  };
};
