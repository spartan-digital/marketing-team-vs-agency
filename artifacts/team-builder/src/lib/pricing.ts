// ─── PRICING CONFIG ───────────────────────────────────────────────────────────
// All monetary values are annual USD. Update here to change costs everywhere.

export type CostTier = { fte: number; fractional: number; agency: number | null };

/** Annual role costs by employment type */
export const ROLE_COSTS: Record<string, CostTier> = {
  lead:    { fte: 175_000, fractional:  72_000, agency: 12_000 },
  mgr:     { fte:  85_000, fractional:  40_000, agency: 21_000 },
  demand:  { fte:  82_000, fractional:  40_000, agency: 11_400 },
  email:   { fte:  75_000, fractional:  35_000, agency: 12_000 },
  web:     { fte: 105_000, fractional:  50_000, agency:  4_200 },
  content: { fte:  70_000, fractional:  35_000, agency: 30_600 },
  design:  { fte:  72_000, fractional:  36_000, agency: 18_000 },
  video:   { fte:  68_000, fractional:  32_000, agency: 26_200 },
  social:  { fte:  60_000, fractional:  30_000, agency: 12_000 },
  coord:   { fte:  55_000, fractional:  27_000, agency:   null },
  ops:     { fte:  90_000, fractional:  45_000, agency:      0 },
};

/** Marketing budget as % of revenue, by industry × growth stance */
export const BUDGET_PCT: Record<string, Record<string, number>> = {
  manufacturing: { conservative: 0.040, growth: 0.070, aggressive: 0.095 },
  service:       { conservative: 0.060, growth: 0.085, aggressive: 0.120 },
};

/** Monthly module cost per role used to estimate a comparable agency retainer */
export const AGENCY_MODULE_MONTHLY: Record<string, number> = {
  lead:    2_500,
  mgr:     1_500,
  demand:  3_500,
  email:   1_200,
  web:     1_500,
  content: 2_000,
  design:  1_500,
  video:   1_500,
  social:  1_500,
  coord:     800,
  ops:     1_000,
};

export const AGENCY_DISCOUNT    = 0.85;
export const AGENCY_MIN_MONTHLY = 2_500;
