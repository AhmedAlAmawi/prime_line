import React from "react";
import { UseFormRegister, FieldError } from "react-hook-form";

export type InputProps = {
  label: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  name: string;
  type: string;
  placeholder: string;
  disabled: boolean;
};

const Input: React.FC<InputProps> = ({
  label,
  register,
  errors,
  name,
  type,
  placeholder,
  disabled,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium leading-6 text-gray-900"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`block w-full ${
          errors ? "ring-red-600 " : "ring-gray-300 "
        } rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 placeholder:text-gray-400  ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6`}
        {...register(name, {
          required: "Please enter a number",
          pattern: {
            value: /^\d+$/, // pattern to accept only numbers
            message: "Only numbers are allowed",
          },
        })}
      />
    </div>
    {errors && <span className="text-sm text-red-600">{errors.message}</span>}
  </div>
);

export default Input;
