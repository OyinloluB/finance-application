"use client";

import React from "react";
import SidebarContainer from "@/components/organisms/SidebarContainer";
import ProtectedRoute from "@/components/atoms/ProtectedRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <SidebarContainer />
        <main className="flex-1 overflow-y-auto bg-beige-100 pb-[80px] lg:pb-0">{children}</main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
