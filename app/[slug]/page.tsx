import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "../components/interactive";
import { SiteShell } from "../components/site-shell";
import { articles, categories, serviceBySlug, services } from "../lib/services";

type PageProps = { params: Promise<{ slug: string }> };

const utilityPages: Record<string, { title: string; description: string }> = {
  "additional-services": {
    title: "Services for every business chapter",
    description: "Explore the complete range of company formation, filing, change and ongoing finance services.",
  },
  contact: {
    title: "Let’s make the next step clearer",
    description: "Tell us what you’re working through and a UK-based specialist will point you in the right direction.",
  },
  blog: {
    title: "Useful thinking for busy business owners",
    description: "Plain-English guides, timely reminders and practical ideas for starting and running a UK business.",
  },
  shop: {
    title: "Choose a service and get moving",
    description: "The most popular filings and registrations, with clear scope and expert support included.",
  },
  "privacy-policy": {
    title: "Privacy policy",
    description: "How Accountant Services respects, protects and handles personal information.",
  },
  "terms-conditions": {
    title: "Terms & conditions",
    description: "The terms that apply when you use our website and purchase our services.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  const article = articles.find((item) => item.slug === slug);
  const utility = utilityPages[slug];

  if (service) return { title: service.title, description: service.description };
  if (article) return { title: article.title, description: article.excerpt };
  if (utility) return { title: utility.title, description: utility.description };
  return {};
}

function Breadcrumb({ current }: { current: string }) {
  return <div className="breadcrumb"><a href="/">Home</a><span>→</span><span>{current}</span></div>;
}

function ServicePage({ slug }: { slug: string }) {
  const service = serviceBySlug[slug];
  const related = services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="inner-hero service-hero">
        <div className="inner-orb" />
        <div className="page-shell">
          <Breadcrumb current={service.title} />
          <div className="service-hero-grid">
            <div className="inner-hero-copy reveal-up">
              <div className="eyebrow light"><span /> {service.category} your business</div>
              <h1>{service.title}</h1>
              <p>{service.description}</p>
              <div className="hero-buttons"><a className="button button-accent" href="#get-started">Get started <span>↗</span></a><a className="text-link light-link" href="/contact">Ask a question <span>→</span></a></div>
              <div className="micro-trust"><span>✓ Expert checked</span><span>✓ Secure online process</span><span>✓ UK support team</span></div>
            </div>
            <aside className="service-summary reveal-up delay-one">
              <p className="summary-label">At a glance</p>
              <div className="summary-price"><span>Service fee</span><strong>{service.price}</strong></div>
              <div className="summary-row"><span>Typical timing</span><strong>{service.time}</strong></div>
              <div className="summary-list"><span>What’s included</span>{service.includes.map((item) => <p key={item}><i>✓</i>{item}</p>)}</div>
              <a className="button button-primary full-button" href="#get-started">Start this service <span>↗</span></a>
              <small>No obligation until you review the details.</small>
            </aside>
          </div>
        </div>
      </section>

      <section className="service-content section-space">
        <div className="page-shell service-content-grid">
          <div>
            <div className="eyebrow"><span /> What to expect</div>
            <h2>A straightforward process from start to filed.</h2>
            <p className="large-copy">We combine a focused online journey with a real expert review, so the detail is right without making the process feel heavy.</p>
          </div>
          <div className="service-steps">
            <div><span>01</span><h3>Share the essentials</h3><p>Answer only the questions needed for this service. Save your progress and come back whenever you like.</p></div>
            <div><span>02</span><h3>We review every detail</h3><p>A business specialist checks the information, spots gaps and gets in touch if anything needs clarifying.</p></div>
            <div><span>03</span><h3>We submit and keep you posted</h3><p>Once approved, we handle the relevant filing and share your confirmation and documents digitally.</p></div>
          </div>
        </div>
      </section>

      <section className="included-section section-space">
        <div className="page-shell included-grid">
          <div className="included-card">
            <span className="included-icon">✓</span>
            <h2>Clarity is included.</h2>
            <p>You’ll always know what we need, what happens next and who to ask if something is unclear.</p>
            <div>{["Plain-English guidance", "Transparent scope", "Digital document delivery", "Human help when you need it"].map((item) => <span key={item}>✓ {item}</span>)}</div>
          </div>
          <div className="faq-block">
            <div className="eyebrow"><span /> Common questions</div>
            <h2>A few useful answers.</h2>
            <details open><summary>How quickly can I get started?<span>+</span></summary><p>Immediately. The online form is available whenever you are, and our team reviews new submissions during UK business hours.</p></details>
            <details><summary>Will a real person check my information?<span>+</span></summary><p>Yes. Expert review is part of the service, giving you another layer of confidence before a submission is made.</p></details>
            <details><summary>What if I am not sure this is the right service?<span>+</span></summary><p>Contact the team before you begin. We’ll ask a few simple questions and point you towards the most suitable route.</p></details>
          </div>
        </div>
      </section>

      <section className="related-section section-space" id="get-started">
        <div className="page-shell">
          <div className="start-card">
            <div><div className="eyebrow light"><span /> Ready to move?</div><h2>Let’s get {service.title.toLowerCase()} sorted.</h2><p>Start online now, or speak to a specialist if you’d like to talk it through first.</p></div>
            <div><a className="button button-accent" href="/contact">Start with an expert <span>↗</span></a><a href="tel:01182077207" className="text-link light-link">Call 0118 207 7207 <span>→</span></a></div>
          </div>
          <div className="related-head"><h2>You may also need</h2><a href="/additional-services">View all services →</a></div>
          <div className="related-grid">{related.map((item) => <a key={item.slug} href={`/${item.slug}`}><span>{item.category}</span><h3>{item.title}</h3><p>{item.short}</p><strong>Explore <i>↗</i></strong></a>)}</div>
        </div>
      </section>
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <section className="inner-hero directory-hero"><div className="inner-orb" /><div className="page-shell"><Breadcrumb current="All services" /><div className="inner-hero-copy narrow reveal-up"><div className="eyebrow light"><span /> One team, every chapter</div><h1>Support built around the outcome you need.</h1><p>Browse by business moment, then choose the service that gets you there with less friction.</p></div></div></section>
      <section className="directory section-space"><div className="page-shell">
        {categories.map((category, index) => <div className="directory-group" key={category.name}><div className="directory-heading"><span>0{index + 1}</span><div><p>{category.eyebrow}</p><h2>{category.title}</h2></div></div><div className="directory-list">{services.filter((service) => service.category === category.name).map((service) => <a href={`/${service.slug}`} key={service.slug}><div><h3>{service.title}</h3><p>{service.short}</p></div><div><span>{service.price}</span><strong>↗</strong></div></a>)}</div></div>)}
      </div></section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <section className="inner-hero contact-hero"><div className="inner-orb" /><div className="page-shell"><Breadcrumb current="Contact" /><div className="contact-hero-grid"><div className="inner-hero-copy reveal-up"><div className="eyebrow light"><span /> A real person, right this way</div><h1>Let’s make the next step clearer.</h1><p>Tell us what you’re working through. We’ll listen, simplify the options and point you in the right direction.</p><div className="contact-options"><a href="tel:01182077207"><span>Call us</span><strong>0118 207 7207 ↗</strong><small>Mon–Fri, 9am–5pm</small></a><a href="mailto:office@accountantservices.org.uk"><span>Email us</span><strong>office@accountantservices.org.uk ↗</strong><small>We usually reply within one business day</small></a></div></div><div className="contact-card reveal-up delay-one"><h2>How can we help?</h2><p>A few details will help us get you to the right specialist.</p><ContactForm /></div></div></div></section>
      <section className="visit-section section-space"><div className="page-shell visit-grid"><div><div className="eyebrow"><span /> Visit or write</div><h2>Wokingham based.<br />UK business focused.</h2><p>Building 220, Wharfedale Road, Wokingham, Berkshire, RG41 5TP</p><a className="text-link" href="https://maps.google.com/?q=Wharfedale+Road+Wokingham+RG41+5TP">Open in maps ↗</a></div><div className="map-card"><div className="map-road road-one" /><div className="map-road road-two" /><div className="map-pin"><span>A.</span><small>Accountant Services</small></div></div></div></section>
    </>
  );
}

