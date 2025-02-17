import React from "react";

interface MinLogoProps {
  className?: string;
}

const MinLogo = ({ className }: MinLogoProps) => {
  return (
    <svg
      width="14"
      height="22"
      viewBox="0 0 14 22"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M8.95201 21.44H2.93601V10.24H0.76001V5.312H3.06401C3.70401 2.272 6.68001 0 11.96 0H13.24V4.288H11C9.33601 4.288 8.53601 4.448 8.56801 5.312H13.24V10.24H8.95201V21.44Z"
        fill="white"
      />
    </svg>
  );
};

export default MinLogo;
