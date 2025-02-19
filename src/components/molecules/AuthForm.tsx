"use client";

import React, { useMemo, useState } from "react";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "@/services/firebaseConfig";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";

interface AuthFormProps {
  type: "signup" | "login";
}

interface FormDataProps {
  name?: string;
  email: string;
  password: string;
}

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  const validationSchema = useMemo(
    () =>
      yup.object({
        name:
          type === "signup"
            ? yup.string().required("Name is required")
            : yup.string().optional(),
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        password: yup
          .string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      }),
    [type]
  );

  const methods = useForm<FormDataProps>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit: SubmitHandler<FormDataProps> = async (data) => {
    setFirebaseError(null);

    try {
      if (type === "signup") {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      } else {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      }

      router.push("/dashboard");
    } catch (error) {
      setFirebaseError(getFirebaseErrorMessage(error));
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-400 shadow-md w-[560px] h-fit rounded-lg"
        >
          <h2 className="text-preset-1 font-bold mb-400 text-grey-900">
            {type === "signup" ? "Sign Up" : "Login"}
          </h2>

          <div className="flex flex-col gap-200">
            {type === "signup" && <InputField name="name" label="Name" />}
            <InputField name="email" label="Email" />
            <InputField
              name="password"
              label="Password"
              icon="EyeIcon"
              helperText="Passwords must be at least 8 characters"
            />
          </div>

          <Button
            text={type === "signup" ? "Create Account" : "Login"}
            type="primary"
            disabled={!isValid}
            className="w-full mt-400"
          />

          {firebaseError && (
            <p className="text-preset-4 text-secondary-red text-center mt-400">
              {firebaseError}
            </p>
          )}

          <p className="text-preset-4 text-center text-grey-500 mt-400">
            {type === "signup"
              ? "Already have an account?"
              : "Need to create an account?"}
            <a
              href={type === "signup" ? "/auth/login" : "/auth/signup"}
              className="text-grey-900 font-bold ml-1 underline underline-offset-4"
            >
              {type === "signup" ? "Login" : "Sign Up"}
            </a>
          </p>
        </form>
      </div>
    </FormProvider>
  );
};

export default AuthForm;
