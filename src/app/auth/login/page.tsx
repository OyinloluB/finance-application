import AuthForm from "@/components/molecules/AuthForm";
import AuthIllustration from "@/components/organisms/AuthIllustration";
import AuthLayout from "@/components/organisms/AuthLayout";
import React from "react";

const Login = () => {
  return (
    <AuthLayout>
      <AuthIllustration />
      <AuthForm type="login" />
    </AuthLayout>
  );
};

export default Login;
