import React from "react";
import { cn } from "@/lib/utils";

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  testIdPrefix?: string;
}

export function SegmentedControl({ options, value, onChange, id, className, testIdPrefix }: SegmentedControlProps) {
  return (
    <div id={id} className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          data-testid={`${testIdPrefix}-${opt.value}`}
          className={cn(
            "flex-1 min-w-0 py-2 px-1.5 rounded-lg border text-xs transition-colors duration-150 cursor-pointer",
            value === opt.value
              ? "bg-accent border-accent text-white"
              : "bg-secondary border-border text-muted-foreground hover:text-foreground"
          )}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
