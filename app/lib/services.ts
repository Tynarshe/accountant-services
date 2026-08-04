export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  category: "Start" | "Compliance" | "Change" | "Grow";
  price: string;
  time: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "dormantcompany",
    title: "Dormant Company Filing",
    short: "Keep an inactive company compliant, without carrying the admin yourself.",
    description: "We prepare and submit the annual accounts required for an eligible dormant company, with clear guidance throughout.",
    category: "Compliance",
    price: "Fixed-fee service",
    time: "Expert reviewed",
    includes: ["Dormant accounts preparation", "Companies House filing", "Deadline tracking"],
  },
  {
    slug: "company-secretarial",
    title: "Company Secretarial",
    short: "Reliable company administration that keeps your records and filings in order.",
    description: "Flexible company secretarial support for statutory records, routine Companies House filings and the changes that happen as your business evolves.",
    category: "Compliance",
    price: "Tailored quote",
    time: "Ongoing or one-off support",
    includes: ["Statutory record support", "Confirmation statement coordination", "Director and shareholder updates"],
  },
  {
    slug: "business-plan",
    title: "Business Plan",
    short: "Turn a strong idea into a credible, numbers-backed plan.",
    description: "A practical business plan shaped for decision-making, finance conversations and confident growth.",
    category: "Grow",
    price: "Tailored quote",
    time: "Collaborative process",
    includes: ["Business narrative", "Financial forecasts", "Funding-ready presentation"],
  },
  {
    slug: "book-keeping",
    title: "Book Keeping",
    short: "Reliable books that make better decisions possible.",
    description: "Consistent transaction processing and reconciliations, giving you a cleaner view of your finances.",
    category: "Grow",
    price: "Monthly support",
    time: "Always up to date",
    includes: ["Transaction processing", "Bank reconciliation", "Management-ready records"],
  },
];

export const categories = [
  {
    name: "Compliance",
    eyebrow: "01 — Stay compliant",
    title: "Keep the company record under control",
    description: "Dormant filings and company secretarial support, handled carefully and explained clearly.",
  },
  {
    name: "Grow",
    eyebrow: "02 — Build confidently",
    title: "Put stronger numbers behind the plan",
    description: "Book keeping and business planning tailored to the way your organisation works.",
  },
] as const;

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service]));
export const visibleCategories = categories;
export const visibleServices = services;
export const visibleServiceBySlug = Object.fromEntries(visibleServices.map((service) => [service.slug, service]));

export const articles = [
  {
    slug: "wrapping-up-your-year-end-accounts",
    title: "Your calm, clear year-end checklist",
    category: "Year end",
    date: "24 May 2024",
    excerpt: "The practical steps that make finalising annual accounts less daunting and more predictable.",
  },
  {
    slug: "accountant-services",
    title: "What a modern accountant should do for your business",
    category: "Guides",
    date: "13 April 2024",
    excerpt: "Beyond compliance: how good financial support creates sharper decisions and a stronger business.",
  },
  {
    slug: "low-cost-business-accountant",
    title: "Value without compromise: choosing an accountant",
    category: "Advice",
    date: "31 March 2024",
    excerpt: "What to compare when you want capable, responsive accounting support at a sensible cost.",
  },
  {
    slug: "what-is-a-confirmation-statement",
    title: "What is a Confirmation Statement?",
    category: "Companies House",
    date: "16 March 2024",
    excerpt: "A practical explanation of the annual confirmation statement, who must file it and what needs checking.",
  },
  {
    slug: "uk-budget-6-march-2024",
    title: "UK Budget: March 2024",
    category: "Budget",
    date: "6 March 2024",
    excerpt: "The main announcements from the Spring Budget and what they meant for individuals and UK businesses.",
  },
  {
    slug: "dormant-company-annual-filing",
    title: "Dormant Company Annual Filing",
    category: "Companies House",
    date: "26 February 2024",
    excerpt: "The accounts and confirmation requirements that keep an inactive UK company in good standing.",
  },
  {
    slug: "how-to-start-limited-company-in-the-uk",
    title: "How to Start a Limited Company in the UK",
    category: "Starting out",
    date: "30 January 2024",
    excerpt: "The essential decisions, information and filings involved in setting up a UK limited company.",
  },
  {
    slug: "self-assessment-tax-return",
    title: "Self Assessment Tax Return",
    category: "Tax",
    date: "22 December 2023",
    excerpt: "Important Self Assessment dates, records and preparation points for self-employed people.",
  },
  {
    slug: "autumn-statement-2023",
    title: "Autumn Statement 2023",
    category: "Budget",
    date: "22 November 2023",
    excerpt: "A clear summary of the Autumn Statement’s principal tax and business measures.",
  },
  {
    slug: "accountant-services-in-reading",
    title: "Accountant Services in Reading",
    category: "Local business",
    date: "9 November 2023",
    excerpt: "How responsive local accounting support can help businesses around Reading plan, comply and grow.",
  },
  {
    slug: "accountant",
    title: "What Does an Accountant Do?",
    category: "Guides",
    date: "5 September 2023",
    excerpt: "From reliable records to better decisions: a straightforward look at the work an accountant performs.",
  },
  {
    slug: "mini-budget",
    title: "Mini Budget",
    category: "Budget",
    date: "5 September 2023",
    excerpt: "The main fiscal announcements and the practical details business owners needed to understand.",
  },
  {
    slug: "spring-budget-march-2023",
    title: "Spring Budget March 2023",
    category: "Budget",
    date: "5 September 2023",
    excerpt: "A business-focused overview of the Chancellor’s Spring Budget announcements.",
  },
  {
    slug: "buy-to-let-tax-changes-2023",
    title: "Buy-to-Let Tax Changes 2023",
    category: "Property tax",
    date: "5 September 2023",
    excerpt: "Key income tax, capital gains tax and corporation tax points for residential landlords.",
  },
  {
    slug: "making-tax-digital-for-vat",
    title: "Making Tax Digital for VAT",
    category: "VAT",
    date: "5 September 2023",
    excerpt: "What VAT-registered businesses need to know about digital records and compatible return filing.",
  },
];
