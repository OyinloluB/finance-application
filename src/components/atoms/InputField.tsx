import React from "react";
import { useFormContext } from "react-hook-form";
import { IconName, Icons } from "./icons";

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  prefix?: string;
  icon?: IconName;
  helperText?: string;
  error?: string;
  type?: "number" | "text" | "date";
  disabled?: boolean;
}

const InputField = ({
  name,
  label,
  placeholder,
  prefix,
  icon,
  helperText,
  type = "text",
  disabled,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const IconComponent = icon && Icons[icon];

  return (
    <div className="flex flex-col gap-50 w-full">
      {label && (
        <label className="text-preset-5 text-grey-500 font-bold">{label}</label>
      )}
      <div
        className={`flex items-center border rounded-lg sm:px-250 px-200 ${
          errors[name] ? "border-secondary-red" : "border-beige-500"
        }`}
      >
        {prefix && <span className="pr-150 text-beige-500">{prefix}</span>}

        <input
          {...register(name)}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          className="w-full bg-transparent py-150 pr-150 focus:outline-none placeholder:text-preset-4 text-grey-900"
        />

        {IconComponent && (
          <div className="shrink-0 flex items-center justify-center">
            <IconComponent />
          </div>
        )}
      </div>

      {helperText && !errors[name] && (
        <p className="text-preset-5 text-right text-grey-500">{helperText}</p>
      )}

      {errors[name] && (
        <p className="text-preset-5 text-right text-secondary-red">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InputField;
