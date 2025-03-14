import Button from "@/components/atoms/Button";
import Image from "next/image";
import React from "react";

const TransactionsOverview = () => {
  return (
    <div className="p-400 bg-white rounded-lg w-full h-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-preset-2 text-grey-900 font-bold">Transactions</h3>
        <Button
          text="View All"
          type="tertiary"
          iconRight="CaretRightIcon"
          hideOutline
          className="text-grey-500 pr-0"
        />
      </div>
      {[...Array(6)].map((_, index) => (
        <div
          className="flex justify-between text-sm text-grey-700 py-250 last:pb-0 first:pt-0 border-b last:border-b-0 border-grey-500/15"
          key={index}
        >
          <div className="flex items-center gap-200">
            <Image
              src="/images/profile-three.png"
              alt=""
              width={40}
              height={40}
              className="w-500 h-500 rounded-full"
            />
            <span className="font-bold text-grey-900">John Doe</span>
          </div>
          <div className="flex flex-col items-end gap-50 text-preset-5">
            <span className="font-bold text-grey-900">$50.00</span>
            <span className="text-grey-500">August 18, 2011</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionsOverview;
