import type { InputHTMLAttributes } from "react";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export function Field({ label, name, className = "", ...inputProps }: FieldProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        {...inputProps}
        className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-300"
      />
    </div>
  );
}
