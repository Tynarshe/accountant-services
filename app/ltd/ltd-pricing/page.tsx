import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/site-shell";

export const metadata: Metadata = {
  title: "Company formation packages",
  description: "Choose a clear, expert-backed UK limited company formation package.",
};

type PageProps = {
  searchParams: Promise<{ company?: string | string[] }>;
};

const packages = [
  {
    name: "Standard",
    price: "£56.99",
    description: "The essentials for a clean, confident company formation.",
    features: ["Companies House £50 registration fee", "PSC registration", "Official digital company documents", "Expert application review"],
    featured: false,
  },
  {
    name: "Premium",
    price: "£125.99",
    description: "Formation plus the practical registrations and privacy support new founders often need.",
    features: ["Everything in Standard", "VAT registration support", "Registered office privacy service", "Priority expert review"],
    featured: true,
  },
];

export default async function PricingPage({ searchParams }: PageProps) {
  notFound();
  const params = await searchParams;
  const rawCompany = Array.isArray(params.company) ? params.company[0] : params.company || "Your new company";
  const company = rawCompany.trim().slice(0, 160) || "Your new company";

  return (
    <SiteShell>
      <section className="pricing-hero">
        <div className="page-shell">
          <div className="breadcrumb"><a href="/">Home</a><span>→</span><a href={`/company/search?company=${encodeURIComponent(company)}`}>Name search</a><span>→</span><span>Formation packages</span></div>
          <ol className="flow-progress flow-progress-dark" aria-label="Company formation progress">
            {["Search name", "Select formation package", "Submit order", "Company details"].map((step, index) => <li className={index < 2 ? "is-active" : ""} key={step}><span>{index === 0 ? "✓" : index + 1}</span><small>{step}</small></li>)}
          </ol>
          <div className="pricing-heading reveal-up">
            <div className="eyebrow light"><span /> Your company name</div>
            <h1>{company.toUpperCase()}</h1>
            <p>Choose the level of support that suits your business. Both options include the statutory formation fee and a careful expert review.</p>
          </div>
        </div>
      </section>

      <section className="pricing-section section-space">
        <div className="page-shell">
          <div className="pricing-intro">
            <div><div className="eyebrow"><span /> Simple, transparent choices</div><h2>Choose your formation package.</h2></div>
            <p>No hidden statutory fee. No confusing checklist. Just two clear routes to a correctly formed company.</p>
          </div>
          <div className="pricing-grid">
            {packages.map((formationPackage, index) => (
              <article className={`pricing-card reveal-up ${formationPackage.featured ? "featured delay-one" : ""}`} key={formationPackage.name}>
                {formationPackage.featured && <span className="package-badge">Most complete</span>}
                <p className="package-index">0{index + 1} / {formationPackage.name}</p>
                <h3>{formationPackage.name}</h3>
                <p className="package-description">{formationPackage.description}</p>
                <div className="package-price"><strong>{formationPackage.price}</strong><span>+ VAT<br />one-off</span></div>
                <ul className="package-features">{formationPackage.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}</ul>
                <a className={`button full-button ${formationPackage.featured ? "button-accent" : "button-primary"}`} href={`/contact?service=${formationPackage.name.toLowerCase()}-company-formation&company=${encodeURIComponent(company)}`}>Select {formationPackage.name} <span>↗︎</span></a>
              </article>
            ))}
          </div>
          <div className="pricing-support"><span>?</span><div><strong>Not sure which package fits?</strong><p>Call 0118 207 7207 and we’ll talk through the difference in plain English.</p></div><a className="text-link" href="tel:01182077207">Speak to the team <span>→</span></a></div>
        </div>
      </section>
    </SiteShell>
  );
}
