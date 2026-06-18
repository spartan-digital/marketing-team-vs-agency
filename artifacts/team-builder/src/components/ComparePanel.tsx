import React from "react";
import { formatCurrency, activeRoles, agencyEstimate, teamCost, teamHours, agencyHours, State } from "@/lib/team-builder-logic";

export function ComparePanel({ state }: { state: State }) {
  const active = activeRoles(state);
  
  if (active.length === 0) {
    return (
      <div className="mb-6 border border-border rounded-[14px] overflow-hidden bg-card p-4 text-sm text-muted-foreground text-center">
        Select roles below to compare building a team vs. hiring an agency.
      </div>
    );
  }

  const costBuild = teamCost(state);
  const costBuy = agencyEstimate(state);
  const diff = Math.abs(costBuild - costBuy);
  const hBuild = teamHours(state);
  const hBuy = agencyHours(state);

  return (
    <div className="mb-6 border border-border rounded-[14px] overflow-hidden bg-card">
      <div className="p-3 px-4 border-b border-border flex justify-between items-center">
        <b className="text-[14px]">Build vs. Buy Comparison</b>
        <span className="text-[12px] text-muted-foreground">Based on selected roles</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr]">
        <div className="p-4" style={{ background: 'linear-gradient(180deg, rgba(91,140,255,.08), transparent)' }}>
          <h3 className="m-0 mb-[2px] text-[13px] font-bold">Build an Internal Team</h3>
          <div className="text-[11px] text-muted-foreground mb-2.5">
            {active.length} roles selected
          </div>
          <div className="text-[26px] font-bold">
            {formatCurrency(costBuild)} <small className="text-[12px] text-muted-foreground font-normal">/yr</small>
          </div>
          <div className="flex justify-between text-[12px] py-1.5 border-t border-border mt-3">
            <span>Capacity</span>
            <span className="font-semibold">~{hBuild} hrs/mo</span>
          </div>
          <div className="flex justify-between text-[12px] py-[5px] border-t border-border">
            <span>Management overhead</span>
            <span className="font-semibold">High</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center text-[12px] text-muted-foreground font-semibold p-1.5 md:p-0">
          VS
        </div>
        
        <div className="p-4" style={{ background: 'linear-gradient(180deg, rgba(255,143,91,.08), transparent)' }}>
          <h3 className="m-0 mb-[2px] text-[13px] font-bold">Hire a Full-Service Agency</h3>
          <div className="text-[11px] text-muted-foreground mb-2.5">
            Equivalent coverage
          </div>
          <div className="text-[26px] font-bold">
            {formatCurrency(costBuy)} <small className="text-[12px] text-muted-foreground font-normal">/yr</small>
          </div>
          <div className="flex justify-between text-[12px] py-1.5 border-t border-border mt-3">
            <span>Capacity</span>
            <span className="font-semibold">~{hBuy} hrs/mo</span>
          </div>
          <div className="flex justify-between text-[12px] py-[5px] border-t border-border">
            <span>Management overhead</span>
            <span className="font-semibold">Low</span>
          </div>
        </div>
      </div>
      
      <div className="p-3 px-4 border-t border-border text-[13px] bg-secondary">
        Verdict: <b className="text-foreground">{costBuild > costBuy ? `Agency is ${formatCurrency(diff)}/yr cheaper` : `Internal team is ${formatCurrency(diff)}/yr cheaper`}</b>
      </div>
      
      <div className="grid grid-cols-2 border-t border-border">
        <div className="py-[9px] px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.5px] bg-secondary border-t-0">Internal Team Tradeoffs</div>
        <div className="py-[9px] px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.5px] bg-secondary border-t-0 border-l border-border">Agency Tradeoffs</div>
        <div className="py-[9px] px-4 text-[12px] border-t border-border">✓ Deep institutional knowledge<br/>✓ Dedicated focus on your brand<br/>✗ Slower to hire and replace<br/>✗ Management burden on leadership</div>
        <div className="py-[9px] px-4 text-[12px] border-t border-border border-l">✓ Immediate access to specialists<br/>✓ Scalable up/down quickly<br/>✗ Fractional attention<br/>✗ Higher hourly rate equivalent</div>
      </div>
    </div>
  );
}
