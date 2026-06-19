export const ROLES = [
  {id:'lead', group:'Leadership & Strategy', role:'CMO', desc:'A senior strategist actively in the room — setting direction, coaching, and owning the number. As an agency add-on, this is a Fractional CMO layer (+$1k/mo) on top of the Core package.',
    costs:{fte:175000, fractional:72000, agency:12000}, recFrom:0, recType:'agency', priority:2},
  {id:'mgr', group:'Leadership & Strategy', role:'Marketing Manager', desc:'Runs day-to-day execution, campaigns, and vendors. The agency option is the Core package ($21k/yr) — includes a dedicated strategist and marketing manager function.',
    costs:{fte:85000, fractional:40000, agency:21000}, recFrom:2000000, recType:'fte', priority:5},

  {id:'demand', group:'Demand & Digital', role:'Digital / Demand Gen', desc:'Paid media, SEO, lead gen, landing pages, analytics.',
    costs:{fte:82000, fractional:40000, agency:11400}, recFrom:1000000, recType:'agency', priority:1},
  {id:'email', group:'Demand & Digital', role:'Email / CRM', desc:'Nurture sequences, automation, list & pipeline hygiene.',
    costs:{fte:75000, fractional:35000, agency:12000}, recFrom:5000000, recType:'agency', priority:6},
  {id:'web', group:'Demand & Digital', role:'Web / Developer', desc:'Website, technical SEO, tracking, CRO.',
    costs:{fte:105000, fractional:50000, agency:4200}, recFrom:1500000, recType:'agency', priority:3},

  {id:'content', group:'Creative & Content', role:'Content / Copywriter', desc:'Case studies, blogs, sales collateral, email copy.',
    costs:{fte:70000, fractional:35000, agency:30600}, recFrom:1000000, recType:'agency', priority:3},
  {id:'design', group:'Creative & Content', role:'Graphic / Brand Designer', desc:'Brand, sales decks, ads, print, web assets.',
    costs:{fte:72000, fractional:36000, agency:18000}, recFrom:2000000, recType:'agency', priority:4},
  {id:'video', group:'Creative & Content', role:'Video / Photo', desc:'Product, facility, and project content for web & social.',
    costs:{fte:68000, fractional:32000, agency:26200}, recFrom:3000000, recType:'agency', priority:7},
  {id:'social', group:'Creative & Content', role:'Social Media', desc:'Organic social, community, reviews & reputation.',
    costs:{fte:60000, fractional:30000, agency:12000}, recFrom:1500000, recType:'agency', priority:5},

  {id:'coord', group:'Execution & Ops', role:'Marketing Coordinator', desc:'Scheduling, trade shows/events, CRM admin, reporting. Included in the agency Core package — no additional cost when the CMO role is set to Agency.',
    costs:{fte:55000, fractional:27000, agency:null}, recFrom:3000000, recType:'fte', priority:6},
  {id:'ops', group:'Execution & Ops', role:'Marketing Ops / Analyst', desc:'Tooling, dashboards, attribution, data hygiene.',
    costs:{fte:90000, fractional:45000, agency:9000}, recFrom:10000000, recType:'fte', priority:8},
];

export const TYPE_LABEL: Record<string, string> = {fte:'Full-time', fractional:'Fractional', agency:'Agency'};
export const ORDER = ['fte','fractional','agency'];

export const PCT: Record<string, Record<string, number>> = {
  manufacturing:{conservative:0.04, growth:0.07, aggressive:0.095},
  service:{conservative:0.06, growth:0.085, aggressive:0.12}
};

export const PCT_TEXT: Record<string, string> = {
  manufacturing:'Manufacturing: 4–9.5% of revenue (industry jumped to ~9.5% in 2025).',
  service:'Local service: 6–12% of revenue; under-$5M businesses often run higher.'
};

export const AGENCY_MODULE: Record<string, number> = {lead:2500, mgr:1500, demand:3500, email:1200, web:1500, content:2000, design:1500, video:1500, social:1500, coord:800, ops:1000};
export const AGENCY_DISCOUNT = 0.85;
export const AGENCY_MIN_MO = 2500;

export type State = {
  rev: number;
  industry: string;
  stance: string;
  split: number;
  picks: Record<string, string>;
};

export function mktBudget(state: State) {
  return state.rev * PCT[state.industry][state.stance];
}

export function peopleBudget(state: State) {
  return mktBudget(state) * (state.split / 100);
}

export function teamCost(state: State) {
  let t = 0;
  ROLES.forEach(r => {
    const p = state.picks[r.id];
    if (p !== 'none' && (r.costs as any)[p] != null) t += (r.costs as any)[p];
  });
  return t;
}

export function activeRoles(state: State) {
  return ROLES.filter(r => state.picks[r.id] !== 'none');
}

export function agencyEstimate(state: State) {
  const active = activeRoles(state);
  if (!active.length) return 0;
  let mo = 0;
  active.forEach(r => { mo += AGENCY_MODULE[r.id] || 0; });
  mo = Math.max(mo * AGENCY_DISCOUNT, AGENCY_MIN_MO);
  return mo * 12;
}

export function agencyHours(state: State) {
  return Math.min(40 + activeRoles(state).length * 12, 160);
}

export function teamHours(state: State) {
  let h = 0;
  activeRoles(state).forEach(r => {
    const p = state.picks[r.id];
    h += p === 'fte' ? 160 : p === 'fractional' ? 60 : p === 'agency' ? 40 : 0;
  });
  return h;
}

function teamCostFromPicks(picks: Record<string, string>) {
  let t = 0;
  ROLES.forEach(r => {
    const p = picks[r.id];
    if (p !== 'none' && (r.costs as any)[p] != null) t += (r.costs as any)[p];
  });
  return t;
}

export function loadRecommended(state: State) {
  const picks: Record<string, string> = {};
  ROLES.forEach(r => { picks[r.id] = (state.rev >= r.recFrom) ? r.recType : 'none'; });

  let guard = 0;
  while (teamCostFromPicks(picks) > peopleBudget(state) && guard < 20) {
    let drop: string | null = null, worstPri = -1;
    ROLES.forEach(r => {
      const p = picks[r.id];
      if (p !== 'none' && r.priority > worstPri) { worstPri = r.priority; drop = r.id; }
    });
    if (drop) picks[drop] = 'none'; guard++;
  }
  return picks;
}

export function formatCurrency(num: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}
