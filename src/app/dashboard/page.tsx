import ProtectedRoute from "@/components/molecules/ProtectedRoute";
import SidebarContainer from "@/components/organisms/SidebarContainer";
import React from "react";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <SidebarContainer />
    </ProtectedRoute>
  );
};

export default Dashboard;
