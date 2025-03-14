import React, { useState } from "react";

import { themeColors } from "@/utils/themeColors";
import { Budget } from "@/types/budget";
import DropdownMenu from "../atoms/Dropdown";
import BudgetStat from "../molecules/BudgetStat";
import BudgetTransactionItem from "../molecules/TransactionItem";
import { useBudgets } from "@/hooks/useBudgets";
import { CategoryLabels } from "@/types/categories";
import Spinner from "../atoms/Spinner";
import BudgetFormModal from "../molecules/modal/BudgetFormModal";
import DeleteBudgetModal from "../molecules/modal/DeleteBudgetModal";

interface BudgetCardProps {
  budget: Budget;
}

const BudgetCard = ({ budget }: BudgetCardProps) => {
  const { updateBudget, deleteBudget, isLoading } = useBudgets();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditBudget = (updatedBudget: Partial<Budget>) => {
    updateBudget.mutate(
      { id: budget.id, updatedBudget },
      {
        onSuccess: () => {
          setIsEditModalOpen(false);
        },
      }
    );
  };

  const handleDeleteBudget = () => {
    deleteBudget.mutate(budget.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[150px]">
        <Spinner />
      </div>
    );
  }

  console.log({ budget });

  return (
    <div className="bg-white p-400 rounded-lg">
      <div className="flex justify-between items-center mb-250">
        <h3 className="text-preset-2 font-bold text-grey-900 flex items-center">
          <span
            className="w-200 h-200 rounded-full mr-200"
            style={{ backgroundColor: `${themeColors[budget.theme]}` }}
          />
          {CategoryLabels[budget.category]}
        </h3>
        <DropdownMenu
          items={[
            { label: "Edit Budget", action: () => setIsEditModalOpen(true) },
            {
              label: "Delete Budget",
              action: () => setIsDeleteModalOpen(true),
              danger: true,
            },
          ]}
        />
      </div>

      <div className="mb-250">
        <span className="text-preset-4 text-grey-500">
          Maximum of ${budget.maxLimit}
        </span>
        <div className="mt-200 bg-beige-100 h-400 p-50 rounded-sm overflow-hidden">
          <div
            className="h-full rounded-md"
            style={{
              width: `${(budget.currentSpend / budget.maxLimit) * 100}%`,
              backgroundColor: `${themeColors[budget.theme]}`,
              maxWidth: "100%",
            }}
          />
        </div>
      </div>

      <div className="flex gap-200 text-preset-5 mb-250">
        <BudgetStat
          label="Spent"
          value={budget.currentSpend}
          theme={themeColors[budget.theme]}
        />
        <BudgetStat
          label="Remaining"
          value={budget.remaining}
          theme="bg-beige-100"
        />
      </div>

      <div className="p-250 bg-beige-100 rounded-lg">
        <h4 className="text-preset-3 text-grey-900 font-bold mb-200">
          Latest Spending
        </h4>
        {budget.transactions.length > 0 ? (
          budget.transactions
            .slice(0, 3)
            .map((tx) => <BudgetTransactionItem key={tx.id} tx={tx} />)
        ) : (
          <p className="text-grey-500 text-center text-preset-5 italic">
            No transactions yet
          </p>
        )}
      </div>

      <BudgetFormModal
        title="Edit Budget"
        actionButtonText="Save Changes"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditBudget}
        defaultValues={budget}
      />

      <DeleteBudgetModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteBudget}
        title={`Delete '${CategoryLabels[budget.category]}'?`}
        description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
      />
    </div>
  );
};

export default BudgetCard;
