"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import BudgetChart from "@/components/organisms/BudgetChart";
import BudgetSpendingSummaryItem from "@/components/molecules/summary/BudgetSpendingSummaryItem";
import BudgetCard from "@/components/organisms/BudgetCard";
import { Budget } from "@/types/budget";
import { useBudgets } from "@/hooks/useBudgets";
import BudgetFormModal from "@/components/molecules/modal/BudgetFormModal";
import DataStateHandler from "@/components/atoms/DataStateHandler";

const BudgetsPage = () => {
  const { budgets, createBudget, isLoading, error } = useBudgets();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddBudget = (newBudget: Budget) => {
    return new Promise<void>((resolve, reject) => {
      createBudget.mutate(newBudget, {
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

  const hasTransactions = budgets.some(
    (budget) => budget.transactions && budget.transactions.length > 0
  );

  return (
    <div className="flex-1 min-h-screen p-400">
      <div className="flex justify-between items-center mb-400">
        <h1 className="text-preset-1 font-bold text-grey-900">Budgets</h1>
        <Button
          type="primary"
          text="+ Add New Budget"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>

      <DataStateHandler isLoading={isLoading} error={error} data={budgets}>
        <div className="flex gap-300">
          {hasTransactions && (
            <div className="flex-1 h-fit bg-white p-400 rounded-lg mb-400">
              <div className="mb-400">
                <BudgetChart budgets={budgets} isLoading={isLoading} />
              </div>
              <div>
                <h2 className="text-preset-2 font-bold text-grey-900 mb-300">
                  Spending Summary
                </h2>

                <div className="flex-1">
                  {budgets
                    .filter(
                      (budget) =>
                        budget.transactions && budget.transactions.length > 0
                    )
                    .map((budget) => (
                      <BudgetSpendingSummaryItem
                        key={budget.id}
                        budget={budget}
                      />
                    ))}
                </div>
              </div>
            </div>
          )}

          <div className="flex-auto grid grid-cols-1 gap-400">
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </div>
      </DataStateHandler>

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
