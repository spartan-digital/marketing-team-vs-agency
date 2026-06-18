import React from "react";
import { formatCurrency, activeRoles, agencyEstimate, teamCost, teamHours, agencyHours, State } from "@/lib/team-builder-logic";

export function ComparePanel({ state }: { state: State }) {
  const active = activeRoles(state);

  if (active.length === 0) {
    return (
      <div className="mb-6 border border-border rounded-[14px] overflow-hidden bg-card p-4 text-sm text-muted-foreground text-center">
        Select roles below to compare building a team vs. outsourcing to an agency.
      </div>
    );
  }

  const costBuild = teamCost(state);
  const costBuy = agencyEstimate(state);
  const diff = Math.abs(costBuild - costBuy);
  const hBuild = teamHours(state);
  const hBuy = agencyHours(state);
  const fteCount = active.filter(r => state.picks[r.id] === 'fte').length;
  const cheaper = costBuy < costBuild ? 'agency' : 'team';

  const verdict = cheaper === 'agency'
    ? `A full-service agency is about ${formatCurrency(diff)}/yr cheaper and covers all ${active.length} functions immediately — but spreads ~${hBuy} hrs/mo of shared senior time across your account, with less control and no institutional knowledge that stays in-house.`
    : `Your team costs about ${formatCurrency(diff)}/yr more than outsourcing, but buys ~${hBuild} hrs/mo of dedicated focus, direct control, and knowledge that compounds inside the company${fteCount ? ` — including ${fteCount} full-time hire${fteCount > 1 ? 's' : ''} who live your brand` : ''}.`;

  return (
    <div className="mb-6 border border-border rounded-[14px] overflow-hidden bg-card">
      <div className="p-3 px-4 border-b border-border flex justify-between items-center">
        <b className="text-[14px]">Build vs. Outsource</b>
        <span className="text-[12px] text-muted-foreground">Same {active.length} function{active.length !== 1 ? 's' : ''}, two ways to deliver them</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr]">
        <div className="p-4" style={{ background: 'linear-gradient(180deg, rgba(91,140,255,.08), transparent)' }}>
          <h3 className="m-0 mb-[2px] text-[13px]">Build the Team</h3>
          <div className="text-[11px] text-muted-foreground mb-2.5">Employees · fractional you manage</div>
          <div className="text-[26px] font-bold">
            {formatCurrency(costBuild)} <small className="text-[12px] text-muted-foreground font-normal">/yr · {formatCurrency(costBuild / 12)}/mo</small>
          </div>
          <div className="flex justify-between text-[12px] py-[5px] border-t border-border mt-3">
            <span>Dedicated hours / mo</span><span className="font-semibold">~{hBuild}</span>
          </div>
          <div className="flex justify-between text-[12px] py-[5px] border-t border-border">
            <span>Ramp to productive</span><span className="font-semibold">1–3 months</span>
          </div>
          <div className="flex justify-between text-[12px] py-[5px] border-t border-border">
            <span>You manage</span><span className="font-semibold">{active.length} people/vendors</span>
          </div>
        </div>

        <div className="flex items-center justify-center text-[12px] text-muted-foreground font-semibold p-1.5 md:p-0">vs</div>

        <div className="p-4" style={{ background: 'linear-gradient(180deg, rgba(255,143,91,.08), transparent)' }}>
          <h3 className="m-0 mb-[2px] text-[13px]">Outsource to an Agency</h3>
          <div className="text-[11px] text-muted-foreground mb-2.5">Full-service retainer, shared senior team</div>
          <div className="text-[26px] font-bold">
            {formatCurrency(costBuy)} <small className="text-[12px] text-muted-foreground font-normal">/yr · {formatCurrency(costBuy / 12)}/mo</small>
          </div>
          <div className="flex justify-between text-[12px] py-[5px] border-t border-border mt-3">
            <span>Dedicated hours / mo</span><span className="font-semibold">~{hBuy} (shared)</span>
          </div>
          <div className="flex justify-between text-[12px] py-[5px] border-t border-border">
            <span>Ramp to productive</span><span className="font-semibold">2–4 weeks</span>
          </div>
          <div className="flex justify-between text-[12px] py-[5px] border-t border-border">
            <span>You manage</span><span className="font-semibold">1 account lead</span>
          </div>
        </div>
      </div>

      <div className="p-3 px-4 border-t border-border text-[13px] bg-secondary">
        {verdict}
      </div>

      <div className="grid grid-cols-2 border-t border-border">
        <div className="py-[9px] px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.5px] bg-secondary">In-house wins on</div>
        <div className="py-[9px] px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.5px] bg-secondary border-l border-border">Agency wins on</div>
        <div className="py-[9px] px-4 text-[12px] border-t border-border">Dedicated time & deep product/brand knowledge</div>
        <div className="py-[9px] px-4 text-[12px] border-t border-border border-l border-border">Speed to launch & breadth of skills day one</div>
        <div className="py-[9px] px-4 text-[12px] border-t border-border">Control, responsiveness & cultural fit</div>
        <div className="py-[9px] px-4 text-[12px] border-t border-border border-l border-border">Lower cost at small scale; easy to scale up/down</div>
        <div className="py-[9px] px-4 text-[12px] border-t border-border">Knowledge & assets that stay when contracts end</div>
        <div className="py-[9px] px-4 text-[12px] border-t border-border border-l border-border">Access to specialists you can't afford full-time</div>
      </div>
    </div>
  );
}
