import { component$ } from "@builder.io/qwik";

interface ButtonProps {
  label: string;
  onClick$?: () => void;      // pakai onClick$ untuk Qwik
  disabled?: boolean;
  className?: string;         // ganti 'class' jadi 'className'
}

export const Button = component$(({ label, onClick$, disabled, className }: ButtonProps) => {
  return (
    <button
      class={`px-4 py-2 rounded  disabled:bg-gray-400 ${className ??''}`}
      onClick$={onClick$}
      disabled={disabled}
    >
      {label}
    </button>
  );
});
