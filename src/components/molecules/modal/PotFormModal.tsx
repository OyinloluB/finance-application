import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Modal from "@/components/atoms/Modal";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { Pot, PotFormData } from "@/types/pot";
import { themes } from "@/utils/themeColors";
import { yupResolver } from "@hookform/resolvers/yup";
import { potSchema } from "@/utils/validationSchemas";

interface PotFormModalProps {
  title: string;
  description?: string;
  actionButtonText: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Pot) => Promise<void>;
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
  const [generalError, setGeneralError] = useState<string | null>(null);

  const methods = useForm<PotFormData>({
    resolver: yupResolver(potSchema),
    mode: "onChange",
    defaultValues: defaultValues || {
      name: "",
      targetAmount: undefined,
      theme: "green",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const handleSubmitForm = handleSubmit(async (data) => {
    setGeneralError(null);

    try {
      const newPot: Partial<Pot> = { ...data };
      await onSubmit(newPot as Pot);
      methods.reset();
    } catch (error) {
      console.error("Pot submission error:", error);
      setGeneralError("Failed to submit pot. Please try again.");
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
          <InputField
            name="name"
            label="Pot Name"
            placeholder="e.g. Rainy Days"
            error={errors.name?.message}
            disabled={isSubmitting}
          />
          <InputField
            name="targetAmount"
            label="Target Amount"
            type="number"
            prefix="$"
            placeholder="e.g. 2000"
            error={errors.targetAmount?.message}
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

export default PotFormModal;
