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
  if (totalPages <= 1) return null;

  const createButton = (page: number, isActive = false) => (
    <Button
      key={page}
      text={page.toString()}
      type={isActive ? "primary" : "tertiary"}
      className="w-[40px] h-[40px]"
      onClick={() => onPageChange(page)}
    />
  );

  const createEllipsis = (key: string) => (
    <span
      key={key}
      className="text-grey-500 px-100 select-none cursor-default"
      aria-hidden="true"
    >
      ...
    </span>
  );

  const renderPageButtons = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) =>
        createButton(i + 1, currentPage === i + 1)
      );
    }

    const buttons = [];
    const firstPage = 1;
    const lastPage = totalPages;

    buttons.push(createButton(firstPage, currentPage === firstPage));

    if (currentPage <= 2) {
      for (let i = 2; i <= 2; i++) {
        buttons.push(createButton(i, currentPage === i));
      }
      buttons.push(createEllipsis("right-ellipsis"));
    } else if (currentPage >= totalPages - 2) {
      buttons.push(createEllipsis("left-ellipsis"));
      for (let i = totalPages - 2; i < lastPage; i++) {
        buttons.push(createButton(i, currentPage === i));
      }
    } else {
      buttons.push(createEllipsis("left-ellipsis"));
      buttons.push(createButton(currentPage, true));
      buttons.push(createEllipsis("right-ellipsis"));
    }

    buttons.push(createButton(lastPage, currentPage === lastPage));

    return buttons;
  };

  return (
    <div className="flex justify-between items-center mt-400">
      <Button
        text={<span className="hidden sm:inline">Prev</span>}
        type="tertiary"
        iconLeft="CaretLeftIcon"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-[40px] sm:w-fit h-[40px] sm:h-fit"
      />

      <div className="flex gap-100">{renderPageButtons()}</div>

      <Button
        text={<span className="hidden sm:inline">Next</span>}
        type="tertiary"
        iconRight="CaretRightIcon"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-[40px] sm:w-fit h-[40px] sm:h-fit !p-0 sm:!p-200"
      />
    </div>
  );
};

export default Pagination;
