import React from "react";

export function SiteHeader() {
  return (
    <header
      className="w-full border-b border-border"
      style={{ background: "linear-gradient(180deg,#161a22,#0f1115)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between gap-4">
        <a
          href="https://spartanmarketing.agency"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Spartan Marketing home"
        >
          <img
            src="/spartan-logo.png"
            alt="Spartan Marketing"
            className="h-20 w-auto"
          />
        </a>

        <a
          href="https://spartanmarketing.agency/spartan-marketing-blueprint/"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition-opacity hover:opacity-90 active:opacity-75"
          style={{ background: "#F8EF1B", color: "#0f1115" }}
        >
          Get Your Marketing Blueprint
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </div>
    </header>
  );
}
