import React from "react";

interface ListItemProps {
  name: string;
  category: string;
  date: string;
  amount: number;
}

const ListItem = ({ name, category, date, amount }: ListItemProps) => {
  return (
    <div className="grid grid-cols-5 gap-300 p-200 border-b border-grey-300">
      <p className="text-grey-900 font-bold">{name}</p>
      <p className="text-grey-600">{category}</p>
      <p className="text-grey-600">{date}</p>
      <p
        className={`text-right font-bold ${
          amount >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        {amount >= 0
          ? `+$${amount.toFixed(2)}`
          : `-$${Math.abs(amount).toFixed(2)}`}
      </p>
    </div>
  );
};

export default ListItem;
