import type { Metadata } from "next";
import { CompanySearch } from "./components/interactive";
import { SiteShell } from "./components/site-shell";
import { articles, categories, services } from "./lib/services";

export const metadata: Metadata = {
  title: "Business, made brilliantly simple",
  description: "Start, run and grow your UK business with expert-backed online filings and human support.",
};

const featured = ["ltd", "confirmationstatement", "vatregistration", "book-keeping"];

export default function Home() {
  return (
    <SiteShell>
      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="page-shell hero-grid">
          <div className="hero-copy reveal-up">
            <div className="eyebrow light"><span /> Expert-backed. Human-hearted.</div>
            <h1>Business, made<br /><em>brilliantly simple.</em></h1>
            <p className="hero-lede">Start, run and grow your UK business with calm, capable support—online when you want it, human when you need it.</p>
            <CompanySearch />
            <div className="hero-buttons">
              <a className="button button-accent" href="/#services">Find your service <span>↓</span></a>
              <a className="text-link light-link" href="/contact">Talk to a specialist <span>↗</span></a>
            </div>
            <div className="trust-row">
              <div><strong>4.9</strong><span className="stars">★★★★★</span><small>Client rating</small></div>
              <div><strong>15 min</strong><small>Average online form</small></div>
              <div><strong>UK-based</strong><small>Expert support team</small></div>
            </div>
          </div>
          <div className="hero-visual reveal-up delay-one" aria-label="Accountant Services filing dashboard preview">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="dashboard-card">
              <div className="dashboard-top">
                <div><span className="status-dot" /> Your business</div>
                <button aria-label="Open dashboard options">•••</button>
              </div>
              <div className="dashboard-heading">
                <span>Next filing</span>
                <strong>Confirmation statement</strong>
                <small>Due in 28 days</small>
              </div>
              <div className="progress-track"><span /></div>
              <div className="dashboard-list">
                <div><span className="list-icon done">✓</span><p><strong>Company formed</strong><small>Complete</small></p><span>↗</span></div>
                <div><span className="list-icon active">02</span><p><strong>VAT registration</strong><small>Expert review</small></p><span>↗</span></div>
                <div><span className="list-icon">03</span><p><strong>Annual accounts</strong><small>Not started</small></p><span>↗</span></div>
              </div>
              <div className="expert-chip">
                <span className="avatar">AS</span>
                <p><strong>Your expert is checking it</strong><small>We’ll update you shortly</small></p>
              </div>
            </div>
            <div className="floating-badge badge-one"><span>✓</span><p><strong>Filed successfully</strong><small>Companies House</small></p></div>
            <div className="floating-badge badge-two"><span>24h</span><p><strong>Fast turnaround</strong><small>On formation services</small></p></div>
          </div>
        </div>
      </section>

      <section className="credibility-strip">
        <div className="page-shell credibility-inner">
          <p>Recognised and trusted by</p>
          <div><span className="wordmark">COMPANIES HOUSE</span><span className="wordmark hmrc">HM Revenue<br />& Customs</span><span className="wordmark ico">ICO<br /><small>REGISTERED</small></span><span className="wordmark secure">Secure payments · SSL</span></div>
        </div>
      </section>

      <section className="services-section section-space" id="services">
        <div className="page-shell">
          <div className="section-heading split-heading">
            <div><div className="eyebrow"><span /> What do you need?</div><h2>One expert team.<br />Every business chapter.</h2></div>
            <p>Whether you’re forming a company, filing a return or planning what’s next, start with the outcome you need.</p>
          </div>
          <div className="category-grid">
            {categories.map((category, index) => {
              const categoryServices = services.filter((service) => service.category === category.name).slice(0, 4);
              return (
                <article className={`category-card category-${index + 1}`} key={category.name}>
                  <div className="category-number">0{index + 1}</div>
                  <p className="category-eyebrow">{category.eyebrow}</p>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <div className="category-links">
                    {categoryServices.map((service) => <a key={service.slug} href={`/${service.slug}`}>{service.title}<span>↗</span></a>)}
                  </div>
                  <a className="text-link" href="/additional-services">Explore {category.name.toLowerCase()} services <span>→</span></a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="difference-section section-space">
        <div className="page-shell difference-grid">
          <div className="difference-visual">
            <div className="quote-mark">“</div>
            <blockquote>It felt less like filling in forms and more like having someone capable quietly take care of everything.</blockquote>
            <div className="quote-author"><span>ND</span><p><strong>Natalie D.</strong><small>Founder, Reading</small></p></div>
            <div className="mini-stat"><strong>96%</strong><span>of customers say<br />we made it feel easier</span></div>
          </div>
          <div className="difference-copy">
            <div className="eyebrow"><span /> The Accountant Services difference</div>
            <h2>Digital speed.<br /><em>Human judgement.</em></h2>
            <p className="large-copy">Good technology should remove admin, not the people who make it feel simple.</p>
            <div className="benefit-list">
              <div><span>01</span><div><h3>Start online, finish with confidence</h3><p>Short, guided forms with an expert checking the details before anything is filed.</p></div></div>
              <div><span>02</span><div><h3>Clear fees, clearly explained</h3><p>Know what’s included before you begin. No cryptic language and no surprise extras.</p></div></div>
              <div><span>03</span><div><h3>A real person when it matters</h3><p>Our UK-based specialists are available when your question needs more than a help article.</p></div></div>
            </div>
            <a className="button button-dark" href="/contact">Meet your support team <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="process-section section-space">
        <div className="page-shell">
          <div className="section-heading centered-heading"><div className="eyebrow"><span /> How it works</div><h2>From “I need to…” to “It’s done.”</h2><p>A clear three-step process, designed to keep momentum on your side.</p></div>
          <div className="process-line">
            <div className="process-step"><span>1</span><div className="process-icon">⌕</div><h3>Choose your outcome</h3><p>Pick the filing, registration or support your business needs.</p></div>
            <div className="process-step"><span>2</span><div className="process-icon">✎</div><h3>Tell us the essentials</h3><p>Complete a focused online form in around 15 minutes.</p></div>
            <div className="process-step"><span>3</span><div className="process-icon">✓</div><h3>We check and file</h3><p>An expert reviews the details, submits and keeps you updated.</p></div>
          </div>
          <div className="process-cta"><a className="button button-primary" href="/ltd">Start with company formation <span>↗</span></a><p>Not sure where to begin? <a href="/contact">Ask us →</a></p></div>
        </div>
      </section>

      <section className="popular-section section-space">
        <div className="page-shell">
          <div className="section-heading split-heading compact"><div><div className="eyebrow"><span /> Popular right now</div><h2>Start with what matters today.</h2></div><a className="text-link" href="/additional-services">See every service <span>→</span></a></div>
          <div className="popular-grid">
            {services.filter((service) => featured.includes(service.slug)).map((service, index) => (
              <a className="popular-card" href={`/${service.slug}`} key={service.slug}>
                <span className="popular-index">0{index + 1}</span>
                <span className={`service-glyph glyph-${index + 1}`}>{index === 0 ? "A+" : index === 1 ? "✓" : index === 2 ? "%" : "£"}</span>
                <h3>{service.title}</h3>
                <p>{service.short}</p>
                <div><span>{service.price}</span><strong>Explore <i>↗</i></strong></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="insights-section section-space">
        <div className="page-shell">
          <div className="section-heading split-heading compact"><div><div className="eyebrow light"><span /> Useful, not overwhelming</div><h2>Fresh thinking for<br />people building businesses.</h2></div><a className="text-link light-link" href="/blog">Browse all insights <span>→</span></a></div>
          <div className="article-grid">
            {articles.map((article, index) => (
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
          <div><div className="eyebrow light"><span /> Ready when you are</div><h2>Your next business move<br />starts right here.</h2></div>
          <div><p>Choose a service and get started online, or talk it through with one of our specialists.</p><div><a className="button button-accent" href="/additional-services">Explore services <span>↗</span></a><a className="text-link light-link" href="tel:01182077207">Call 0118 207 7207 <span>→</span></a></div></div>
        </div>
      </section>
    </SiteShell>
  );
}
