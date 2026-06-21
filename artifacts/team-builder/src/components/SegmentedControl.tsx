import React from "react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  testIdPrefix?: string;
  groupLabel?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  id,
  className,
  testIdPrefix,
  groupLabel,
}: SegmentedControlProps) {
  return (
    <div
      id={id}
      role="group"
      aria-label={groupLabel}
      className={cn("flex flex-wrap gap-1.5", className)}
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            data-testid={`${testIdPrefix}-${opt.value}`}
            aria-pressed={selected}
            className={cn(
              "flex-1 min-w-0 py-2 px-1.5 rounded-lg border text-xs transition-colors duration-150 cursor-pointer",
              selected
                ? "bg-accent border-accent text-accent-foreground font-medium"
                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
            )}
            onClick={() => onChange(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
