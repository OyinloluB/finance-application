import React, { useMemo, useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { DateTime } from "luxon";
import * as yup from "yup";

import Modal from "../../atoms/Modal";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import useUsers from "@/hooks/useUsers";
import { useAuth } from "@/context/AuthContext";
import { CategoryType } from "@/types/categories";
import { TransactionFormData } from "@/types/transaction";
import { yupResolver } from "@hookform/resolvers/yup";

interface User {
  id: string;
  name: string;
}

interface TransactionFormModalProps {
  title: string;
  actionButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => Promise<void>;
}

const TransactionFormModal = ({
  title,
  actionButtonText,
  isOpen,
  onClose,
  onSubmit,
}: TransactionFormModalProps) => {
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(true);

  const transactionSchema = useMemo(
    () =>
      yup.object({
        amount: yup
          .number()
          .typeError("Amount must be a number")
          .positive("Amount must be greater than zero")
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
          .when("type", ([type], schema) =>
            type === "EXPENSE"
              ? schema.required("Recipient is required")
              : schema.notRequired()
          ),
        date: yup
          .string()
          .typeError("Invalid date format")
          .required("Date is required")
          .transform((value) =>
            value instanceof Date ? value.toISOString() : value
          ),
      }),
    []
  );

  const methods = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchema),
    mode: "onChange",
    defaultValues: {
      amount: undefined,
      category: CategoryType.GENERAL,
      date: DateTime.now().toISODate(),
      type: "INCOME",
      recipientId: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const transactionType = useWatch({ control: methods.control, name: "type" });

  const { data: users, isLoading } = useUsers();
  const { user: currentUser } = useAuth();

  const handleSubmitForm = handleSubmit(async (data) => {
    setGeneralError(null);
    setSubmitting(true);

    try {
      await onSubmit(data);
      methods.reset();
    } catch (error) {
      console.error("Transaction submission error:", error);
      setGeneralError("Failed to submit transaction. Please try again.");
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      actionButtonText={actionButtonText}
      loading={submitting}
      onClose={() => {
        methods.reset();
        setGeneralError(null);
        onClose();
      }}
      onConfirm={handleSubmitForm}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-300">
          <InputField
            name="amount"
            label="Amount"
            type="number"
            placeholder="e.g. 200"
            error={errors.amount?.message}
            disabled={submitting}
          />
          <SelectField
            name="category"
            label="Category"
            options={[
              { label: "General", value: "GENERAL" },
              { label: "Entertainment", value: "ENTERTAINMENT" },
              { label: "Bills", value: "BILLS" },
              { label: "Groceries", value: "GROCERIES" },
              { label: "Dining Out", value: "DINING_OUT" },
              { label: "Transportation", value: "TRANSPORTATION" },
              { label: "Personal Care", value: "PERSONAL_CARE" },
              { label: "Education", value: "EDUCATION" },
            ]}
            error={errors.category?.message}
            disabled={submitting}
          />
          <SelectField
            name="type"
            label="Transaction Type"
            options={[
              { label: "Income", value: "INCOME" },
              { label: "Expense", value: "EXPENSE" },
            ]}
            error={errors.type?.message}
            disabled={submitting}
          />
          {transactionType === "EXPENSE" && (
            <SelectField
              name="recipientId"
              label="Recipient"
              options={
                isLoading
                  ? [{ label: "Loading users...", value: "" }]
                  : users.length > 0
                  ? users
                      .filter((user: User) => user.id !== currentUser?.uid)
                      .map((user: User) => ({
                        label: user.name,
                        value: user.id,
                      }))
                  : [{ label: "No users available", value: "" }]
              }
              disabled={submitting}
              error={errors.recipientId?.message}
            />
          )}
          <InputField
            name="date"
            label="Date"
            type="date"
            error={errors.date?.message}
            disabled={submitting}
          />

          {generalError && (
            <p className="text-preset-5 text-right text-secondary-red">
              {generalError}
            </p>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
};

export default TransactionFormModal;
