import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
