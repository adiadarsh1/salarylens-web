/**
 * Central site configuration. Domain-portable: SITE_URL is derived from Astro's
 * configured `site` + `base`, so moving to a custom domain needs no changes here.
 */

export const SITE = {
  name: 'SalaryLens',
  title: 'In-Hand Salary Calculator (India) — CTC to Take-Home',
  tagline: 'Decode any Indian CTC into your real monthly take-home pay.',
  description:
    'Free in-hand salary calculator for India. Enter your CTC and instantly see monthly take-home pay, EPF, gratuity, income tax (new & old regime) for FY 2025-26.',
  author: 'Adarsh Garg',
  fy: 'FY 2025-26 (AY 2026-27)',
  // Chrome Web Store listing for the companion extension (update once live URL known).
  extensionUrl:
    'https://chromewebstore.google.com/search/SalaryLens%20CTC%20in-hand%20salary',
  // MailerLite embedded form action — replace with real form URL when created.
  newsletterAction: '',
  twitter: '@adi.commits',
};

/** Common CTC values (in ₹) that get their own programmatic page. */
export const CTC_VALUES: number[] = [
  600_000, 800_000, 1_000_000, 1_200_000, 1_500_000, 1_800_000, 2_000_000,
  2_500_000, 3_000_000, 4_000_000, 5_000_000, 7_500_000, 1_00_00_000,
];

export interface CompanyPreset {
  slug: string;
  name: string;
  /** typical basic % of CTC at this employer */
  basicPct: number;
  /** typical variable/bonus % of CTC */
  variablePct: number;
  /** whether PF is usually on actual basic (true) or statutory ₹1,800/mo cap */
  pfOnActualBasic: boolean;
  /** a representative CTC (₹) to anchor the example on the page */
  sampleCtc: number;
  blurb: string;
}

/** Top Indian employers people search take-home pay for. Presets are typical, not official. */
export const COMPANIES: CompanyPreset[] = [
  { slug: 'tcs', name: 'TCS', basicPct: 40, variablePct: 8, pfOnActualBasic: false, sampleCtc: 700_000, blurb: 'India\'s largest IT services employer; conservative fixed-heavy structures.' },
  { slug: 'infosys', name: 'Infosys', basicPct: 40, variablePct: 10, pfOnActualBasic: false, sampleCtc: 800_000, blurb: 'Large IT services firm with a standard fixed + variable split.' },
  { slug: 'wipro', name: 'Wipro', basicPct: 40, variablePct: 8, pfOnActualBasic: false, sampleCtc: 650_000, blurb: 'IT services major with typical services-industry pay structures.' },
  { slug: 'accenture', name: 'Accenture', basicPct: 42, variablePct: 12, pfOnActualBasic: false, sampleCtc: 900_000, blurb: 'Global consulting firm with a moderate variable component.' },
  { slug: 'cognizant', name: 'Cognizant', basicPct: 40, variablePct: 10, pfOnActualBasic: false, sampleCtc: 750_000, blurb: 'IT services firm with a standard fixed-plus-variable model.' },
  { slug: 'capgemini', name: 'Capgemini', basicPct: 40, variablePct: 10, pfOnActualBasic: false, sampleCtc: 700_000, blurb: 'IT consulting firm with a typical services structure.' },
  { slug: 'hcltech', name: 'HCLTech', basicPct: 40, variablePct: 10, pfOnActualBasic: false, sampleCtc: 750_000, blurb: 'IT services major with a standard pay split.' },
  { slug: 'microsoft', name: 'Microsoft', basicPct: 45, variablePct: 12, pfOnActualBasic: true, sampleCtc: 3_500_000, blurb: 'Product company with high base and significant stock (shown separately).' },
  { slug: 'amazon', name: 'Amazon', basicPct: 45, variablePct: 5, pfOnActualBasic: true, sampleCtc: 3_000_000, blurb: 'Product company with high base, low cash variable, large RSU vesting.' },
  { slug: 'google', name: 'Google', basicPct: 45, variablePct: 15, pfOnActualBasic: true, sampleCtc: 4_000_000, blurb: 'Product company with high base, bonus and stock.' },
  { slug: 'flipkart', name: 'Flipkart', basicPct: 45, variablePct: 12, pfOnActualBasic: true, sampleCtc: 2_500_000, blurb: 'Indian product company with competitive base plus stock.' },
  { slug: 'oracle', name: 'Oracle', basicPct: 45, variablePct: 10, pfOnActualBasic: true, sampleCtc: 2_500_000, blurb: 'Product/enterprise firm with a healthy base and variable.' },
  { slug: 'sap', name: 'SAP', basicPct: 45, variablePct: 12, pfOnActualBasic: true, sampleCtc: 2_500_000, blurb: 'Enterprise software firm with a strong fixed component.' },
  { slug: 'deloitte', name: 'Deloitte', basicPct: 42, variablePct: 12, pfOnActualBasic: false, sampleCtc: 1_200_000, blurb: 'Consulting firm with a moderate variable pay share.' },
  { slug: 'ibm', name: 'IBM', basicPct: 42, variablePct: 10, pfOnActualBasic: false, sampleCtc: 1_000_000, blurb: 'Technology & consulting firm with a standard split.' },
  { slug: 'zoho', name: 'Zoho', basicPct: 45, variablePct: 8, pfOnActualBasic: true, sampleCtc: 1_200_000, blurb: 'Bootstrapped product company with fixed-heavy pay.' },
  { slug: 'paytm', name: 'Paytm', basicPct: 45, variablePct: 12, pfOnActualBasic: true, sampleCtc: 1_800_000, blurb: 'Fintech with base plus variable and some stock.' },
  { slug: 'swiggy', name: 'Swiggy', basicPct: 45, variablePct: 12, pfOnActualBasic: true, sampleCtc: 2_000_000, blurb: 'Consumer-tech company with base plus stock.' },
];
