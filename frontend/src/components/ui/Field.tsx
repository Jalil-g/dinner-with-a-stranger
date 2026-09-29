import type { InputHTMLAttributes } from "react";
import { FieldError } from "./FieldError";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error?: string;
};

export function Field({ label, name, error, className = "", ...inputProps }: FieldProps) {
  const errorId = `${name}-error`;
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
        className={`mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300 ${error ? "border-rose-400" : ""}`}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
