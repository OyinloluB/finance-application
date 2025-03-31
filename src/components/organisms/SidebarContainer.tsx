"use client";
import React from "react";
import Sidebar from "../molecules/Sidebar";
import BottomNav from "../molecules/BottonNav";

const SidebarContainer = () => {
  return (
    <>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="block lg:hidden">
        <BottomNav />
      </div>
    </>
  );
};

export default SidebarContainer;
