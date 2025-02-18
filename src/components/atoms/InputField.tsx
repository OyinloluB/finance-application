"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { IconName, Icons } from "./icons";

interface InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  prefix?: string;
  icon?: IconName;
  helperText?: string;
  error?: string;
}

const InputField = ({
  name,
  label,
  placeholder,
  prefix,
  icon,
  helperText,
  error,
}: InputProps) => {
  const { register } = useForm();
  const IconComponent = icon && Icons[icon];

  return (
    <div className="flex flex-col gap-50">
      {label && (
        <label className="text-preset-5 text-grey-500 font-bold">{label}</label>
      )}
      <div
        className={`flex items-center py-150 px-250 border rounded-lg ${
          error ? "border-secondary-red" : "border-beige-500"
        }`}
      >
        {prefix && <span className="pr-150 text-beige-500">{prefix}</span>}
        <input
          {...register(name)}
          placeholder={placeholder}
          className="flex-1 bg-transparent focus:outline-none"
        />
        {IconComponent && (
          <div>
            <IconComponent />
          </div>
        )}
      </div>
      {helperText && !error && (
        <p className="text-preset-5 text-right text-grey-500">{helperText}</p>
      )}

      {error && (
        <p className="text-preset-5 text-right text-secondary-red">{error}</p>
      )}
    </div>
  );
};

export default InputField;
