"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  // if (loading)
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       {/* <div className="w-8 h-8 border-4 border-t-transparent border-gray-900 rounded-full animate-spin" /> */}
  //     </div>
  //   );

  return user ? children : null;
};

export default ProtectedRoute;
