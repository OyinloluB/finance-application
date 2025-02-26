import React from "react";
import Button from "../atoms/Button";

const Pagination = () => {
  return (
    <div className="flex justify-between items-center mt-400">
      <Button text="Prev" type="tertiary" iconLeft="CaretLeftIcon" />
      <div className="flex gap-100">
        <Button text="1" type="tertiary" className="w-[40px] h-[40px]" />
        <Button text="2" type="tertiary" className="w-[40px] h-[40px]" />
        <Button text="3" type="tertiary" className="w-[40px] h-[40px]" />
      </div>
      <Button text="Next" type="tertiary" iconRight="CaretRightIcon" />
    </div>
  );
};

export default Pagination;
