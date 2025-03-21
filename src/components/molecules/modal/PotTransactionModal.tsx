import React, { useMemo, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import Modal from "@/components/atoms/Modal";
import InputField from "@/components/atoms/InputField";
import { Pot, PotTransactionFormData } from "@/types/pot";
import { formatCurrency } from "@/utils/formatCurrency";
import { yupResolver } from "@hookform/resolvers/yup";

interface PotTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pot: Pot;
  type: "deposit" | "withdraw";
  actionButtonText: string;
  onSubmit: (data: PotTransactionFormData) => Promise<void>;
  description: string;
}

const PotTransactionModal = ({
  isOpen,
  onClose,
  pot,
  type,
  actionButtonText,
  onSubmit,
  description,
}: PotTransactionModalProps) => {
  const [generalError, setGeneralError] = useState<string | null>(null);

  const transactionSchema = useMemo(
    () =>
      yup.object({
        amount: yup
          .number()
          .typeError("Please enter a valid amount")
          .positive("Amount must be greater than zero")
          .required("Amount is required")
          .test(
            "max-withdraw",
            "Cannot withdraw more than available balance",
            (value, context) => {
              if (context.options.context?.type === "withdraw") {
                return value !== undefined && value <= pot.currentAmount;
              }
              return true;
            }
          ),
      }),
    [pot.currentAmount]
  );

  const methods = useForm<PotTransactionFormData>({
    resolver: yupResolver(transactionSchema),
    mode: "onChange",
    context: { type },
    defaultValues: { amount: undefined },
  });

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = methods;

  const enteredAmount = Number(watch("amount")) || 0;
  const newAmount =
    type === "withdraw"
      ? pot.currentAmount - enteredAmount
      : pot.currentAmount + enteredAmount;

  const currentPercentage = (pot.currentAmount / pot.targetAmount) * 100;
  const newPercentage = (newAmount / pot.targetAmount) * 100;

  const handleSubmitForm = handleSubmit(async (data) => {
    setGeneralError(null);
    try {
      await onSubmit(data);
      methods.reset();
    } catch (error) {
      console.error("Pot transaction error:", error);
      setGeneralError("Failed to process transaction. Please try again.");
    }
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        methods.reset();
        setGeneralError(null);
        onClose();
      }}
      title={
        type === "deposit"
          ? `Add to '${pot.name}'`
          : `Withdraw from '${pot.name}'`
      }
      actionButtonText={actionButtonText}
      description={description}
      onConfirm={handleSubmitForm}
    >
      <FormProvider {...methods}>
        <div className="flex justify-between items-center mt-250 mb-200">
          <span className="text-preset-4 text-grey-500">New Amount</span>
          <span className="text-preset-1 text-grey-900 font-bold">
            {formatCurrency(newAmount)}
          </span>
        </div>

        <div className="w-full bg-beige-100 rounded-lg h-[8px] overflow-hidden mb-[15px] flex">
          <div
            className="h-full bg-black mr-[2px]"
            style={{
              width: `${Math.max(
                type === "withdraw" ? newPercentage : currentPercentage,
                0
              )}%`,
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
            }}
          />

          <div
            className={`h-full ${
              type === "withdraw" ? "bg-red-500" : "bg-green-500"
            } transition-all duration-300`}
            style={{
              width: `${
                Math.min(
                  type === "withdraw"
                    ? currentPercentage - newPercentage
                    : newPercentage - currentPercentage,
                  100
                ) || 0
              }%`,
              borderTopRightRadius: "6px",
              borderBottomRightRadius: "6px",
            }}
          />
        </div>

        <div className="flex justify-between items-center mb-500">
          <span
            className={`text-preset-5 font-bold ${
              type === "withdraw" ? "text-red-500" : "text-green-500"
            }`}
          >
            {pot.targetAmount > 0 ? `${newPercentage.toFixed(2)}%` : "0%"}
          </span>
          <span className="text-preset-5 text-grey-500">
            Target of ${pot.targetAmount}
          </span>
        </div>

        <form className="flex flex-col gap-300">
          <InputField
            name="amount"
            label={`Amount to ${type === "deposit" ? "Add" : "Withdraw"}`}
            type="number"
            prefix="$"
            placeholder="e.g. 200"
            error={errors.amount?.message}
            disabled={isSubmitting}
          />
        </form>

        {generalError && (
          <p className="text-preset-5 text-right text-secondary-red">
            {generalError}
          </p>
        )}
      </FormProvider>
    </Modal>
  );
};

export default PotTransactionModal;
