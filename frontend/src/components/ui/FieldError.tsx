/** Inline validation message under a form field. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-xs text-rose-600">
      {message}
    </p>
  );
}
