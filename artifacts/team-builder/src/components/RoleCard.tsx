import React from 'react';
import { formatCurrency, TYPE_LABEL, ORDER } from '@/lib/team-builder-logic';
import { cn } from '@/lib/utils';

export function RoleCard({ 
  role, 
  pick, 
  onChange, 
  isRecommended 
}: { 
  role: any; 
  pick: string; 
  onChange: (id: string, val: string) => void;
  isRecommended: boolean;
}) {
  const isActive = pick !== 'none';
  const colorVar = isActive ? `var(--color-${pick})` : undefined;

  return (
    <div 
      className={cn(
        "bg-card border rounded-xl p-[14px] transition-all duration-150",
        isActive ? "opacity-100" : "opacity-55 hover:opacity-75"
      )}
      style={{
        borderColor: isActive ? colorVar : "var(--color-border)",
        boxShadow: isActive ? `0 0 0 1px ${colorVar} inset` : "none"
      }}
      data-testid={`card-role-${role.id}`}
    >
      <div className="font-semibold text-[15px]">{role.role}</div>
      <div className="text-muted-foreground text-[12px] mt-1 mb-2.5 min-h-[32px]">{role.desc}</div>
      
      <div className="flex flex-wrap gap-[5px] mb-2">
        <button
          data-testid={`opt-${role.id}-none`}
          className={cn(
            "py-[5px] px-[9px] rounded-[7px] border text-[11px] cursor-pointer",
            pick === 'none' ? "text-white border-transparent bg-[#3a3f4b]" : "bg-secondary border-border text-muted-foreground"
          )}
          onClick={() => onChange(role.id, 'none')}
        >
          None
        </button>
        {ORDER.map(t => {
          if (role.costs[t] == null) return null;
          const sel = pick === t;
          return (
            <button
              key={t}
              data-testid={`opt-${role.id}-${t}`}
              className={cn(
                "py-[5px] px-[9px] rounded-[7px] border text-[11px] cursor-pointer",
                sel ? "text-white border-transparent" : "bg-secondary border-border text-muted-foreground"
              )}
              style={sel ? { backgroundColor: `var(--color-${t})` } : {}}
              onClick={() => onChange(role.id, t)}
            >
              {TYPE_LABEL[t]}
            </button>
          );
        })}
      </div>
      
      <div className="text-[13px]">
        {isActive ? (
          role.costs[pick] === 0 ? (
            <b className="text-[16px] text-[var(--color-good)]">Included in Core</b>
          ) : (
            <>
              <b className="text-[16px]">{formatCurrency(role.costs[pick])}</b> <span className="text-muted-foreground text-[12px]">/yr</span>
            </>
          )
        ) : (
          <b className="text-[16px]">$0</b>
        )}
      </div>
      
      {!isActive && isRecommended && (
        <div className="text-[11px] text-[var(--color-warn)] mt-[6px]">
          ★ Recommended at this revenue — try {TYPE_LABEL[role.recType]}
        </div>
      )}
    </div>
  );
}
