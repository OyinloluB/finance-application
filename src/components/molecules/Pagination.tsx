import React from "react";
import Button from "../atoms/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-between items-center mt-400">
      <Button
        text="Prev"
        type="tertiary"
        iconLeft="CaretLeftIcon"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      <div className="flex gap-100">
        {pages.map((page) => (
          <Button
            key={page}
            text={page.toString()}
            type={currentPage === page ? "primary" : "tertiary"}
            className="w-[40px] h-[40px]"
            onClick={() => onPageChange(page)}
          />
        ))}
      </div>
      <Button
        text="Next"
        type="tertiary"
        iconRight="CaretRightIcon"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
