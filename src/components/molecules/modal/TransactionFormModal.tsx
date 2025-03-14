import React from "react";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { useForm, FormProvider, useWatch } from "react-hook-form";
import Modal from "../../atoms/Modal";
import { TransactionFormData } from "@/types/transaction";
import { CategoryType } from "@/types/categories";
import { DateTime } from "luxon";
import useUsers from "@/hooks/useUsers";

interface User {
  id: string;
  name: string;
}

interface TransactionFormModalProps {
  title: string;
  actionButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TransactionFormData) => void;
}

const TransactionFormModal = ({
  title,
  actionButtonText,
  isOpen,
  onClose,
  onSubmit,
}: TransactionFormModalProps) => {
  const methods = useForm<TransactionFormData>({
    defaultValues: {
      name: "",
      amount: undefined,
      category: CategoryType.GENERAL,
      date: DateTime.now().toISODate(),
      type: "EXPENSE",
      recipientId: "",
    },
  });

  const transactionType = useWatch({ control: methods.control, name: "type" });
  const { data: users, isLoading } = useUsers();

  const handleSubmitForm = () => {
    methods.handleSubmit((data) => {
      onSubmit(data);
      methods.reset();
    })();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      actionButtonText={actionButtonText}
      onClose={() => {
        methods.reset();
        onClose();
      }}
      onConfirm={handleSubmitForm}
    >
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-300"
        >
          <InputField
            name="amount"
            label="Amount"
            type="number"
            placeholder="e.g. 200"
          />
          <SelectField
            name="category"
            label="Category"
            options={[
              { label: "General", value: "general" },
              { label: "Entertainment", value: "entertainment" },
              { label: "Bills", value: "bills" },
              { label: "Groceries", value: "groceries" },
              { label: "Dining Out", value: "dining_out" },
              { label: "Transportation", value: "transportation" },
              { label: "Personal Care", value: "personal_care" },
              { label: "Education", value: "education" },
            ]}
          />
          <SelectField
            name="type"
            label="Transaction Type"
            options={[
              { label: "Income", value: "INCOME" },
              { label: "Expense", value: "EXPENSE" },
            ]}
          />
          {transactionType === "EXPENSE" && (
            <SelectField
              name="recipientId"
              label="Recipient"
              options={
                isLoading
                  ? [{ label: "Loading users...", value: "" }]
                  : users.length > 0
                  ? users.map((user: User) => ({
                      label: user.name,
                      value: user.id,
                    }))
                  : [{ label: "No users available", value: "" }]
              }
            />
          )}
          <InputField name="date" label="Date" type="date" />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default TransactionFormModal;
