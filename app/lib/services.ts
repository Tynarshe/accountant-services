export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  category: "Main" | "Additional";
  tagline?: string;
  price: string;
  time: string;
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "book-keeping",
    title: "Bookkeeping",
    short: "Reliable, organised financial records for sole traders, freelancers and limited companies.",
    description: "Keeping your financial records organised is essential to running a successful business. At Accountant Services, we provide reliable and efficient bookkeeping services to help you stay on top of your income, expenses and day-to-day transactions. Whether you’re a sole trader, freelancer or limited company, we take the hassle out of managing your books, ensuring your financial records are accurate, up to date and ready for tax reporting.",
    tagline: "Stay organised, save time and manage your business finances with confidence.",
    category: "Main",
    price: "Tailored quote",
    time: "Regular support",
    includes: ["Income and expense records", "Day-to-day transactions", "Tax-ready financial records"],
  },
  {
    slug: "payroll-services",
    title: "Payroll Services",
    short: "Accurate payroll, payslips and submissions for small businesses and limited companies.",
    description: "Simplify payroll with our reliable UK payroll services for small businesses and limited companies. From employee payslips and PAYE calculations to HMRC RTI submissions and workplace pension contributions, we help you manage payroll accurately, efficiently and in line with your obligations.",
    category: "Main",
    price: "£6.50 + VAT per payslip",
    time: "Each payroll cycle",
    includes: ["Employee payslips and PAYE", "HMRC RTI submissions", "Workplace pension contributions"],
  },
  {
    slug: "year-end-accounts-corporation-tax",
    title: "Year-End Accounts & Corporation Tax",
    short: "Annual accounts and Corporation Tax returns prepared and filed for your limited company.",
    description: "Keep your limited company compliant with our professional year-end accounts preparation and filing services. We help prepare and submit statutory annual accounts to Companies House and Corporation Tax returns (CT600) to HMRC, ensuring your business meets its financial reporting obligations accurately and on time.",
    category: "Main",
    price: "Tailored quote",
    time: "Annual support",
    includes: ["Year-end accounts preparation", "Companies House accounts filing", "Corporation Tax returns (CT600)"],
  },
  {
    slug: "self-assessment-tax-returns",
    title: "Self-Assessment Tax Returns",
    short: "Personal tax returns for sole traders, freelancers, landlords, company directors and individuals.",
    description: "Take the hassle out of filing your Self-Assessment tax return with our professional UK tax return services. We help sole traders, freelancers, landlords, company directors and individuals prepare and submit accurate personal tax returns to HMRC, claim eligible expenses and meet important tax deadlines.",
    category: "Main",
    price: "Fixed fee",
    time: "Annual support",
    includes: ["Personal tax return preparation", "Eligible expense claims", "HMRC return submission"],
  },
  {
    slug: "virtual-finance-director",
    title: "Virtual Finance Director",
    short: "Financial direction and practical insight to help you plan your business’s next steps.",
    description: "Get experienced financial support tailored to your business without a full-time finance director. We help you understand performance, plan cash flow and build forecasts so you can make informed decisions about the future.",
    category: "Additional",
    price: "Tailored quote",
    time: "Support agreed with you",
    includes: ["Financial performance reviews", "Cash-flow planning", "Budgets and forecasts"],
  },
  {
    slug: "dormantcompany",
    title: "Dormant Company Filing",
    short: "Keep an inactive company’s annual accounts and filing requirements in order.",
    description: "We help eligible dormant companies prepare and submit their annual accounts to Companies House. We’ll confirm the information needed and agree the scope and fixed fee before work begins.",
    category: "Additional",
    price: "Fixed fee",
    time: "Annual support",
    includes: ["Dormant accounts preparation", "Companies House filing", "Filing deadline guidance"],
  },
  {
    slug: "company-secretarial",
    title: "Company Secretarial",
    short: "Practical support with company records, routine filings and company changes.",
    description: "Keep your company administration organised with support for statutory records, confirmation statements and director or shareholder changes. We agree the work required and a fixed fee so you know what to expect.",
    category: "Additional",
    price: "Fixed fee",
    time: "As needed",
    includes: ["Statutory record support", "Confirmation statement support", "Director and shareholder updates"],
  },
  {
    slug: "vat-returns",
    title: "VAT Returns",
    short: "Support with preparing and submitting your business’s VAT returns.",
    description: "We help you bring your VAT records together, prepare your return and submit it to HMRC. Our support is tailored to your business, with the scope, timing and fee agreed before work begins.",
    category: "Additional",
    price: "Tailored quote",
    time: "Each VAT return period",
    includes: ["VAT record review", "VAT return preparation", "HMRC return submission"],
  },
];

export const categories = [
  {
    name: "Main",
    eyebrow: "01 — Main services",
    title: "The essentials, expertly handled",
    description: "Bookkeeping, payroll, year-end accounts and Self-Assessment tax returns.",
  },
  {
    name: "Additional",
    eyebrow: "02 — Additional services",
    title: "More support as your needs evolve",
    description: "Virtual finance director, dormant company filing, company secretarial and VAT return support.",
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
