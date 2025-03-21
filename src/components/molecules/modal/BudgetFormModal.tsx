import React, { useState } from "react";

import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { useForm, FormProvider } from "react-hook-form";
import { Budget, BudgetFormData } from "@/types/budget";
import Modal from "@/components/atoms/Modal";
import { themes } from "@/utils/themeColors";
import { yupResolver } from "@hookform/resolvers/yup";
import { budgetSchema } from "@/utils/validationSchemas";

interface BudgetFormModalProps {
  title: string;
  description?: string;
  actionButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Budget) => Promise<void>;
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
  const [generalError, setGeneralError] = useState<string | null>(null);

  const methods = useForm<BudgetFormData>({
    resolver: yupResolver(budgetSchema),
    mode: "onChange",
    defaultValues: {
      category: defaultValues?.category ?? "entertainment",
      maxLimit: defaultValues?.maxLimit ?? undefined,
      theme: defaultValues?.theme ?? "green",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleSubmitForm = handleSubmit(async (data) => {
    setGeneralError(null);

    try {
      const newBudget: Partial<Budget> = { ...data };
      await onSubmit(newBudget as Budget);
      methods.reset();
    } catch (error) {
      console.error("Budget submission error:", error);
      setGeneralError("Failed to submit budget. Please try again.");
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
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
          <SelectField
            name="category"
            label="Budget Category"
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
          <InputField
            name="maxLimit"
            label="Maximum Spend"
            prefix="$"
            type="number"
            placeholder="e.g. 2000"
            error={errors.maxLimit?.message}
            disabled={isSubmitting}
          />
          <SelectField
            name="theme"
            label="Theme"
            variant="color-selection"
            options={themes}
            error={errors.theme?.message}
            disabled={isSubmitting}
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

export default BudgetFormModal;
