import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="animate-spin rounded-full border-t-4 border-grey-900 border-opacity-50 w-8 h-8"></div>
    </div>
  );
};

export default Spinner;
