import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  register,
  error,
  required = false,
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
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, {
          required: required ? `${label} is required` : false,
          ...(type === "email" && {
            pattern: {
              value: /^\S+@\S+$/,
              message: "Please enter a valid email address",
            },
          }),
          ...(name === "phone" && {
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
          }),
          ...(name === "name" && {
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          }),
        })}
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
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

export default FormInput;
