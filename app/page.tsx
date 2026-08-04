import type { Metadata } from "next";
import { QuotationForm } from "./components/interactive";
import { SiteShell } from "./components/site-shell";
import { articles, visibleServices } from "./lib/services";

export const metadata: Metadata = {
  title: "Clearer numbers. Stronger decisions",
  description: "Practical accounting and company support that helps UK businesses stay organised, plan ahead and make decisions with confidence.",
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
            <div className="eyebrow light"><span /> Practical support for UK businesses</div>
            <h1>Clearer numbers.<br /><em>Stronger decisions.</em></h1>
            <p className="hero-lede">Accounting and company support tailored to the way you work—so you can stay organised, plan ahead and move forward with confidence.</p>
            <div className="hero-buttons">
              <a className="button button-accent" href="#quotation">Request your quotation <span>↗</span></a>
              <a className="text-link light-link" href="#services">See how we can help <span>↓</span></a>
            </div>
            <div className="trust-row">
              <div><strong>4.9</strong><span className="stars" aria-label="Five star rating">★★★★★</span><small>Client rating</small></div>
              <div><strong>Clear</strong><small>Scope and fees agreed first</small></div>
              <div><strong>Tailored</strong><small>Built around your priorities</small></div>
            </div>
          </div>

          <div className="hero-visual reveal-up delay-one" aria-label="Tailored Accountant Services quotation preview">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="dashboard-card quote-preview-card">
              <div className="dashboard-top">
                <div><span className="status-dot" /> Your support plan</div>
                <span className="quote-preview-status">Tailored</span>
              </div>
              <div className="dashboard-heading">
                <span>A clear scope</span>
                <strong>Built for your business</strong>
                <small>Select only the support you need</small>
              </div>
              <div className="dashboard-list">
                <div><span className="list-icon done">✓</span><p><strong>Book Keeping</strong><small>Reliable monthly records</small></p><span>01</span></div>
                <div><span className="list-icon active">✓</span><p><strong>Business Plan</strong><small>Direction backed by numbers</small></p><span>02</span></div>
                <div><span className="list-icon">+</span><p><strong>Add another service</strong><small>Build a joined-up package</small></p><span>↗</span></div>
              </div>
              <div className="expert-chip">
                <span className="avatar">AS</span>
                <p><strong>Reviewed by our team</strong><small>Practical advice, clearly explained</small></p>
              </div>
            </div>
            <div className="floating-badge badge-one"><span>+</span><p><strong>Room to grow</strong><small>Support that scales with you</small></p></div>
            <div className="floating-badge badge-two"><span>✓</span><p><strong>Clear from day one</strong><small>No-obligation quotation</small></p></div>
          </div>
        </div>
      </section>

      <section className="credibility-strip">
        <div className="page-shell credibility-inner">
          <p>Built for the way UK businesses work</p>
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
            <div><div className="eyebrow"><span /> Featured services</div><h2>The right support,<br />at the right stage.</h2></div>
            <p>Start with one priority or combine services into a joined-up package. We’ll agree the scope, timing and fee before work begins.</p>
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
              <small>More ways to support your business</small>
              <strong>Your needs may not fit into two boxes.</strong>
              <em>Explore our current services, or tell us what you need and we’ll point you in the right direction.</em>
            </span>
            <span className="service-discovery-action">See all services <i>↗</i></span>
          </a>
        </div>
      </section>

      <section className="quotation-section section-space" id="quotation">
        <div className="page-shell quotation-layout">
          <div className="quotation-intro">
            <div className="eyebrow light"><span /> A quotation built around you</div>
            <h2>Start with what your business needs now.</h2>
            <p>Tell us where you are, what needs attention and when. We’ll come back with a practical scope—clear, relevant and without obligation.</p>
            <ol>
              <li><span>01</span><div><strong>Choose what applies</strong><p>Select one service, several, or “not sure yet”.</p></div></li>
              <li><span>02</span><div><strong>Give us the useful detail</strong><p>Share your goals, deadlines and current position.</p></div></li>
              <li><span>03</span><div><strong>Get a considered response</strong><p>Our team reviews your request and explains the next step.</p></div></li>
            </ol>
          </div>
          <div className="quotation-card">
            <div className="quotation-card-head"><span>Tell us what you need</span><strong>No obligation</strong></div>
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
            <div className="eyebrow"><span /> Why businesses choose us</div>
            <h2>Serious about detail.<br /><em>Easy to work with.</em></h2>
            <p className="large-copy">Good accounting support should bring clarity, not more complexity. We keep the process straightforward and the advice grounded in your business.</p>
            <div className="benefit-list">
              <div><span>01</span><div><h3>Clear from the outset</h3><p>You know what we’ll do, what we need from you and what comes next.</p></div></div>
              <div><span>02</span><div><h3>Built around the business</h3><p>We shape the work around your priorities, timing and preferred level of support.</p></div></div>
              <div><span>03</span><div><h3>People, not just processes</h3><p>When a question needs judgement, you can speak to a UK-based team that understands the context.</p></div></div>
            </div>
            <a className="button button-dark" href="#quotation">Tell us what you need <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="process-section section-space">
        <div className="page-shell">
          <div className="section-heading centered-heading"><div className="eyebrow"><span /> How it works</div><h2>A straightforward route to the right support.</h2><p>No jargon-heavy sales process. Just a few useful details and a clear response.</p></div>
          <div className="process-line">
            <div className="process-step"><span>1</span><div className="process-icon">✓</div><h3>Choose a starting point</h3><p>Pick any relevant service—or choose “not sure yet”.</p></div>
            <div className="process-step"><span>2</span><div className="process-icon">✎</div><h3>Tell us what matters</h3><p>Share the outcome, deadline and background we should understand.</p></div>
            <div className="process-step"><span>3</span><div className="process-icon">→</div><h3>We shape the scope</h3><p>We review the detail and come back with a clear recommendation and quotation.</p></div>
          </div>
          <div className="process-cta"><a className="button button-primary" href="#quotation">Start your request <span>↗</span></a><p>Prefer to talk? <a href="tel:01182077207">Call 0118 207 7207 →</a></p></div>
        </div>
      </section>

      <section className="insights-section section-space">
        <div className="page-shell">
          <div className="section-heading split-heading compact"><div><div className="eyebrow light"><span /> Practical guidance</div><h2>Useful answers for<br />the decisions ahead.</h2></div><a className="text-link light-link" href="/blog">Visit the Blog <span>→</span></a></div>
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
          <div><div className="eyebrow light"><span /> Let’s make it clearer</div><h2><span>Bring us the question.</span><span>We’ll help define</span><span>the next step.</span></h2></div>
          <div><p>Whether you know exactly what you need or simply know something needs attention, start with a short request.</p><div><a className="button button-accent" href="#quotation">Request a tailored quotation <span>↗</span></a><a className="text-link light-link" href="tel:01182077207">Call 0118 207 7207 <span>→</span></a></div></div>
        </div>
      </section>
    </SiteShell>
  );
}
