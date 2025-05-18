import { component$, Slot, type QwikMouseEvent, type PropFunction } from "@builder.io/qwik";

interface ButtonProps {
  onClick$?: PropFunction<(event: QwikMouseEvent<HTMLButtonElement>) => void>;
  disabled?: boolean;
  class?: string;
}

export const Button = component$(({ onClick$, disabled, class: className }: ButtonProps) => {
  return (
    <button
      class={`px-4 py-2 rounded disabled:bg-gray-400 ${className ?? ''}`}
      onClick$={onClick$}
      disabled={disabled}
    >
      <Slot />
    </button>
  );
});
