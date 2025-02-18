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
  options: Option[];
  placeholder?: string;
  prefix?: string;
  icon?: IconName;
  helperText?: string;
  error?: string;
  variant?: "default" | "color-selection" | "with-icons";
}

const SelectField = ({
  name,
  label,
  error,
  prefix,
  options,
  placeholder = "Select an option",
  helperText,
  icon = "CaretDownIcon",
  variant = "default",
}: SelectFieldProps) => {
  const { control, setValue } = useFormContext();
  const { field } = useController({ name, control });
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const IconComponent = icon && Icons[icon];

  useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOut);
    } else {
      document.removeEventListener("mousedown", handleClickOut);
    }

    return () => document.removeEventListener("mousedown", handleClickOut);
  }, [open]);

  return (
    <div className="relative flex flex-col gap-50" ref={dropdownRef}>
      {label && (
        <label className="text-preset-5 text-grey-500 font-bold">{label}</label>
      )}
      <div
        className={`flex items-center py-150 px-250 border rounded-lg ${
          error ? "border-secondary-red" : "border-beige-500"
        }`}
        onClick={() => setOpen(!open)}
      >
        {prefix && <span className="pr-150 text-beige-500">{prefix}</span>}

        <span
          className={`flex-1 text-preset-4 cursor-pointer ${
            field.value ? "text-grey-900" : "text-beige-500"
          }`}
        >
          {field.value || placeholder}
        </span>

        {IconComponent && (
          <div>
            <IconComponent />
          </div>
        )}
      </div>

      {open && (
        <ul className="absolute left-0 top-full mt-50 w-full bg-white py-150 px-250 rounded-lg shadow-lg z-10 overflow-hidden max-h-[250px] overflow-y-auto no-scrollbar">
          {options.map(({ label, color, icon, status }, i) => (
            <li
              className={`flex items-center justify-between py-200 px-250 text-preset-4 ${
                status === "used" ? "text-beige-500" : "text-grey-900"
              }  border-b border-grey-100 cursor-pointer`}
              key={i}
              onClick={() => {
                setValue(name, label);
                setOpen(false);
              }}
            >
              {variant === "color-selection" && (
                <div className="flex items-center gap-150">
                  {color && (
                    <span
                      className={`w-4 h-4 rounded-full ${
                        status === "used" ? "opacity-25" : "opacity-1"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <span>{label}</span>
                </div>
              )}
              {variant === "with-icons" && (
                <div className="flex items-center gap-150">
                  {icon && (
                    <span
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  )}
                  <span>{label}</span>
                </div>
              )}

              {variant === "default" && <span>{label}</span>}
              {status && (
                <span
                  className={`${
                    status === "used" ? "text-beige-500" : "text-grey-500"
                  }  text-sm}`}
                >
                  {status === "used" ? "Already Used" : ""}
                </span>
              )}
            </li>
          ))}
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
