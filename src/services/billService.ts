import { getUserIdToken } from "./authService";

const API_BASE_URL = "/api/bills";

export const fetchBills = async (sortBy = "latest", search = "") => {
  const token = await getUserIdToken();

  const queryParams = new URLSearchParams({
    sortBy,
    search,
  });

  const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recurring bills");
  }

  const data = await response.json();
  return data.bills ?? [];
};
