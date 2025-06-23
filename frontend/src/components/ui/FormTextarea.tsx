import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";

interface FormTextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  rows?: number;
  className?: string;
  textareaClassName?: string;
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  label,
  name,
  placeholder,
  register,
  textareaClassName,
  error,
  required = false,
  rows = 6,
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
      <textarea
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false,
          minLength: {
            value: 10,
            message: "Message must be at least 10 characters",
          },
        })}
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors duration-200 resize-vertical
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${textareaClassName}
          ${
            error
              ? "border-red-300 bg-red-50 focus:ring-red-500"
              : "border-gray-300 bg-white hover:border-gray-400"
          }
        `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormTextarea;
