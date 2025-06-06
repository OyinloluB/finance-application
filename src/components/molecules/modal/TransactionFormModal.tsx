import React, { useState } from "react";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import { DateTime } from "luxon";

import Modal from "../../atoms/Modal";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import useUsers from "@/hooks/useUsers";
import { useAuth } from "@/context/AuthContext";
import { CategoryType } from "@/types/categories";
import { TransactionFormData } from "@/types/transaction";
import { yupResolver } from "@hookform/resolvers/yup";
import { transactionSchema } from "@/utils/validationSchemas";
import { usePots } from "@/hooks/usePots";
import useTransactionSummary from "@/hooks/useTransactionSummary";

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
  const { pots } = usePots();
  const { totalIncome, totalExpenses } = useTransactionSummary();
  const totalSavings = pots.reduce((sum, pot) => sum + pot.currentAmount, 0);
  const availableBalance = totalIncome - totalExpenses + totalSavings;
  const [generalError, setGeneralError] = useState<string | null>(null);

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
    formState: { errors, isSubmitting },
  } = methods;

  const transactionType = useWatch({ control: methods.control, name: "type" });

  const { data: users, isLoading } = useUsers();
  const { user: currentUser } = useAuth();

  const handleSubmitForm = handleSubmit(async (data) => {
    setGeneralError(null);

    if (data.type === "EXPENSE" && data.amount > availableBalance) {
      setGeneralError(
        "Insufficient savings. Add more funds to a pot or reduce your expense amount."
      );
      return;
    }

    try {
      await onSubmit(data);
      methods.reset();
    } catch (error) {
      console.error("Transaction submission error:", error);
      setGeneralError("Failed to submit transaction. Please try again.");
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      actionButtonText={actionButtonText}
      loading={isSubmitting}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          />
          <SelectField
            name="type"
            label="Transaction Type"
            options={[
              { label: "Income", value: "INCOME" },
              { label: "Expense", value: "EXPENSE" },
            ]}
            error={errors.type?.message}
            disabled={isSubmitting}
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
              disabled={isSubmitting}
              error={errors.recipientId?.message}
            />
          )}
          <InputField
            name="date"
            label="Date"
            type="date"
            error={errors.date?.message}
            disabled={isSubmitting}
          />

          {generalError && (
            <p className="text-preset-5 text-center text-secondary-red">
              {generalError}
            </p>
          )}
        </form>
      </FormProvider>
    </Modal>
  );
};

export default TransactionFormModal;
