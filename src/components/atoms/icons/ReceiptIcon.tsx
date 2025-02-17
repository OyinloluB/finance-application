import React from "react";
interface ReceiptIconProps {
  className?: string;
}

const ReceiptIcon = ({ className }: ReceiptIconProps) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M13.5 2.5H2.5C2.23478 2.5 1.98043 2.60536 1.79289 2.79289C1.60536 2.98043 1.5 3.23478 1.5 3.5V13C1.50005 13.0852 1.52187 13.169 1.56341 13.2434C1.60494 13.3178 1.66481 13.3804 1.73732 13.4252C1.80983 13.4699 1.89258 13.4954 1.97771 13.4992C2.06285 13.503 2.14754 13.485 2.22375 13.4469L4 12.5588L5.77625 13.4469C5.84572 13.4816 5.92232 13.4997 6 13.4997C6.07768 13.4997 6.15428 13.4816 6.22375 13.4469L8 12.5588L9.77625 13.4469C9.84571 13.4816 9.92232 13.4997 10 13.4997C10.0777 13.4997 10.1543 13.4816 10.2238 13.4469L12 12.5588L13.7762 13.4469C13.8525 13.485 13.9372 13.503 14.0223 13.4992C14.1074 13.4954 14.1902 13.4699 14.2627 13.4252C14.3352 13.3804 14.3951 13.3178 14.4366 13.2434C14.4781 13.169 14.5 13.0852 14.5 13V3.5C14.5 3.23478 14.3946 2.98043 14.2071 2.79289C14.0196 2.60536 13.7652 2.5 13.5 2.5ZM11 9H5C4.86739 9 4.74021 8.94732 4.64645 8.85355C4.55268 8.75979 4.5 8.63261 4.5 8.5C4.5 8.36739 4.55268 8.24021 4.64645 8.14645C4.74021 8.05268 4.86739 8 5 8H11C11.1326 8 11.2598 8.05268 11.3536 8.14645C11.4473 8.24021 11.5 8.36739 11.5 8.5C11.5 8.63261 11.4473 8.75979 11.3536 8.85355C11.2598 8.94732 11.1326 9 11 9ZM11 7H5C4.86739 7 4.74021 6.94732 4.64645 6.85355C4.55268 6.75979 4.5 6.63261 4.5 6.5C4.5 6.36739 4.55268 6.24021 4.64645 6.14645C4.74021 6.05268 4.86739 6 5 6H11C11.1326 6 11.2598 6.05268 11.3536 6.14645C11.4473 6.24021 11.5 6.36739 11.5 6.5C11.5 6.63261 11.4473 6.75979 11.3536 6.85355C11.2598 6.94732 11.1326 7 11 7Z" />
    </svg>
  );
};

export default ReceiptIcon;
