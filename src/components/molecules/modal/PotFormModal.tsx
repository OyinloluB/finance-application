import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Modal from "@/components/atoms/Modal";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { Pot } from "@/types/pot";
import { themes } from "@/utils/themeColors";

interface PotFormModalProps {
  title: string;
  description?: string;
  actionButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Pot) => void;
  defaultValues?: Pot;
}

const PotFormModal = ({
  title,
  description,
  actionButtonText,
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: PotFormModalProps) => {
  const methods = useForm({
    defaultValues: defaultValues || {
      name: "",
      targetAmount: undefined,
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
          <InputField
            name="name"
            label="Pot Name"
            placeholder="e.g. Rainy Days"
          />
          <InputField
            name="targetAmount"
            label="Target Amount"
            type="number"
            prefix="$"
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

export default PotFormModal;
