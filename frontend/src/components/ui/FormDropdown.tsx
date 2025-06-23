import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";

interface DropdownOption {
  value: string;
  label: string;
}

interface FormDropdownProps {
  label: string;
  name: string;
  options: DropdownOption[];
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const FormDropdown: React.FC<FormDropdownProps> = ({
  label,
  name,
  options,
  register,
  error,
  required = false,
  placeholder = "Select an option",
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        {...register(name, {
          required: required ? `${label} is required` : false,
        })}
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          bg-white appearance-none cursor-pointer
          ${
            error
              ? "border-red-300 bg-red-50 focus:ring-red-500"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
          backgroundPosition: "right 0.75rem center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "1.5em 1.5em",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormDropdown;
