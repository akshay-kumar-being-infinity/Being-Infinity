import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = "", ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-medium text-text-muted">
        {label}
      </label>
      <input
        className={`
          w-full px-4 py-2.5 rounded-lg border bg-bg-surface text-text-primary placeholder:text-text-muted/50
          focus:outline-none focus:ring-2 focus:ring-primary-light/50 focus:border-primary-light
          transition-all duration-200 ease-in-out
          ${error ? "border-red-500 focus:ring-red-500/30" : "border-border"}
          ${className}
        `}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};