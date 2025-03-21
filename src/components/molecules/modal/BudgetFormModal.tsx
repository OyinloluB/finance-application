import React from "react";

import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { useForm, FormProvider } from "react-hook-form";
import { Budget, BudgetFormData } from "@/types/budget";
import Modal from "@/components/atoms/Modal";
import { themes } from "@/utils/themeColors";

interface BudgetFormModalProps {
  title: string;
  description?: string;
  actionButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Budget) => void;
  defaultValues?: Partial<Budget>;
}

const BudgetFormModal = ({
  title,
  description,
  actionButtonText,
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: BudgetFormModalProps) => {
  const methods = useForm<BudgetFormData>({
    defaultValues: {
      category: defaultValues?.category ?? "entertainment",
      maxLimit: defaultValues?.maxLimit ?? 0,
      theme: defaultValues?.theme ?? "green",
    },
  });

  const handleSubmitForm = methods.handleSubmit((data: BudgetFormData) => {
    const newBudget: Partial<Budget> = {
      ...data,
    };

    onSubmit(newBudget as Budget);
  });

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      actionButtonText={actionButtonText}
      onClose={onClose}
      onConfirm={handleSubmitForm}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmitForm} className="flex flex-col gap-300">
          <SelectField
            name="category"
            label="Budget Category"
            options={[
              { label: "Entertainment", value: "entertainment" },
              { label: "Bills", value: "bills" },
              { label: "Groceries", value: "groceries" },
              { label: "Dining Out", value: "dining_out" },
              { label: "Transportation", value: "transportation" },
              { label: "Personal Care", value: "personal_care" },
              { label: "Education", value: "education" },
            ]}
          />
          <InputField
            name="maxLimit"
            label="Maximum Spend"
            prefix="$"
            type="number"
            placeholder="e.g. 2000"
          />
          <SelectField
            name="theme"
            label="Theme"
            variant="color-selection"
            options={themes}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default BudgetFormModal;
