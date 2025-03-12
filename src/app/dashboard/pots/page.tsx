"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";

import { usePots } from "@/hooks/usePots";
import { Pot } from "@/types/pot";
import PotFormModal from "@/components/molecules/modal/PotFormModal";
import PotCard from "@/components/organisms/PotCard";
import Spinner from "@/components/atoms/Spinner";

const PotsPage = () => {
  const { pots, createPot, isLoading } = usePots();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddPot = (newPot: Pot) => {
    createPot.mutate(newPot, {
      onSuccess: () => setIsAddModalOpen(false),
    });
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="flex justify-between items-center mb-400">
        <h1 className="text-preset-1 font-bold text-grey-900">Pots</h1>
        <Button
          type="primary"
          text="+ Add New Pot"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-400">
          <Spinner />
        </div>
      ) : pots.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-300">
          {pots.map((pot) => (
            <PotCard key={pot.id} pot={pot} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-grey-500 mt-400">
          <p className="text-preset-3 mb-50">No savings pots found</p>
          <p className="text-preset-3">
            Start by creating a savings pot to manage your savings goals.
          </p>
        </div>
      )}

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
