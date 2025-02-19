import AuthForm from "@/components/molecules/AuthForm";
import AuthIllustration from "@/components/organisms/AuthIllustration";
import AuthLayout from "@/components/organisms/AuthLayout";
import React from "react";

const Signup = () => {
  return (
    <AuthLayout>
      <AuthIllustration />
      <AuthForm type="signup" />
    </AuthLayout>
  );
};

export default Signup;
