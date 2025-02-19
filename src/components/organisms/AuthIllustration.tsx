import React from "react";
import Image from "next/image";
import Logo from "../atoms/icons/Logo";

const AuthIllustration = () => {
  return (
    <div className="p-250">
      <div className="flex relative">
        <div className="absolute top-500 left-500">
          <Logo />
        </div>
        <Image
          src="/auth-illustration.png"
          width={500}
          height={600}
          alt="Finance Illustration"
          className="rounded-lg"
          objectFit="contain"
        />
        <div className="absolute bottom-0 p-500">
          <h2 className="text-preset-1 font-bold">
            Keep track of your money and save for your future
          </h2>
          <p className="text-preset-4 mt-300">
            Personal finance app puts you in control of your spending. Track
            transactions, set budgets, and add to savings pots easily.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthIllustration;
