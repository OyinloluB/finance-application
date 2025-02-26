"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/molecules/ProtectedRoute";
import Table from "@/components/organisms/Table";
import Pagination from "@/components/molecules/Pagination";
import InputField from "@/components/atoms/InputField";
import SelectField from "@/components/atoms/SelectField";
import { FormProvider, useForm } from "react-hook-form";

console.log("Layout is being used!");

const Transactions = () => {
  const methods = useForm();
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      name: "Emma Richardson",
      image: "/images/profile-one.png",
      category: "General",
      date: "19 Aug 2024",
      amount: 75.5,
    },
    {
      id: "2",
      name: "Savory Bites Bistro",
      image: "/images/profile-two.png",
      category: "Dining Out",
      date: "19 Aug 2024",
      amount: -55.5,
    },
    {
      id: "3",
      name: "Daniel Carter",
      image: "/images/profile-three.png",
      category: "General",
      date: "18 Aug 2024",
      amount: -42.3,
    },
    {
      id: "1",
      name: "Emma Richardson",
      image: "/images/profile-one.png",
      category: "General",
      date: "19 Aug 2024",
      amount: 75.5,
    },
    {
      id: "2",
      name: "Savory Bites Bistro",
      image: "/images/profile-two.png",
      category: "Dining Out",
      date: "19 Aug 2024",
      amount: -55.5,
    },
    {
      id: "3",
      name: "Daniel Carter",
      image: "/images/profile-three.png",
      category: "General",
      date: "18 Aug 2024",
      amount: -42.3,
    },
    {
      id: "1",
      name: "Emma Richardson",
      image: "/images/profile-one.png",
      category: "General",
      date: "19 Aug 2024",
      amount: 75.5,
    },
    {
      id: "2",
      name: "Savory Bites Bistro",
      image: "/images/profile-two.png",
      category: "Dining Out",
      date: "19 Aug 2024",
      amount: -55.5,
    },
    {
      id: "3",
      name: "Daniel Carter",
      image: "/images/profile-three.png",
      category: "General",
      date: "18 Aug 2024",
      amount: -42.3,
    },
  ]);

  const [loading, setLoading] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex-1 p-400 h-screen">
        <h1 className="text-preset-1 font-bold text-grey-900 mb-400">
          Transactions
        </h1>

        <div className="p-400 bg-white rounded-md">
          <FormProvider {...methods}>
            <div className="flex items-end justify-between gap-300 mb-400 ">
              <div className="max-w-[320px]">
                <InputField
                  name="search_transactions"
                  placeholder="Search transaction"
                  icon="MagnifyingGlassIcon"
                />
              </div>
              <div className="flex flex-1 gap-300 items-center justify-end">
                <SelectField
                  name="sort_by"
                  label="Sort by"
                  placeholder="Latest"
                  layout="row"
                  options={[
                    { label: "Latest", value: "latest" },
                    { label: "Oldest", value: "oldest" },
                    { label: "A to Z", value: "a_to_z" },
                    { label: "Z to A", value: "z_to_a" },
                    { label: "Highest", value: "highest" },
                    { label: "Lowest", value: "lowest" },
                  ]}
                />
                <SelectField
                  name="category"
                  label="Category"
                  placeholder="All Transactions"
                  layout="row"
                  options={[
                    { label: "Entertainment", value: "entertainment" },
                    { label: "Bills", value: "bills" },
                    { label: "Groceries", value: "groceries" },
                    { label: "Dining Out", value: "dining_out" },
                    { label: "Transportation", value: "transportation" },
                    { label: "Personal Care", value: "personal_care" },
                    { label: "Education", value: "education" },
                  ]}
                />
              </div>
            </div>
          </FormProvider>

          {loading ? (
            <p>Loading transactions...</p>
          ) : (
            <>
              <Table data={transactions} />
              <Pagination />
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Transactions;
