"use client";

import React, { useEffect, useRef, useState } from "react";
import { IconName, Icons } from "./icons";
import { useController, useFormContext } from "react-hook-form";

type Status = "used" | "unused";

interface Option {
  label: string;
  value: string;
  color?: string;
  icon?: IconName;
  status?: Status;
}

interface SelectFieldProps {
  name: string;
  label?: string;
  labelIcon?: IconName;
  options: Option[];
  placeholder?: string;
  prefix?: string;
  icon?: IconName;
  helperText?: string;
  error?: string;
  variant?: "default" | "color-selection" | "with-icons" | "icon-only";
  layout?: "row" | "column";
  disabled?: boolean;
}

const SelectField = ({
  name,
  label,
  labelIcon,
  error,
  prefix,
  options,
  placeholder = "Select an option",
  helperText,
  icon = "CaretDownIcon",
  variant = "default",
  layout = "column",
  disabled = false,
}: SelectFieldProps) => {
  const { control, setValue, clearErrors } = useFormContext();
  const { field } = useController({ name, control });
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const IconComponent = icon && Icons[icon];
  const selectedOption = options.find((opt) => opt.value === field.value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setValue(name, value);
    clearErrors(name);
    setOpen(false);
  };

  const renderSelected = () => {
    if (variant === "icon-only") return null;

    if (variant === "color-selection" && selectedOption) {
      return (
        <span className="flex items-center gap-150 text-preset-4 text-grey-900">
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: selectedOption.color }}
          />
          {selectedOption.label}
        </span>
      );
    }

    return (
      <span className="text-preset-4 text-grey-900">
        {selectedOption?.label || placeholder}
      </span>
    );
  };

  const renderLabel = () => {
    if (variant === "icon-only") return null;

    return (
      <div className="font-bold text-grey-500">
        {label && (
          <span className="hidden lg:block text-preset-5">{label}</span>
        )}
        {labelIcon && (
          <span className="block lg:hidden">
            {Icons[labelIcon] && React.createElement(Icons[labelIcon])}
          </span>
        )}
      </div>
    );
  };
  const renderOption = (option: Option) => {
    const isDisabled = option.status === "used";
    const baseClasses = `flex items-center justify-between py-200 px-200 text-preset-4 border-b border-grey-100 cursor-pointer ${
      isDisabled ? "text-beige-500" : "text-grey-900"
    }`;

    return (
      <li
        key={option.value}
        className={baseClasses}
        onClick={() => !isDisabled && handleSelect(option.value)}
      >
        <div className="flex items-center gap-150">
          {(variant === "color-selection" || variant === "with-icons") &&
            option.color && (
              <span
                className={`w-4 h-4 rounded-full ${
                  isDisabled ? "opacity-25" : "opacity-100"
                }`}
                style={{ backgroundColor: option.color }}
              />
            )}
          <span>{option.label}</span>
        </div>

        {option.status && isDisabled && (
          <span className="text-grey-500 text-sm">Already Used</span>
        )}
      </li>
    );
  };

  return (
    <div
      className={`relative flex ${
        layout === "row" ? "flex-row items-center gap-200" : "flex-col gap-50"
      } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      ref={dropdownRef}
    >
      {renderLabel()}

      <div
        className={`flex items-center cursor-pointer ${
          variant === "icon-only"
            ? "p-0 border-none w-auto"
            : "py-150 px-250 gap-200 border rounded-lg " +
              (error ? "border-secondary-red" : "border-beige-500")
        }`}
        onClick={() => !disabled && setOpen(!open)}
      >
        {prefix && <span className="pr-150 text-beige-500">{prefix}</span>}
        {renderSelected()}
        {IconComponent && <IconComponent />}
      </div>

      {open && (
        <ul
          className={`absolute top-full mt-50 bg-white py-150 px-250 rounded-lg shadow-lg z-10 overflow-hidden max-h-[250px] overflow-y-auto no-scrollbar ${
            variant === "icon-only" ? "right-0 w-[180px]" : "left-0 w-full"
          }`}
        >
          {options.map(renderOption)}
        </ul>
      )}

      {helperText && !error && (
        <p className="text-preset-5 text-right text-grey-500">{helperText}</p>
      )}
      {error && (
        <p className="text-preset-5 text-right text-secondary-red">{error}</p>
      )}
    </div>
  );
};

export default SelectField;
