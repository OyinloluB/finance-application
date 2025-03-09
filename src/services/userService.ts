import { getUserIdToken } from "./authService";

const API_BASE_URL = "/api/users";

export const fetchUsers = async () => {
  const token = await getUserIdToken();

  const response = await fetch(API_BASE_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return await response.json();
};
