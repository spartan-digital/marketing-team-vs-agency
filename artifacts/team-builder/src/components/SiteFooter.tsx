import React from "react";

const NAV_LINKS = [
  { label: "Your Team",           href: "https://spartanmarketing.agency/about-us/" },
  { label: "Services",            href: "https://spartanmarketing.agency/services/" },
  { label: "StoryBrand",          href: "https://spartanmarketing.agency/storybrand/" },
  { label: "Marketing Resources", href: "https://spartanmarketing.agency/blog/" },
  { label: "Spartan Pro Show",    href: "https://spartanproshow.buzzsprout.com/", external: true },
  { label: "Contact Us",          href: "https://spartanmarketing.agency/contact/" },
];

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border mt-0"
      style={{ background: "linear-gradient(180deg,#161a22,#0f1115)" }}
    >
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <a
              href="https://spartanmarketing.agency"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spartan Marketing home"
            >
              <img src="/spartan-logo.png" alt="Spartan Marketing" className="h-20 w-auto" />
            </a>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[220px]">
              A marketing agency that uses proven methods & modern tools to produce measurable results.
            </p>
            <div className="flex gap-3 mt-1">
              <a
                href="https://www.facebook.com/heyspartan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#F8EF1B] transition-colors"
                aria-label="Spartan Marketing on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://www.linkedin.com/company/spartan-marketing-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#F8EF1B] transition-colors"
                aria-label="Spartan Marketing on LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://www.instagram.com/heyspartan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#F8EF1B] transition-colors"
                aria-label="Spartan Marketing on Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.8px] text-muted-foreground mb-4 font-semibold">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : "_blank"}
                    rel="noopener noreferrer"
                    className="text-[13px] text-foreground/70 hover:text-[#F8EF1B] transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 className="text-[11px] uppercase tracking-[0.8px] text-muted-foreground mb-4 font-semibold">
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-[13px] text-foreground/70">
              <li>
                <span className="block text-[10px] uppercase tracking-[0.6px] text-muted-foreground mb-0.5">Address</span>
                1931 New Garden Road, Suite 220<br />
                Greensboro, NC 27410
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-[0.6px] text-muted-foreground mb-0.5">Phone</span>
                <a
                  href="tel:336-560-7830"
                  className="hover:text-[#F8EF1B] transition-colors"
                >
                  336-560-7830
                </a>
              </li>
              <li>
                <span className="block text-[10px] uppercase tracking-[0.6px] text-muted-foreground mb-0.5">Email</span>
                <a
                  href="mailto:hello@heyspartan.com"
                  className="hover:text-[#F8EF1B] transition-colors"
                >
                  hello@heyspartan.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-[12px] text-muted-foreground">
          <span>© {year} Spartan Marketing Agency. All rights reserved.</span>
          <a
            href="https://spartanmarketing.agency/spartan-marketing-blueprint/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-[#F8EF1B] transition-colors"
          >
            Get Your Marketing Blueprint →
          </a>
        </div>
      </div>
    </footer>
  );
}
