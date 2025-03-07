"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import BudgetChart from "@/components/organisms/BudgetChart";
import BudgetSpendingSummaryItem from "@/components/molecules/BudgetSpendingSummaryItem";
import BudgetCard from "@/components/organisms/BudgetCard";
import { Budget } from "@/types/budget";
import BudgetFormModal from "@/components/molecules/BudgetFormModal";

const dummyBudgets = [
  {
    id: "1",
    category: "Entertainment",
    maxLimit: 50,
    currentSpend: 15,
    remaining: 35,
    theme: "GREEN",
    transactions: [
      {
        id: "t1",
        image: "/images/profile-one.png",
        name: "James Thompson",
        amount: -5,
        date: "2024-08-11",
      },
      {
        id: "t2",
        image: "/images/profile-three.png",
        name: "Pixel Playground",
        amount: -10,
        date: "2024-08-11",
      },
      {
        id: "t3",
        image: "/images/profile-two.png",
        name: "Rina Sato",
        amount: -10,
        date: "2024-07-13",
      },
    ],
  },
  {
    id: "2",
    category: "Bills",
    maxLimit: 750,
    currentSpend: 150,
    remaining: 600,
    theme: "CYAN",
    transactions: [
      {
        id: "t4",
        image: "/images/profile-one.png",
        name: "Spark Electric Solutions",
        amount: -100,
        date: "2024-08-02",
      },
      {
        id: "t5",
        image: "/images/profile-three.png",
        name: "Rina Sato",
        amount: -50,
        date: "2024-08-02",
      },
      {
        id: "t6",
        image: "/images/profile-two.png",
        name: "Aqua Flow Utilities",
        amount: -100,
        date: "2024-07-30",
      },
    ],
  },
  {
    id: "3",
    category: "Dining Out",
    maxLimit: 75,
    currentSpend: 133.75,
    remaining: 0,
    theme: "NAVY",
    transactions: [
      {
        id: "t7",
        image: "/images/profile-two.png",
        name: "Savory Bites Bistro",
        amount: -55.5,
        date: "2024-08-19",
      },
      {
        id: "t8",
        image: "/images/profile-one.png",
        name: "Ethan Clark",
        amount: -32.5,
        date: "2024-08-20",
      },
      {
        id: "t9",
        image: "/images/profile-three.png",
        name: "Ella Phillips",
        amount: -45,
        date: "2024-07-10",
      },
    ],
  },
];

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState<Budget[]>(dummyBudgets);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddBudget = (newBudget: Budget) => {
    setBudgets((prev) => [
      ...prev,
      {
        ...newBudget,
        id: (prev.length + 1).toString(),
        currentSpend: 0,
        remaining: newBudget.maxLimit!,
      },
    ]);
    setIsAddModalOpen(false);
  };

  return (
    <div className="flex-1 p-400 min-h-screen">
      <div className="flex justify-between items-center mb-400">
        <h1 className="text-preset-1 font-bold text-grey-900">Budgets</h1>
        <Button
          type="primary"
          text="+ Add New Budget"
          onClick={() => setIsAddModalOpen(true)}
        />
      </div>
      <div className="flex gap-300">
        <div className="flex-1 h-fit bg-white p-400 rounded-lg mb-400">
          <BudgetChart budgets={budgets} />

          <div>
            <h2 className="text-preset-2 font-bold text-grey-900 mb-300">
              Spending Summary
            </h2>

            <div className="flex-1">
              {budgets.map((budget) => (
                <BudgetSpendingSummaryItem key={budget.id} budget={budget} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-auto grid grid-cols-1 gap-400">
          {budgets.map((budget) => (
            <BudgetCard
              key={budget.id}
              budget={budget}
              setBudgets={setBudgets}
            />
          ))}
        </div>
      </div>

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
