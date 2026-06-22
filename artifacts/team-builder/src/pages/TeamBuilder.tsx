import React, { useState, useMemo } from 'react';
import { SegmentedControl } from '@/components/SegmentedControl';
import { BudgetBar } from '@/components/BudgetBar';
import { ComparePanel } from '@/components/ComparePanel';
import { RoleCard } from '@/components/RoleCard';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import {
  ROLES, PCT, PCT_TEXT, mktBudget, peopleBudget, teamCost, loadRecommended, State, formatCurrency
} from '@/lib/team-builder-logic';

export default function TeamBuilder() {
  const [state, setState] = useState<State>({
    rev: 2000000,
    industry: 'manufacturing',
    stance: 'growth',
    split: 50,
    picks: ROLES.reduce((acc, r) => ({ ...acc, [r.id]: 'none' }), {})
  });

  const handlePick = (id: string, val: string) => {
    setState(s => ({ ...s, picks: { ...s.picks, [id]: val } }));
  };

  const handleClear = () => {
    setState(s => ({ ...s, picks: ROLES.reduce((acc, r) => ({ ...acc, [r.id]: 'none' }), {}) }));
  };

  const handleRec = () => {
    setState(s => ({ ...s, picks: loadRecommended(s) }));
  };

  const currentMktBudget = mktBudget(state);
  const currentPeopleBudget = peopleBudget(state);
  const currentTeamCost = teamCost(state);

  const groups = useMemo(() => {
    const map = new Map<string, typeof ROLES>();
    ROLES.forEach(r => {
      if (!map.has(r.group)) map.set(r.group, []);
      map.get(r.group)!.push(r);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <SiteHeader />

      <div className="border-b border-border py-[22px]" style={{ background: 'linear-gradient(180deg,#161a22,#0f1115)' }}>
        <div className="max-w-[1400px] mx-auto px-8">
          <h1 className="m-0 text-[20px] tracking-[0.2px]">Marketing Team Cost Calculator</h1>
          <div className="text-muted-foreground text-[13px] mt-1">Compare what it costs to build your marketing team in-house, hire fractional, or partner with Spartan — side by side.</div>
        </div>
      </div>

      <div className="py-[20px] bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-x-[28px] gap-y-[18px] mb-[16px]">
          <div className="m-0">
            <label htmlFor="rev-input" className="block text-[12px] uppercase tracking-[0.6px] text-muted-foreground mb-[8px]">Annual revenue</label>
            <div className="text-[24px] font-semibold my-[2px] mb-[6px]" aria-live="polite">{formatCurrency(state.rev)}</div>
            <input
              id="rev-input"
              type="range"
              className="w-full accent-accent"
              min="250000"
              max="50000000"
              step="250000"
              value={state.rev}
              aria-valuetext={formatCurrency(state.rev)}
              onChange={e => setState(s => ({ ...s, rev: Number(e.target.value) }))}
              data-testid="input-rev"
            />
          </div>

          <div className="m-0">
            <label className="block text-[12px] uppercase tracking-[0.6px] text-muted-foreground mb-[8px]">Business type</label>
            <SegmentedControl
              options={[
                { label: 'Manufacturing', value: 'manufacturing' },
                { label: 'Local service', value: 'service' }
              ]}
              value={state.industry}
              onChange={v => setState(s => ({ ...s, industry: v }))}
              testIdPrefix="btn-industry"
              groupLabel="Business type"
            />
          </div>

          <div className="m-0">
            <label className="block text-[12px] uppercase tracking-[0.6px] text-muted-foreground mb-[8px]">Growth stance</label>
            <SegmentedControl
              options={[
                { label: 'Conservative', value: 'conservative' },
                { label: 'Growth', value: 'growth' },
                { label: 'Aggressive', value: 'aggressive' }
              ]}
              value={state.stance}
              onChange={v => setState(s => ({ ...s, stance: v }))}
              testIdPrefix="btn-stance"
              groupLabel="Growth stance"
            />
            <div className="grid grid-cols-3 gap-[4px] mt-[6px]" role="group" aria-label="Budget by stance">
              {(['conservative', 'growth', 'aggressive'] as const).map(s => {
                const pct = PCT[state.industry][s];
                const budget = state.rev * pct;
                const active = state.stance === s;
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={active}
                    aria-label={`${s} stance: ${(pct * 100).toFixed(1)}%, ${formatCurrency(budget)}/yr`}
                    onClick={() => setState(st => ({ ...st, stance: s }))}
                    className={`rounded-[6px] py-[5px] px-[6px] text-left cursor-pointer border transition-colors ${active ? 'border-accent bg-accent/10' : 'border-border bg-secondary hover:border-muted-foreground'}`}
                  >
                    <div className={`text-[10px] uppercase tracking-[0.4px] mb-[1px] ${active ? 'text-accent' : 'text-muted-foreground'}`}>
                      {(pct * 100).toFixed(1)}%
                    </div>
                    <div className={`text-[12px] font-semibold leading-none ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {formatCurrency(budget)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="m-0">
            <label htmlFor="split-input" className="block text-[12px] uppercase tracking-[0.6px] text-muted-foreground mb-[8px]">
              People vs. programs split — <span aria-live="polite">{state.split}</span>% people
            </label>
            <input
              id="split-input"
              type="range"
              className="w-full accent-accent"
              min="30"
              max="75"
              step="5"
              value={state.split}
              aria-valuetext={`${state.split}% toward people`}
              onChange={e => setState(s => ({ ...s, split: Number(e.target.value) }))}
              data-testid="input-split"
            />
            <div className="text-[11px] text-muted-foreground mt-[6px] leading-[1.5]">
              {state.split === 50
                ? 'The 50/50 starting point is an industry baseline: half your budget funds the people who execute, half funds the channels and tools they run.'
                : state.split > 50
                ? `${state.split}% toward people — leaning in-house. Good when you're building institutional capability and plan to grow the team.`
                : `${state.split}% toward people — leaning programs. Works well when you're outsourcing execution and investing heavily in paid channels or tools.`}
            </div>
          </div>
        </div>
        
        <div className="text-[11px] text-muted-foreground m-0 mb-[14px] leading-[1.5]">
          {PCT_TEXT[state.industry]}
        </div>

        <div className="flex flex-wrap gap-[12px] items-stretch">
          <div className="flex-auto basis-[180px] bg-secondary border border-border rounded-[10px] p-[12px] px-[14px]">
            <div className="text-[12px] text-muted-foreground">Total marketing budget</div>
            <div className="text-[20px] font-semibold mt-[2px]">{formatCurrency(currentMktBudget)}</div>
          </div>
          
          <div className="flex-auto basis-[180px] bg-secondary border border-border rounded-[10px] p-[12px] px-[14px]">
            <div className="text-[12px] text-muted-foreground">People budget</div>
            <div className="text-[20px] font-semibold mt-[2px]">{formatCurrency(currentPeopleBudget)}</div>
          </div>

          <div className="flex-[2_1_300px] bg-secondary border border-border rounded-[10px] p-[12px] px-[14px] max-sm:flex-basis-[100%]">
            <BudgetBar teamCost={currentTeamCost} peopleBudget={currentPeopleBudget} />
          </div>

          <div className="flex-auto basis-[170px] flex flex-col gap-[8px] justify-center max-sm:flex-basis-[100%]">
            <button 
              className="bg-secondary border border-border text-muted-foreground rounded-[7px] py-[6px] px-[10px] cursor-pointer text-[12px] hover:text-foreground transition-colors"
              onClick={handleRec}
              data-testid="btn-rec"
            >
              ↺ Load recommended team
            </button>
            <button 
              className="bg-secondary border border-border text-muted-foreground rounded-[7px] py-[6px] px-[10px] cursor-pointer text-[12px] hover:text-foreground transition-colors"
              onClick={handleClear}
              data-testid="btn-clear"
            >
              Clear all roles
            </button>
          </div>
        </div>
        </div>{/* end max-w wrapper */}
      </div>

      <main className="py-[22px]">
        <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex gap-[14px] flex-wrap m-0 mb-[18px] text-[12px] text-muted-foreground">
          <span className="flex items-center"><i className="inline-block w-[11px] h-[11px] rounded-[3px] mr-[5px] align-[-1px]" style={{ background: 'var(--color-fte)' }}></i>Full-time hire</span>
          <span className="flex items-center"><i className="inline-block w-[11px] h-[11px] rounded-[3px] mr-[5px] align-[-1px]" style={{ background: 'var(--color-fractional)' }}></i>Fractional</span>
          <span className="flex items-center"><i className="inline-block w-[11px] h-[11px] rounded-[3px] mr-[5px] align-[-1px]" style={{ background: 'var(--color-agency)' }}></i>Agency</span>
        </div>

        <ComparePanel state={state} />

        <div className="flex flex-col gap-[22px]">
          {groups.map(([groupName, roles]) => (
            <div key={groupName}>
              <h2 className="text-[13px] uppercase tracking-[0.8px] text-muted-foreground m-0 mb-[12px] border-b border-border pb-[8px]">{groupName}</h2>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-[12px]">
                {roles.map(role => {
                  const isRec = state.rev >= role.recFrom && state.picks[role.id] === 'none';
                  return (
                    <RoleCard 
                      key={role.id} 
                      role={role} 
                      pick={state.picks[role.id]} 
                      onChange={handlePick}
                      isRecommended={isRec}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="text-[11px] text-muted-foreground mt-[14px] leading-[1.5]">
          Cost figures are 2026 U.S. benchmarks shown as fully-considered annual cost (FTE salaries are loaded ~1.35× base for taxes/benefits). They are editable starting points — real rates vary by region, seniority, and scope.
        </div>
        </div>{/* end max-w wrapper */}
      </main>

      <SiteFooter />
    </div>
  );
}
