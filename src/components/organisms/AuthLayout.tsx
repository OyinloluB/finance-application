import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-screen bg-beige-100">{children}</div>;
};

export default AuthLayout;
