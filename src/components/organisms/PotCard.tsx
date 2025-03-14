import { Pot } from "@/types/pot";
import Button from "@/components/atoms/Button";
import { useState } from "react";
import { usePots } from "@/hooks/usePots";
import PotTransactionModal from "../molecules/modal/PotTransactionModal";
import { themeColors } from "@/utils/themeColors";
import DropdownMenu from "../atoms/Dropdown";
import DeletePotModal from "../molecules/modal/DeletePotModal";
import PotFormModal from "../molecules/modal/PotFormModal";

interface PotCardProps {
  pot: Pot;
}

const PotCard = ({ pot }: PotCardProps) => {
  const { withdrawFromPot, depositToPot, updatePot, deletePot } = usePots();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<
    "deposit" | "withdraw"
  >("deposit");

  const percentageSaved = (pot.currentAmount / pot.targetAmount) * 100;

  const handleEditPot = (updatedPot: Partial<Pot>) => {
    updatePot.mutate(
      { id: pot.id, updatedPot },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
        },
      }
    );
  };

  const handleDeletePot = () => {
    deletePot.mutate(pot.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      },
    });
  };

  const handleTransaction = ({ amount }: { amount: number }) => {
    if (transactionType === "deposit") {
      depositToPot.mutate({ id: pot.id, amount });
    } else {
      withdrawFromPot.mutate({ id: pot.id, amount });
    }
    setIsTransactionModalOpen(false);
  };

  return (
    <div className="bg-white p-300 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-500">
        <h3 className="text-preset-2 font-bold text-grey-900 flex items-center">
          <span
            className={`w-200 h-200 rounded-full ${
              themeColors[pot.theme]
            } mr-200`}
          />
          {pot.name}
        </h3>
        <DropdownMenu
          items={[
            { label: "Edit Pot", action: () => setIsEditModalOpen(true) },
            {
              label: "Delete Pot",
              action: () => setIsDeleteModalOpen(true),
              danger: true,
            },
          ]}
        />
      </div>

      <div className="flex justify-between items-center mb-200">
        <span className="text-preset-4 text-grey-500">Total Saved</span>
        <span className="text-preset-1 text-grey-900 font-bold">
          ${pot.currentAmount.toFixed(2)}
        </span>
      </div>

      <div className="w-full bg-beige-100 rounded-full h-2 mb-[15px]">
        <div
          className={`h-full rounded-full ${themeColors[pot.theme]}`}
          style={{
            width: `${(pot.currentAmount / pot.targetAmount) * 100}%`,
            backgroundColor: `${themeColors[pot.theme]}`,
          }}
        />
      </div>

      <div className="flex justify-between items-center mb-500">
        <span className="text-preset-5 font-bold text-grey-500">
          {pot.targetAmount > 0 ? `${percentageSaved.toFixed(2)}%` : "0%"}
        </span>
        <span className="text-preset-5 text-grey-500">
          Target of ${pot.targetAmount}
        </span>
      </div>

      <div className="mt-400 flex w-full text-preset-4 font-bold gap-200">
        <Button
          type="secondary"
          text="+ Add Money"
          onClick={() => {
            setTransactionType("deposit");
            setIsTransactionModalOpen(true);
          }}
          className="flex-1"
        />
        <Button
          type="secondary"
          text="Withdraw"
          onClick={() => {
            setTransactionType("withdraw");
            setIsTransactionModalOpen(true);
          }}
          className="flex-1"
        />
      </div>

      <PotFormModal
        title="Edit Pot"
        actionButtonText="Save Changes"
        description="If your saving targets change, feel free to update your pots."
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditPot}
        defaultValues={pot}
      />

      <PotTransactionModal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        actionButtonText={
          transactionType === "deposit"
            ? "Confirm Addition"
            : "Confirm Withdrawal"
        }
        pot={pot}
        type={transactionType}
        onSubmit={handleTransaction}
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus  hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet."
      />

      <DeletePotModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeletePot}
        title={`Delete '${pot.name}'?`}
        description="Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever."
      />
    </div>
  );
};

export default PotCard;
