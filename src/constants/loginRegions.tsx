import type { ReactElement } from "react";

export interface LoginRegion {
  label: string;
  /** ISO 3166-1 alpha-2, any case. Must have a matching entry in REGION_FLAGS. */
  countryCode: string;
  url: string;
}

// One entry per ClinIQ tenant. Label pattern "ClinIQ <CC>", URL pattern
// https://<subdomain>.continuia.ai/app/login. Adding a region is one entry here
// plus its flag in REGION_FLAGS below.
export const LOGIN_REGIONS: LoginRegion[] = [
  { label: "ClinIQ US", countryCode: "US", url: "https://cliniq.continuia.ai/app/login" },
  { label: "ClinIQ IN", countryCode: "IN", url: "https://cliniq-in.continuia.ai/app/login" },
];

// Flag artwork keyed by lowercase ISO 3166-1 alpha-2 code, drawn in a 24x18 box.
// Inline SVG on purpose: emoji flags do not render on Windows Chrome.
export const REGION_FLAGS: Record<string, ReactElement> = {
  us: (
    <>
      <rect width="24" height="18" fill="#ffffff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 18) / 13} width="24" height={18 / 13} fill="#b22234" />
      ))}
      <rect width="9.6" height={(7 * 18) / 13} fill="#3c3b6e" />
      {[0, 1, 2].flatMap((row) =>
        [0, 1, 2].map((col) => <circle key={`${row}-${col}`} cx={1.9 + col * 2.9} cy={1.9 + row * 2.9} r="0.55" fill="#ffffff" />)
      )}
    </>
  ),
  in: (
    <>
      <rect width="24" height="6" fill="#ff9933" />
      <rect y="6" width="24" height="6" fill="#ffffff" />
      <rect y="12" width="24" height="6" fill="#138808" />
      <circle cx="12" cy="9" r="2.1" fill="none" stroke="#000080" strokeWidth="0.45" />
      {[0, 45, 90, 135].map((deg) => (
        <line key={deg} x1="12" y1="6.9" x2="12" y2="11.1" stroke="#000080" strokeWidth="0.3" transform={`rotate(${deg} 12 9)`} />
      ))}
    </>
  ),
};
