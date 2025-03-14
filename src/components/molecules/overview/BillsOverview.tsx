import Button from "@/components/atoms/Button";
import React from "react";

const BillsOverview = () => {
  return (
    <div className="p-400 bg-white rounded-lg w-full h-fit">
      <div className="flex items-center justify-between mb-250">
        <h3 className="text-preset-2 text-grey-900 font-bold">
          Recurring Bills
        </h3>
        <Button
          text="See details"
          type="tertiary"
          iconRight="CaretRightIcon"
          hideOutline
          className="text-grey-500 pr-0"
        />
      </div>
      <div className="flex flex-col gap-150">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between text-preset-4 bg-beige-100 py-250 px-200 rounded-lg border-l-4 border-secondary-green w-full"
          >
            <span className="font-bold text-grey-900">Paid Bills</span>
            <span className="text-grey-500">$190.00</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsOverview;
