import React, { useState } from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import { HiEye, HiEyeOff } from "react-icons/hi";

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
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`w-full ${className}`}>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name, {
            required: required ? `${label} is required` : false,
            ...(type === "email" && {
              pattern: {
                value: /^\S+@\S+$/,
                message: "Please enter a valid email address",
              },
            }),
            ...(type === "password" && {
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
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
            ...(name === "address" && {
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters",
              },
            }),
            ...(name === "registrationNumber" && {
              minLength: {
                value: 3,
                message: "Registration number must be at least 3 characters",
              },
            }),
          })}
          className={`
            w-full px-4 py-3 rounded-lg border transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${isPasswordField ? "pr-12" : ""}
            ${
              error
                ? "border-red-300 bg-red-50 focus:ring-red-500"
                : "border-gray-300 bg-white hover:border-gray-400"
            }
          `}
        />
        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <HiEyeOff className="w-5 h-5" />
            ) : (
              <HiEye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default FormInput;
