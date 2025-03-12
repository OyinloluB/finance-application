"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import BudgetChart from "@/components/organisms/BudgetChart";
import BudgetSpendingSummaryItem from "@/components/molecules/summary/BudgetSpendingSummaryItem";
import BudgetCard from "@/components/organisms/BudgetCard";
import { Budget } from "@/types/budget";
import { useBudgets } from "@/hooks/useBudgets";
import BudgetFormModal from "@/components/molecules/modal/BudgetFormModal";
import Spinner from "@/components/atoms/Spinner";

const BudgetsPage = () => {
  const { budgets, createBudget, isLoading } = useBudgets();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddBudget = (newBudget: Budget) => {
    createBudget.mutate(newBudget, {
      onSuccess: () => setIsAddModalOpen(false),
    });
  };

  return (
    <div className="flex-1 min-h-screen">
      <div className="flex justify-between items-center mb-400">
        <h1 className="text-preset-1 font-bold text-grey-900">Budgets</h1>
        <Button
          type="primary"
          text="+ Add New Budget"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-400">
          <Spinner />
        </div>
      ) : budgets.length > 0 ? (
        <div className="flex gap-300">
          <div className="flex-1 h-fit bg-white p-400 rounded-lg mb-400">
            <BudgetChart budgets={budgets} isLoading={isLoading} />

            <div>
              <h2 className="text-preset-2 font-bold text-grey-900 mb-300">
                Spending Summary
              </h2>

              <div className="flex-1">
                {budgets
                  .filter((budget) => budget.transactions.length > 0)
                  .map((budget) => (
                    <BudgetSpendingSummaryItem
                      key={budget.id}
                      budget={budget}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="flex-auto grid grid-cols-1 gap-400">
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-grey-500 mt-400">
          <p className="text-preset-3 mb-50">No budgets found</p>
          <p className="text-preset-3">
            Start by creating a budget to track your spending.
          </p>
        </div>
      )}

      <BudgetFormModal
        title="Add New Budget"
        description="Choose a category to set a spending budget. These categories can help you monitor spending."
        actionButtonText="Add Budget"
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddBudget}
      />
    </div>
  );
};

export default BudgetsPage;
