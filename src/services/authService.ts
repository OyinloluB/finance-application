import { getAuth } from "firebase/auth";

export const getUserIdToken = async (): Promise<string> => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");
  return user.getIdToken();
};
