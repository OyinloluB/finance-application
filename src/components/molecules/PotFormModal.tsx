import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Modal from "@/components/atoms/Modal";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { Pot } from "@/types/pot";

interface PotFormModalProps {
  title: string;
  description?: string;
  actionButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Pot) => void;
  defaultValues?: Pot;
}

const themes = [
  { label: "Green", value: "GREEN", color: "#277C78" },
  { label: "Yellow", value: "YELLOW", color: "#F2CDAC" },
  { label: "Cyan", value: "CYAN", color: "#82C9D7" },
  { label: "Navy", value: "NAVY", color: "#626070" },
  { label: "Red", value: "RED", color: "#C94736" },
  { label: "Purple", value: "PURPLE", color: "#826CB0" },
];

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
