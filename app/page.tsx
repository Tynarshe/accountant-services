import type { Metadata } from "next";
import { QuotationForm } from "./components/interactive";
import { SiteShell } from "./components/site-shell";
import { articles, visibleServices } from "./lib/services";

export const metadata: Metadata = {
  title: "Accounting support, shaped around your business",
  description: "Tailored business plans, book keeping, dormant company filing and company secretarial support for UK businesses.",
};

const serviceGlyphs = ["01", "02", "03", "04"];
const homepageServices = visibleServices.filter(
  (service) => service.slug === "business-plan" || service.slug === "book-keeping",
);

export default function Home() {
  return (
    <SiteShell>
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="page-shell hero-grid">
          <div className="hero-copy reveal-up">
            <div className="eyebrow light"><span /> Focused support. Clear next steps.</div>
            <h1>Accounting support,<br /><em>shaped around you.</em></h1>
            <p className="hero-lede">Focused accounting and company services, combined around the needs of your business—not a one-size-fits-all package.</p>
            <div className="hero-buttons">
              <a className="button button-accent" href="#quotation">Get a tailored quotation <span>↗</span></a>
              <a className="text-link light-link" href="#services">Explore our services <span>↓</span></a>
            </div>
            <div className="trust-row">
              <div><strong>4.9</strong><span className="stars" aria-label="Five star rating">★★★★★</span><small>Client rating</small></div>
              <div><strong>Clear</strong><small>Quotation before work starts</small></div>
              <div><strong>Tailored</strong><small>Support shaped around your business</small></div>
            </div>
          </div>

          <div className="hero-visual reveal-up delay-one" aria-label="Tailored Accountant Services quotation preview">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="dashboard-card quote-preview-card">
              <div className="dashboard-top">
                <div><span className="status-dot" /> Your quotation</div>
                <span className="quote-preview-status">Tailored</span>
              </div>
              <div className="dashboard-heading">
                <span>Selected support</span>
                <strong>Built around your priorities</strong>
                <small>Choose one service or combine several</small>
              </div>
              <div className="dashboard-list">
                <div><span className="list-icon done">✓</span><p><strong>Book Keeping</strong><small>Monthly clarity</small></p><span>01</span></div>
                <div><span className="list-icon active">✓</span><p><strong>Business Plan</strong><small>Numbers-backed direction</small></p><span>02</span></div>
                <div><span className="list-icon">+</span><p><strong>Add another service</strong><small>Make the scope your own</small></p><span>↗</span></div>
              </div>
              <div className="expert-chip">
                <span className="avatar">AS</span>
                <p><strong>Reviewed by our team</strong><small>A clear response, without the hard sell</small></p>
              </div>
            </div>
            <div className="floating-badge badge-one"><span>+</span><p><strong>Flexible support</strong><small>A growing service range</small></p></div>
            <div className="floating-badge badge-two"><span>✓</span><p><strong>No obligation</strong><small>Start with a quotation</small></p></div>
          </div>
        </div>
      </section>

      <section className="credibility-strip">
        <div className="page-shell credibility-inner">
          <p>Professional support for UK businesses</p>
          <div className="credibility-marquee" aria-label="Professional business support credentials">
            <div className="credibility-track">
              <div className="credibility-group">
                <span className="wordmark">COMPANIES HOUSE</span><span className="wordmark hmrc">HM Revenue<br />& Customs</span><span className="wordmark ico">UK<br /><small>BUSINESS</small></span><span className="wordmark secure">Clear scope · Secure contact</span>
              </div>
              <div className="credibility-group" aria-hidden="true">
                <span className="wordmark">COMPANIES HOUSE</span><span className="wordmark hmrc">HM Revenue<br />& Customs</span><span className="wordmark ico">UK<br /><small>BUSINESS</small></span><span className="wordmark secure">Clear scope · Secure contact</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-space" id="services">
        <div className="page-shell">
          <div className="section-heading split-heading">
            <div><div className="eyebrow"><span /> Our focused services</div><h2>Exactly what you need.<br />Nothing you don’t.</h2></div>
            <p>Choose a single service or combine several. We’ll shape the scope and quotation around your business, deadlines and priorities.</p>
          </div>
          <div className="service-showcase-grid">
            {homepageServices.map((service, index) => (
              <a className="service-showcase-card" href={`/${service.slug}`} key={service.slug}>
                <div className="service-card-top"><span>{serviceGlyphs[index]}</span><i>{service.category}</i></div>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <ul>{service.includes.map((item) => <li key={item}>✓ {item}</li>)}</ul>
                <div><span>{service.price}</span><strong>View service <i>↗</i></strong></div>
              </a>
            ))}
          </div>
          <a className="service-discovery" href="/additional-services" aria-label="Explore more Accountant Services">
            <span className="service-discovery-mark">+</span>
            <span className="service-discovery-copy">
              <small>A growing range of support</small>
              <strong>There’s more behind the shortlist.</strong>
              <em>Explore every service currently available—and check back as we grow.</em>
            </span>
            <span className="service-discovery-action">Explore more services <i>↗</i></span>
          </a>
        </div>
      </section>

      <section className="quotation-section section-space" id="quotation">
        <div className="page-shell quotation-layout">
          <div className="quotation-intro">
            <div className="eyebrow light"><span /> Your tailored quotation</div>
            <h2>Tell us what would make business feel easier.</h2>
            <p>Choose the services that fit, add the context that matters and prepare a clear request for our team.</p>
            <ol>
              <li><span>01</span><div><strong>Select your support</strong><p>Choose one service or build a combined package.</p></div></li>
              <li><span>02</span><div><strong>Share the essentials</strong><p>Tell us about your business, priorities and timing.</p></div></li>
              <li><span>03</span><div><strong>Receive a clear response</strong><p>We’ll review the request and respond with the right next step.</p></div></li>
            </ol>
          </div>
          <div className="quotation-card">
            <div className="quotation-card-head"><span>Quotation request</span><strong>No obligation</strong></div>
            <QuotationForm />
          </div>
        </div>
      </section>

      <section className="difference-section section-space">
        <div className="page-shell difference-grid">
          <div className="difference-visual">
            <div className="quote-mark">“</div>
            <blockquote>It felt less like filling in forms and more like having someone capable quietly take care of everything.</blockquote>
            <div className="quote-author"><span>ND</span><p><strong>Natalie D.</strong><small>Founder, Reading</small></p></div>
          </div>
          <div className="difference-copy">
            <div className="eyebrow"><span /> Why Accountant Services</div>
            <h2>Professional rigour.<br /><em>Personal scope.</em></h2>
            <p className="large-copy">You get the structure of a professional service with the flexibility to choose what your business actually needs.</p>
            <div className="benefit-list">
              <div><span>01</span><div><h3>A focused starting point</h3><p>Clearly defined services make it easier to understand where we can add value.</p></div></div>
              <div><span>02</span><div><h3>A quotation built around you</h3><p>Scope, timing and support are shaped around your circumstances before work begins.</p></div></div>
              <div><span>03</span><div><h3>A real person when it matters</h3><p>Talk through questions with a UK-based team that understands business responsibilities.</p></div></div>
            </div>
            <a className="button button-dark" href="#quotation">Build your quotation <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="process-section section-space">
        <div className="page-shell">
          <div className="section-heading centered-heading"><div className="eyebrow"><span /> A simple way forward</div><h2>From “What do I need?” to a clear plan.</h2><p>Start with a focused request. We’ll help shape the right scope from there.</p></div>
          <div className="process-line">
            <div className="process-step"><span>1</span><div className="process-icon">✓</div><h3>Choose your services</h3><p>Select one or more areas where your business needs support.</p></div>
            <div className="process-step"><span>2</span><div className="process-icon">✎</div><h3>Add your context</h3><p>Share the priorities, deadlines and outcomes that matter to you.</p></div>
            <div className="process-step"><span>3</span><div className="process-icon">→</div><h3>Receive the next step</h3><p>Our team reviews your request and responds with a tailored route forward.</p></div>
          </div>
          <div className="process-cta"><a className="button button-primary" href="#quotation">Request a quotation <span>↗</span></a><p>Prefer to talk? <a href="tel:01182077207">Call 0118 207 7207 →</a></p></div>
        </div>
      </section>

      <section className="insights-section section-space">
        <div className="page-shell">
          <div className="section-heading split-heading compact"><div><div className="eyebrow light"><span /> Useful thinking</div><h2>Clear guidance for<br />better business decisions.</h2></div><a className="text-link light-link" href="/blog">Visit the Blog <span>→</span></a></div>
          <div className="article-grid">
            {articles.slice(0, 3).map((article, index) => (
              <a href={`/${article.slug}`} className="article-card" key={article.slug}>
                <div className={`article-art article-art-${index + 1}`}><span>{index === 0 ? "31" : index === 1 ? "↗" : "£"}</span></div>
                <div className="article-meta"><span>{article.category}</span><time>{article.date}</time></div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <strong>Read in 4 minutes <span>→</span></strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <div><div className="eyebrow light"><span /> Ready when you are</div><h2>Let’s shape the right<br />support for your business.</h2></div>
          <div><p>Choose the services you need and tell us what matters. We’ll help turn it into a clear next step.</p><div><a className="button button-accent" href="#quotation">Get a tailored quotation <span>↗</span></a><a className="text-link light-link" href="tel:01182077207">Call 0118 207 7207 <span>→</span></a></div></div>
        </div>
      </section>
    </SiteShell>
  );
}
