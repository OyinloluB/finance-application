import React from "react";
import { IconName, Icons } from "./icons";

type ButtonType = "primary" | "secondary" | "tertiary" | "destroy";

interface ButtonProps {
  text: string | React.ReactNode;
  type: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconLeft?: IconName;
  iconRight?: IconName;
  hideOutline?: boolean;
}

const Button = ({
  text = "Placeholder",
  type,
  className,
  iconLeft,
  iconRight,
  onClick,
  hideOutline = false,
  disabled,
}: ButtonProps) => {
  const baseStyles =
    "p-200 text-preset-4 text-center rounded-md transition-all duration-200 cursor-pointer box-border flex items-center justify-center gap-200";

  const buttonStyles = {
    primary: "bg-grey-900 text-white hover:bg-grey-500 font-bold",
    secondary:
      "bg-beige-100 text-grey-900 hover:bg-white border border-transparent hover:border-beige-500",
    tertiary: `text-grey-500 hover:text-grey-900 font-normal ${
      !hideOutline && "border border-beige-500"
    }`,
    destroy:
      "relative bg-secondary-red text-white overflow-hidden " +
      "after:content-[''] after:absolute after:inset-0 after:bg-white after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-20",
  };

  const IconLeftComponent = iconLeft ? Icons[iconLeft] : null;
  const IconRightComponent = iconRight ? Icons[iconRight] : null;

  return (
    <button
      type="submit"
      onClick={onClick}
      className={`${baseStyles} ${buttonStyles[type]} ${className ?? ""}`}
      disabled={disabled}
    >
      {IconLeftComponent && <IconLeftComponent className="text-inherit" />}
      {text}
      {IconRightComponent && <IconRightComponent className="text-inherit" />}
    </button>
  );
};

export default Button;
