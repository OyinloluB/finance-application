"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import BudgetCard from "@/components/molecules/BudgetCard";
import BudgetChart from "@/components/molecules/BudgetChart";

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

export const themeColors: Record<string, string> = {
  GREEN: "bg-green-500",
  YELLOW: "bg-yellow-500",
  CYAN: "bg-cyan-500",
  NAVY: "bg-blue-900",
  RED: "bg-red-500",
  PURPLE: "bg-purple-500",
  TURQUOISE: "bg-teal-500",
  BROWN: "bg-amber-700",
  MAGENTA: "bg-pink-500",
  BLUE: "bg-blue-500",
  GREY: "bg-gray-500",
  ARMY: "bg-green-700",
  PINK: "bg-pink-400",
};

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState(dummyBudgets);

  return (
    <div className="flex-1 p-400 min-h-screen">
      <div className="flex justify-between items-center mb-400">
        <h1 className="text-preset-1 font-bold text-grey-900">Budgets</h1>
        <Button
          type="primary"
          text="+ Add New Budget"
          onClick={() => console.log("Open Add Budget Modal")}
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
                <div
                  key={budget.id}
                  className="flex justify-between text-grey-500 text-preset-4 py-200 first:pt-0 border-b last:border-b-0 border-grey-100"
                >
                  <div className="flex items-center gap-200">
                    <span
                      className={`w-50 h-full rounded-md ${
                        themeColors[budget.theme]
                      }`}
                    />
                    <span>{budget.category}</span>
                  </div>
                  <span>
                    <span className="text-grey-900 text-preset-3 font-bold">
                      ${budget.currentSpend.toFixed(2)}
                    </span>{" "}
                    of ${budget.maxLimit.toFixed(2)}
                  </span>
                </div>
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
    </div>
  );
};

export default BudgetsPage;
