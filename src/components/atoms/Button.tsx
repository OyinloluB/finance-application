import React from "react";
import CaretRightIcon from "./icons/CaretRightIcon";

type ButtonType = "primary" | "secondary" | "tertiary" | "destroy";

interface ButtonProps {
  text: string;
  type: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Button = ({ text = "Placeholder", type, className }: ButtonProps) => {
  const baseStyles =
    "p-200 text-preset-4 font-bold rounded-md transition-all duration-200 cursor-pointer box-border";

  const buttonStyles = {
    primary: "bg-grey-900 text-white hover:bg-grey-500",
    secondary:
      "bg-beige-100 text-grey-900 hover:bg-white border border-transparent hover:border-beige-500",
    tertiary: "text-grey-500 flex items-center gap-100 hover:text-grey-900",
    destroy:
      "relative bg-secondary-red text-white overflow-hidden " +
      "after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-20",
  };

  return (
    <div className={`${baseStyles} ${buttonStyles[type]} ${className ?? ""}`}>
      {text}
      {type === "tertiary" && (
        <CaretRightIcon className="w-4 h-4 transition-colors duration-200 text-inherit" />
      )}
    </div>
  );
};

export default Button;
