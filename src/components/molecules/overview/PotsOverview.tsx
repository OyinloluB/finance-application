import Button from "@/components/atoms/Button";
import MoneyBagIcon from "@/components/atoms/icons/MoneyBagIcon";
import Spinner from "@/components/atoms/Spinner";
import useOverviewData from "@/hooks/useOverview";
import { formatCurrency } from "@/utils/formatCurrency";
import { themeColors } from "@/utils/themeColors";
import React from "react";

const PotsOverview = () => {
  const { data, isLoading } = useOverviewData();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return <p>No data...</p>;
  }

  const pots = data.pots ?? [];
  const totalSaved = pots.reduce((sum, pot) => sum + pot.currentAmount, 0);

  return (
    <div className="p-400 bg-white rounded-lg w-full h-fit">
      <div className="flex items-center justify-between mb-250">
        <h3 className="text-preset-2 text-grey-900 font-bold">Pots</h3>
        <Button
          text="See details"
          type="tertiary"
          iconRight="CaretRightIcon"
          hideOutline
          className="text-grey-500 pr-0"
        />
      </div>
      <div className="flex gap-250">
        <div className="flex items-center gap-200 min-w-[250px] bg-beige-100 rounded-md p-200">
          <MoneyBagIcon />
          <div className="flex flex-col">
            <span className="text-preset-4 text-grey-500 pb-[11px]">
              Total Saved
            </span>
            <span className="text-preset-2 font-bold text-grey-900">
              {formatCurrency(totalSaved)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-200 w-full">
          {pots.slice(0, 4).map((pot) => (
            <div className="flex gap-200 min-w-[130px]" key={pot.id}>
              <div
                className="w-50 h-[50px] rounded-md"
                style={{ backgroundColor: `${themeColors[pot.theme]}` }}
              />
              <div className="flex flex-col gap-50">
                <span className="text-preset-4 text-grey-500">{pot.name}</span>
                <span className="text-preset-4 text-grey-900 font-bold">
                  {formatCurrency(pot.currentAmount)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PotsOverview;
