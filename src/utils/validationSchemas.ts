import * as yup from "yup";
import { CategoryType } from "@/types/categories";

export const getAuthSchema = (type: "signup" | "login") =>
  yup.object({
    name:
      type === "signup"
        ? yup.string().required("Name is required")
        : yup.string().optional(),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

export const budgetSchema = yup.object({
  category: yup.string().required("Category is required"),
  maxLimit: yup
    .number()
    .typeError("Maximum Spend must be a number")
    .positive("Please enter a valid amount")
    .required("Maximum Spend is required"),
  theme: yup.string().required("Theme is required"),
});

export const potSchema = yup.object({
  name: yup.string().required("Pot Name is required"),
  targetAmount: yup
    .number()
    .typeError("Please enter a valid amount")
    .positive("Target please enter a valid amount")
    .required("Target Amount is required"),
  theme: yup.string().required("Theme is required"),
});

export const transactionSchema = yup.object({
  amount: yup
    .number()
    .typeError("Please enter a valid amount")
    .positive("Please enter a valid amount")
    .required("Amount is required"),
  category: yup
    .mixed<CategoryType>()
    .oneOf(Object.values(CategoryType), "Invalid category")
    .required("Category is required"),
  type: yup
    .string()
    .oneOf(["INCOME", "EXPENSE"], "Invalid transaction type")
    .required("Transaction type is required"),
  recipientId: yup
    .string()
    .optional()
    .when("type", {
      is: "EXPENSE",
      then: (schema) => schema.required("Recipient is required"),
    }),
  date: yup
    .string()
    .typeError("Invalid date format")
    .required("Date is required"),
});

export const getPotTransactionSchema = (
  type: "deposit" | "withdraw",
  currentAmount: number
) =>
  yup.object({
    amount: yup
      .number()
      .typeError("Please enter a valid amount")
      .positive("Please enter a valid amount")
      .required("Amount is required")
      .test(
        "max-withdraw",
        "Cannot withdraw more than available balance",
        (value) =>
          type === "withdraw"
            ? value !== undefined && value <= currentAmount
            : true
      ),
  });
