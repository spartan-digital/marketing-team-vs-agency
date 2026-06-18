import React from "react";
import { formatCurrency } from "@/lib/team-builder-logic";

interface BudgetBarProps {
  teamCost: number;
  peopleBudget: number;
}

export function BudgetBar({ teamCost, peopleBudget }: BudgetBarProps) {
  const pct = peopleBudget > 0 ? (teamCost / peopleBudget) * 100 : 0;
  const clampedPct = Math.min(Math.max(pct, 0), 100);
  
  let statusColor = "var(--color-good)";
  let statusText = "Under budget";
  
  if (pct > 100) {
    statusColor = "var(--color-bad)";
    statusText = "Over budget";
  } else if (pct >= 90) {
    statusColor = "var(--color-warn)";
    statusText = "Near budget limit";
  }

  const diff = peopleBudget - teamCost;

  return (
    <>
      <div className="text-xs text-muted-foreground">Team cost / People budget</div>
      <div className="text-[20px] font-semibold mt-0.5" id="teamCost">
        {formatCurrency(teamCost)} <small className="text-xs text-muted-foreground font-normal ml-1">{pct.toFixed(1)}%</small>
      </div>
      <div className="h-[14px] rounded-lg bg-secondary overflow-hidden mt-2 border border-border relative">
        <i
          className="block h-full transition-all duration-250 ease-in-out"
          style={{ width: `${clampedPct}%`, backgroundColor: statusColor }}
        ></i>
      </div>
      <div className="flex justify-between text-[13px] mt-2">
        <span 
          className="inline-block px-2 py-[2px] rounded-[20px] text-[11px] font-semibold"
          style={{ color: statusColor, backgroundColor: `${statusColor}1A` }}
        >
          {statusText}
        </span>
        <span className={diff < 0 ? "text-[var(--color-bad)]" : "text-muted-foreground"}>
          {diff >= 0 ? `${formatCurrency(diff)} remaining` : `${formatCurrency(Math.abs(diff))} over`}
        </span>
      </div>
    </>
  );
}
