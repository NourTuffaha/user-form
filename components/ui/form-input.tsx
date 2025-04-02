"use client";

import type React from "react";

import { useState } from "react";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
  multiline?: boolean;
}

export default function FormInput({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  maxLength,
  multiline = false,
}: FormInputProps) {
  const [charCount, setCharCount] = useState(value?.length || 0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (maxLength && e.target.value.length > maxLength) {
      return;
    }

    setCharCount(e.target.value.length);
    onChange(e);
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          rows={4}
          required={required}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          required={required}
        />
      )}

      {maxLength && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {charCount}/{maxLength}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