function BlogPage() {
  return (
    <><section className="inner-hero blog-hero"><div className="inner-orb" /><div className="page-shell"><Breadcrumb current="Insights" /><div className="inner-hero-copy narrow reveal-up"><div className="eyebrow light"><span /> The useful edit</div><h1>Clear thinking for busy business owners.</h1><p>Practical guides and timely reminders, written to help you decide and move—not to add to the reading pile.</p></div></div></section><section className="blog-listing section-space"><div className="page-shell"><div className="blog-feature"><div className="feature-art"><span>31</span><small>YEAR<br />END</small></div><div><span className="article-pill">Featured guide</span><h2>{articles[0].title}</h2><p>{articles[0].excerpt} A practical, plain-English guide to getting organised and keeping the process moving.</p><a className="button button-dark" href={`/${articles[0].slug}`}>Read the guide <span>↗</span></a></div></div><div className="article-grid light-articles">{articles.map((article, index) => <a href={`/${article.slug}`} className="article-card" key={article.slug}><div className={`article-art article-art-${index + 1}`}><span>{index === 0 ? "31" : index === 1 ? "↗" : "£"}</span></div><div className="article-meta"><span>{article.category}</span><time>{article.date}</time></div><h3>{article.title}</h3><p>{article.excerpt}</p><strong>Read in 4 minutes <span>→</span></strong></a>)}</div></div></section></>
  );
}

