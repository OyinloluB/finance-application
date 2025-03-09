import { useQuery } from "react-query";
import { fetchUsers } from "@/services/userService";

const useUsers = () => {
  return useQuery(["users"], fetchUsers, {
    staleTime: 1000 * 60 * 5,
  });
};

export default useUsers;
