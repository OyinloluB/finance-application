import React from "react";

import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { useForm, FormProvider } from "react-hook-form";
import { Budget } from "@/types/budget";
import Modal from "@/components/atoms/Modal";

interface BudgetFormModalProps {
  title: string;
  description?: string;
  actionButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Budget) => void;
  defaultValues?: Budget;
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

  const methods = useForm({
    defaultValues: defaultValues || {
      category: "entertainment",
      maxLimit: undefined,
      theme: "GREEN",
    },
  });

  const handleSubmitForm = () => {
    methods.handleSubmit(onSubmit)();
  };

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
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-300"
        >
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
            options={[
              {
                label: "Green",
                value: "GREEN",
                color: "#277C78",
                status: "used",
              },
              {
                label: "Yellow",
                value: "YELLOW",
                color: "#F2CDAC",
                status: "used",
              },
              {
                label: "Cyan",
                value: "CYAN",
                color: "#82C9D7",
                status: "used",
              },
              { label: "Navy", value: "NAVY", color: "#626070" },
              { label: "Red", value: "RED", color: "#C94736" },
              { label: "Purple", value: "PURPLE", color: "#826CB0" },
            ]}
          />
        </form>
      </FormProvider>
    </Modal>
  );
};

export default BudgetFormModal;