function ArticlePage({ slug }: { slug: string }) {
  const article = articles.find((item) => item.slug === slug)!;
  return (
    <><section className="article-hero"><div className="page-shell"><Breadcrumb current="Insights" /><div className="article-title"><span className="article-pill">{article.category}</span><h1>{article.title}</h1><p>{article.excerpt}</p><div><time>{article.date}</time><span>4 minute read</span></div></div></div></section><article className="article-body page-shell"><p className="lead">Running a business is easier when you know what is coming and what good preparation looks like.</p><h2>Start with a clean picture</h2><p>Bring your records, key dates and open questions together in one place. A short, organised review now can prevent a lot of back-and-forth later.</p><blockquote>Clarity is not about doing everything at once. It is about knowing the next right thing to do.</blockquote><h2>Turn the deadline into a plan</h2><p>Work backwards from the date that matters. Leave time for missing information, review and any questions that need an expert answer. The strongest process is usually the calmest one.</p><ul><li>Confirm the period and filing deadline.</li><li>Reconcile the core financial records.</li><li>Collect explanations for anything unusual.</li><li>Ask for help early if something is unclear.</li></ul><h2>Keep the next year easier</h2><p>Once the work is complete, note what slowed the process down. Small changes to bookkeeping, document storage or monthly reviews can make next year significantly smoother.</p><div className="article-cta"><h3>Want a capable pair of hands?</h3><p>Tell us what you need to file and we’ll help make the route forward clear.</p><a className="button button-primary" href="/contact">Talk to a specialist <span>↗</span></a></div></article></>
  );
}

function LegalPage({ slug }: { slug: string }) {
  const page = utilityPages[slug];
  return <><section className="simple-hero"><div className="page-shell"><Breadcrumb current={page.title} /><h1>{page.title}</h1><p>{page.description}</p></div></section><section className="legal-content page-shell"><p className="updated">Last updated: 22 July 2026</p><h2>Our approach</h2><p>We aim to be transparent, careful and clear about how this website and our services operate. Information is handled only for legitimate business purposes and with appropriate safeguards.</p><h2>Information and communication</h2><p>When you contact us or purchase a service, we may need the information required to respond, provide the requested work and meet legal or regulatory obligations. We do not sell personal information.</p><h2>Your choices</h2><p>You can ask questions about information connected with you, request corrections where appropriate and manage optional marketing communication at any time.</p><h2>Contact</h2><p>For questions about these terms or privacy, email <a href="mailto:office@accountantservices.org.uk">office@accountantservices.org.uk</a>.</p><div className="legal-note"><strong>Design note</strong><p>This redesign preserves a clear location for final solicitor-reviewed policy wording before production launch.</p></div></section></>;
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  let content: React.ReactNode;

  if (serviceBySlug[slug]) content = <ServicePage slug={slug} />;
  else if (articles.some((item) => item.slug === slug)) content = <ArticlePage slug={slug} />;
  else if (slug === "additional-services" || slug === "shop") content = <ServicesPage />;
  else if (slug === "contact") content = <ContactPage />;
  else if (slug === "blog") content = <BlogPage />;
  else if (slug === "privacy-policy" || slug === "terms-conditions") content = <LegalPage slug={slug} />;
  else notFound();

  return <SiteShell>{content}</SiteShell>;
}
