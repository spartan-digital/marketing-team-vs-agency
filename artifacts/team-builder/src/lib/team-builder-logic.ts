import {
  ROLE_COSTS,
  BUDGET_PCT,
  AGENCY_MODULE_MONTHLY,
  AGENCY_DISCOUNT,
  AGENCY_MIN_MONTHLY,
} from './pricing';

export { BUDGET_PCT as PCT };

export const ROLES = [
  {
    id: 'lead', group: 'Leadership & Strategy', role: 'CMO',
    desc: 'Sets strategy, owns the number, and leads the team. Can be a full-time hire, fractional executive, or an agency add-on for a senior strategist actively in the room.',
    costs: ROLE_COSTS.lead, recFrom: 0, recType: 'agency', priority: 2,
  },
  {
    id: 'mgr', group: 'Leadership & Strategy', role: 'Marketing Manager',
    desc: 'Runs day-to-day execution, campaigns, and vendors.',
    costs: ROLE_COSTS.mgr, recFrom: 2_000_000, recType: 'fte', priority: 5,
  },
  {
    id: 'demand', group: 'Demand & Digital', role: 'Digital / Demand Gen',
    desc: 'Paid media, SEO, lead gen, landing pages, analytics.',
    costs: ROLE_COSTS.demand, recFrom: 1_000_000, recType: 'agency', priority: 1,
  },
  {
    id: 'email', group: 'Demand & Digital', role: 'Email / CRM',
    desc: 'Nurture sequences, automation, list & pipeline hygiene.',
    costs: ROLE_COSTS.email, recFrom: 5_000_000, recType: 'agency', priority: 6,
  },
  {
    id: 'web', group: 'Demand & Digital', role: 'Web / Developer',
    desc: 'Website, technical SEO, tracking, CRO.',
    costs: ROLE_COSTS.web, recFrom: 1_500_000, recType: 'agency', priority: 3,
  },
  {
    id: 'content', group: 'Creative & Content', role: 'Content / Copywriter',
    desc: 'Case studies, blogs, sales collateral, email copy.',
    costs: ROLE_COSTS.content, recFrom: 1_000_000, recType: 'agency', priority: 3,
  },
  {
    id: 'design', group: 'Creative & Content', role: 'Graphic / Brand Designer',
    desc: 'Brand, sales decks, ads, print, web assets.',
    costs: ROLE_COSTS.design, recFrom: 2_000_000, recType: 'agency', priority: 4,
  },
  {
    id: 'video', group: 'Creative & Content', role: 'Video / Photo',
    desc: 'Product, facility, and project content for web & social.',
    costs: ROLE_COSTS.video, recFrom: 3_000_000, recType: 'agency', priority: 7,
  },
  {
    id: 'social', group: 'Creative & Content', role: 'Social Media',
    desc: 'Organic social, community, reviews & reputation.',
    costs: ROLE_COSTS.social, recFrom: 1_500_000, recType: 'agency', priority: 5,
  },
  {
    id: 'coord', group: 'Execution & Ops', role: 'Marketing Coordinator',
    desc: 'Scheduling, trade shows/events, CRM admin, reporting. Included in the agency Core package — no additional cost when the CMO role is set to Agency.',
    costs: ROLE_COSTS.coord, recFrom: 3_000_000, recType: 'fte', priority: 6,
  },
  {
    id: 'ops', group: 'Execution & Ops', role: 'Marketing Ops / Analyst',
    desc: 'Tooling, dashboards, attribution, data hygiene. Included in the agency Core package at no additional cost.',
    costs: ROLE_COSTS.ops, recFrom: 10_000_000, recType: 'fte', priority: 8,
  },
];

export const TYPE_LABEL: Record<string, string> = {
  fte: 'Full-time',
  fractional: 'Fractional',
  agency: 'Agency',
};

export const ORDER = ['fte', 'fractional', 'agency'];

export const PCT_TEXT: Record<string, string> = {
  manufacturing: 'Manufacturing: 4–9.5% of revenue (industry jumped to ~9.5% in 2025).',
  service: 'Local service: 6–12% of revenue; under-$5M businesses often run higher.',
};

export type State = {
  rev: number;
  industry: string;
  stance: string;
  split: number;
  picks: Record<string, string>;
};

export function mktBudget(state: State): number {
  return state.rev * BUDGET_PCT[state.industry][state.stance];
}

export function peopleBudget(state: State): number {
  return mktBudget(state) * (state.split / 100);
}

export function teamCost(state: State): number {
  let total = 0;
  for (const r of ROLES) {
    const pick = state.picks[r.id];
    const cost = (r.costs as Record<string, number | null>)[pick];
    if (pick !== 'none' && cost != null) total += cost;
  }
  return total;
}

export function activeRoles(state: State) {
  return ROLES.filter(r => state.picks[r.id] !== 'none');
}

export function agencyEstimate(state: State): number {
  const active = activeRoles(state);
  if (!active.length) return 0;
  let monthly = 0;
  for (const r of active) monthly += AGENCY_MODULE_MONTHLY[r.id] ?? 0;
  monthly = Math.max(monthly * AGENCY_DISCOUNT, AGENCY_MIN_MONTHLY);
  return monthly * 12;
}

export function agencyHours(state: State): number {
  return Math.min(40 + activeRoles(state).length * 12, 160);
}

export function teamHours(state: State): number {
  let hours = 0;
  for (const r of activeRoles(state)) {
    const pick = state.picks[r.id];
    if (pick === 'fte') hours += 160;
    else if (pick === 'fractional') hours += 60;
    else if (pick === 'agency') hours += 40;
  }
  return hours;
}

function teamCostFromPicks(picks: Record<string, string>): number {
  let total = 0;
  for (const r of ROLES) {
    const pick = picks[r.id];
    const cost = (r.costs as Record<string, number | null>)[pick];
    if (pick !== 'none' && cost != null) total += cost;
  }
  return total;
}

export function loadRecommended(state: State): Record<string, string> {
  const picks: Record<string, string> = {};
  for (const r of ROLES) {
    picks[r.id] = state.rev >= r.recFrom ? r.recType : 'none';
  }

  let guard = 0;
  while (teamCostFromPicks(picks) > peopleBudget(state) && guard < 20) {
    let drop: string | null = null;
    let worstPriority = -1;
    for (const r of ROLES) {
      if (picks[r.id] !== 'none' && r.priority > worstPriority) {
        worstPriority = r.priority;
        drop = r.id;
      }
    }
    if (drop) picks[drop] = 'none';
    guard++;
  }
  return picks;
}

export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(num);
}
