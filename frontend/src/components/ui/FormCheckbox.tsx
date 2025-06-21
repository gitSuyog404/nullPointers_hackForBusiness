import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";

interface FormCheckboxProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  description?: string;
  className?: string;
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  label,
  name,
  register,
  error,
  description,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-start gap-3">
        <input
          id={name}
          type="checkbox"
          {...register(name)}
          className={`
            mt-1 w-5 h-5 rounded border-2 transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${
              error
                ? "border-red-300 text-red-600 focus:ring-red-500"
                : "border-gray-300 text-blue-600 hover:border-gray-400"
            }
          `}
        />
        <div className="flex-1">
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 cursor-pointer"
          >
            {label}
          </label>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
          {error && (
            <p className="mt-1 text-sm text-red-600">{error.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormCheckbox;
