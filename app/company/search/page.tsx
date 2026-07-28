import type { Metadata } from "next";
import { CompanySearch } from "../../components/interactive";
import { SiteShell } from "../../components/site-shell";
import { lookupCompany } from "../../lib/company-lookup";

export const metadata: Metadata = {
  title: "Company name search",
  description: "Search Companies House or check whether a UK company name may be available to register.",
};

type PageProps = {
  searchParams: Promise<{ company?: string | string[] }>;
};

export default async function CompanySearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawCompany = Array.isArray(params.company) ? params.company[0] : params.company || "";
  const result = await lookupCompany(rawCompany);

  return (
    <SiteShell>
      <section className="company-result-hero">
        <div className="result-orb result-orb-one" />
        <div className="result-orb result-orb-two" />
        <div className="page-shell">
          <div className="breadcrumb"><a href="/">Home</a><span>→</span><span>Company search</span></div>
          <div className="result-heading reveal-up">
            <div className="eyebrow light"><span /> Companies House search</div>
            <h1>Find the name.<br /><em>Make the next move.</em></h1>
            <p>We’ll check the public register and keep you inside one clear journey—whether the company already exists or the name is ready to register.</p>
          </div>
        </div>
      </section>

      <section className="company-result-page section-space">
        <div className="page-shell result-shell reveal-up delay-one">
          {result.state === "empty" && (
            <div className="result-panel result-empty">
              <span className="result-icon">⌕</span>
              <h2>Search for a company</h2>
              <p>Enter a company name to find an existing business or check whether the name may be available to register.</p>
              <CompanySearch />
            </div>
          )}

          {result.state === "available" && (
            <div className="result-panel availability-card">
              <span className="result-icon success">✓</span>
              <p className="result-kicker">Congratulations</p>
              <h2>{result.query.toUpperCase()}</h2>
              <p className="result-lede">This name appears to be available to register today.</p>
              <div className="result-action-row">
                <a className="button button-primary" href="/">Search another name <span>→</span></a>
              </div>
              <small>Availability is based on the current Companies House search and remains subject to its final approval.</small>
            </div>
          )}

          {result.state === "registered" && (
            <>
              <div className="registered-notice">
                <span>i</span>
                <div><strong>The name {result.query.toUpperCase()} is registered at Companies House</strong><p>Here’s the closest live match from the public register.</p></div>
              </div>
              <div className="search-again-block">
                <p>Try a different company name</p>
                <CompanySearch />
              </div>
              <article className="company-result-card">
                <div className="company-card-head">
                  <div><p className="result-kicker">Companies House result</p><h2>{result.company.name}</h2><p className="company-number">Company no. {result.company.number}</p></div>
                  <span className={`status-pill ${/active/i.test(result.company.status) ? "status-active" : ""}`}>{result.company.status || "Registered"}</span>
                </div>
                <dl className="result-details">
                  <div><dt>Business activity</dt><dd>{result.company.activity}</dd></div>
                  <div><dt>Next confirmation statement</dt><dd>{result.company.confirmationDue}</dd></div>
                  <div><dt>Current officer</dt><dd>{result.company.director}</dd></div>
                  <div><dt>Registered office</dt><dd>{result.company.address}</dd></div>
                </dl>
                <div className="company-card-actions">
                  <a className="button button-primary" href={`https://find-and-update.company-information.service.gov.uk/company/${encodeURIComponent(result.company.number)}`}>View full profile <span>↗</span></a>
                  <a className="text-link" href="/">Search another company <span>→</span></a>
                </div>
              </article>
            </>
          )}

          {result.state === "error" && (
            <div className="result-panel result-empty">
              <span className="result-icon warning">!</span>
              <h2>We couldn’t complete that check</h2>
              <p>Companies House did not return a result just now. Please try the search again.</p>
              <CompanySearch />
            </div>
          )}

          <p className="companies-house-note">Company information is supplied from the public Companies House register.</p>
        </div>
      </section>
    </SiteShell>
  );
}
