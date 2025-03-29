"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";

import { usePots } from "@/hooks/usePots";
import { Pot } from "@/types/pot";
import PotFormModal from "@/components/molecules/modal/PotFormModal";
import PotCard from "@/components/organisms/PotCard";
import DataStateHandler from "@/components/atoms/DataStateHandler";

const PotsPage = () => {
  const { pots, createPot, isLoading, error } = usePots();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddPot = (newPot: Pot) => {
    return new Promise<void>((resolve, reject) => {
      createPot.mutate(newPot, {
        onSuccess: () => {
          setIsAddModalOpen(false);
          resolve();
        },
        onError: (error) => {
          console.error("Error updating budget:", error);
          reject(error);
        },
      });
    });
  };

  return (
    <div className="flex-1 min-h-screen  px-200 py-300 sm:px-400 sm:py-400">
      <div className="flex justify-between items-center mb-400">
        <h1 className="text-preset-1 font-bold text-grey-900">Pots</h1>
        <Button
          type="primary"
          text="+ Add New Pot"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <DataStateHandler isLoading={isLoading} error={error} data={pots}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-300">
          {pots.map((pot) => (
            <PotCard key={pot.id} pot={pot} />
          ))}
        </div>
      </DataStateHandler>

      <PotFormModal
        title="Add New Pot"
        description="Create a pot to set savings targets. These can help keep you on track as you save for special purchases."
        actionButtonText="Add Pot"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPot}
      />
    </div>
  );
};

export default PotsPage;
