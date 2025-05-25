// src/components/common/LoadingSpinner.tsx
import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string; // Allow passing additional classes
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  message,
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-[3px]",
    md: "h-10 w-10 border-4",
    lg: "h-14 w-14 border-[5px]",
  };

  return (
    <div
      className={`flex flex-col justify-center items-center py-10 ${className}`}
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className={`animate-spin rounded-full border-slate-300 dark:border-slate-600 border-t-brand-500 border-b-brand-500 ${sizeClasses[size]}`}
        role="status"
      >
        <span className="sr-only">{message || "Loading..."}</span>
      </div>
      {message && (
        <p className="mt-3 text-slate-600 dark:text-gray-400">{message}</p>
      )}
    </div>
  );
};
export default LoadingSpinner;
