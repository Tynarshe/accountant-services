import { UpRightArrow } from "./arrow";
import { SectionLink } from "./interactive";

const audiences = [
  {
    id: "small-businesses", name: "Small Businesses", title: "Helping Small Businesses Stay Organised and Grow",
    paragraphs: ["Running a small business comes with many responsibilities, and managing your finances shouldn't take valuable time away from your customers and business operations.", "We provide practical and affordable accounting services for small businesses, helping you manage bookkeeping, payroll, VAT returns, annual accounts and tax obligations.", "Our aim is to simplify your financial administration, improve financial visibility and give you more time to focus on running and growing your business."],
    cta: "See full list of our services", href: "/additional-services",
  },
  {
    id: "limited-companies", name: "Limited Companies", title: "Complete Accounting & Tax Support for Limited Companies",
    paragraphs: ["Managing a limited company involves important financial reporting and statutory responsibilities.", "At Accountant Services, we help UK limited companies stay on top of their accounting and compliance requirements, including year-end accounts, Corporation Tax returns, bookkeeping, VAT, payroll and Companies House filings.", "Whether you're a newly incorporated company or an established business, we provide dependable accounting support tailored to your company's needs."],
    cta: "Enquire Now", href: "/contact#quotation",
  },
  {
    id: "sole-traders", name: "Sole Traders & Self-Employed Professionals", title: "Straightforward Accounting for the Self-Employed",
    paragraphs: ["When you're self-employed, keeping track of your income, expenses and tax responsibilities can be challenging.", "Our accounting services for sole traders and self-employed individuals are designed to make managing your finances easier.", "From bookkeeping and Self-Assessment tax returns to allowable business expenses and HMRC reporting requirements, we help you stay organised, understand your obligations and prepare for important deadlines."],
    cta: "Enquire Now", href: "/contact#quotation",
  },
  {
    id: "freelancers", name: "Freelancers & Contractors", title: "Flexible Accounting Support for Independent Professionals",
    paragraphs: ["As a freelancer or contractor, your priority is delivering great work to your clients — not spending hours managing paperwork.", "We provide straightforward accounting and tax services for freelancers and contractors, helping you maintain accurate financial records, manage business expenses and prepare your tax returns.", "Whether you operate as a sole trader or through a limited company, our services can be tailored to your working arrangements and financial requirements."],
    cta: "Enquire Now", href: "/contact#quotation",
  },
  {
    id: "start-ups", name: "Start-ups & New Businesses", title: "Helping New Businesses Start with Confidence",
    paragraphs: ["Starting a business is an exciting journey, but understanding your accounting, tax and registration responsibilities can feel overwhelming.", "At Accountant Services, we help start-ups and new business owners establish strong financial foundations through company formation support, bookkeeping, tax registration and essential accounting services.", "As your business develops, we can continue supporting your accounting and financial reporting needs, helping you build good financial practices from the beginning."],
    cta: "Enquire Now", href: "/contact#quotation",
  },
  {
    id: "growing-businesses", name: "Growing & Established Businesses", title: "Strategic Financial Support for Your Next Stage of Growth",
    paragraphs: ["As your business grows, financial decisions become increasingly important. Managing cash flow, monitoring profitability and planning for future investment require more than routine accounting.", "Our services for growing businesses combine ongoing accounting support with strategic financial guidance through our Virtual Finance Director offering.", "From management accounts and cash flow forecasting to budgeting, financial planning and business performance analysis, we help you gain greater financial clarity and make informed decisions."],
    note: "More than accounting — financial insight to support your business ambitions.",
    cta: "Explore Virtual Finance Director Services", href: "/virtual-finance-director",
  },
  {
    id: "landlords", name: "Landlords & Property Income", title: "Personal Tax Support for Landlords",
    paragraphs: ["Managing rental income comes with specific tax reporting responsibilities.", "We assist landlords and individuals receiving property income with Self-Assessment tax returns, reviewing relevant income and allowable expenses, and understanding their HMRC reporting obligations.", "Whether you own a single rental property or receive income from multiple properties, we help make your personal tax reporting more straightforward."],
    note: "Starting price from £150 plus VAT",
    cta: "Explore Self-Assessment Services", href: "/self-assessment-tax-returns",
  },
];

export function WhoWeHelpPage() {
  return <>
    <section className="who-hero">
      <div className="page-shell">
        <div className="breadcrumb"><a href="/">Home</a><span>→</span><span>Who We Help</span></div>
        <div className="who-hero-grid">
          <div><div className="eyebrow light"><span /> Who We Help</div><h1>Accounting Solutions Tailored to You and Your Business</h1></div>
          <div className="who-hero-copy"><p>Every business is different, and so are its financial needs. At Accountant Services, we provide professional accounting, bookkeeping, tax and financial advisory services tailored to individuals, entrepreneurs and businesses across the UK.</p><p>Whether you&apos;re just starting out, managing an established company or planning your next stage of growth, we&apos;re here to simplify your financial responsibilities and provide the support you need to move forward with confidence.</p><p className="who-hero-note">From everyday accounting to strategic financial guidance, we&apos;re here to support your business at every stage.</p></div>
        </div>
      </div>
    </section>
    <section className="who-content section-space"><div className="page-shell who-layout">
      <aside className="who-index"><div className="eyebrow"><span /> Who We Help</div><nav aria-label="Who we help sections">{audiences.map((audience, index) => <SectionLink key={audience.id} targetId={audience.id}><span>0{index + 1}</span>{audience.name}</SectionLink>)}</nav></aside>
      <div className="who-sections">{audiences.map((audience, index) => <section key={audience.id} id={audience.id} className={`who-card${audience.id === "growing-businesses" ? " who-card-featured" : ""}`}>
        <div className="who-card-label"><span>0{index + 1}</span><p>{audience.name}</p></div>
        <h2>{audience.title}</h2>
        {audience.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {audience.note && <p className="who-card-note">{audience.note}</p>}
        <a className={`button ${audience.id === "growing-businesses" ? "button-accent" : "button-primary"}`} href={audience.href}>{audience.cta} <UpRightArrow /></a>
      </section>)}</div>
    </div></section>
    <section className="who-close section-space"><div className="page-shell"><div className="eyebrow"><span /> Accounting Support at Every Stage of Your Journey</div><h2>Let&apos;s Find the Right Solution for You</h2><a className="button button-primary" href="/contact#quotation">Request a Quote <UpRightArrow /></a></div></section>
  </>;
}
