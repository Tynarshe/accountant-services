"use client";

import { FormEvent, MouseEvent as ReactMouseEvent, ReactNode, useRef, useState } from "react";
import { visibleCategories, visibleServices } from "../lib/services";

const githubPagesBasePath = "/accountant-services";

function sitePath(path: string) {
  if (typeof window === "undefined") return path;

  const isGitHubPagesBuild = window.location.pathname === githubPagesBasePath
    || window.location.pathname.startsWith(`${githubPagesBasePath}/`);

  return isGitHubPagesBuild ? `${githubPagesBasePath}${path}` : path;
}

type QuotationLinkProps = {
  children: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

type SectionLinkProps = {
  children: ReactNode;
  className?: string;
  targetId: string;
};

function scrollToSection(target: HTMLElement) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
}

export function SectionLink({ children, className, targetId }: SectionLinkProps) {
  function navigate(event: ReactMouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    scrollToSection(target);
  }

  return <a className={className} href={`#${targetId}`} onClick={navigate}>{children}</a>;
}

export function QuotationLink({ children, className, onNavigate }: QuotationLinkProps) {
  function navigate(event: ReactMouseEvent<HTMLAnchorElement>) {
    const quotation = document.getElementById("quotation");

    if (quotation) {
      event.preventDefault();
      onNavigate?.();
      window.requestAnimationFrame(() => scrollToSection(quotation));
      return;
    }

    // Cross-page journeys remain native so back gestures and browser history
    // work normally. Correct the destination for the GitHub Pages subdirectory.
    event.currentTarget.setAttribute("href", sitePath("/contact#quotation"));
    onNavigate?.();
  }

  return <a className={className} href="/contact#quotation" onClick={navigate}>{children}</a>;
}

export function ServicesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="header-dropdown services-dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false);
      }}
    >
      <button
        className="header-dropdown-trigger"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        Services <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="services-mega-menu">
          <div className="mega-menu-head">
            <div>
              <p>Focused support, tailored to you</p>
              <h2>Focused services. One experienced team.</h2>
            </div>
            <a href={sitePath("/additional-services")} onClick={() => setOpen(false)}>
              View all services <span>→</span>
            </a>
          </div>
          <div className="mega-menu-grid">
            {visibleCategories.map((category, index) => (
              <section className="mega-menu-category" key={category.name}>
                <div className="mega-category-title">
                  <span>0{index + 1}</span>
                  <h3>{category.name}</h3>
                </div>
                <p>{category.description}</p>
                <div className="mega-service-links">
                  {visibleServices.filter((service) => service.category === category.name).map((service) => (
                    <a href={sitePath(`/${service.slug}`)} key={service.slug} onClick={() => setOpen(false)}>
                      {service.title}<span>↗︎</span>
                    </a>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MobileNav() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    menuRef.current?.removeAttribute("open");
  }

  return (
    <details
      className="mobile-nav"
      ref={menuRef}
      onKeyDown={(event) => {
        if (event.key === "Escape") closeMenu();
      }}
    >
      <summary
        className="menu-button"
        aria-label="Toggle navigation menu"
      >
        <span className="menu-button-label">
          <span className="menu-button-label-open">Menu</span>
          <span className="menu-button-label-close">Close</span>
        </span>
        <span className="menu-button-icon" aria-hidden="true"><i /><i /></span>
      </summary>
      <nav className="mobile-panel" id="mobile-navigation" aria-label="Mobile navigation">
        <div className="mobile-panel-intro">
          <span>Navigate</span>
          <p>Practical support, shaped around your business.</p>
        </div>

        <section className="mobile-menu-services" aria-labelledby="mobile-services-heading">
          <div className="mobile-menu-section-head">
            <h2 id="mobile-services-heading">Services</h2>
            <a href={sitePath("/additional-services")} onClick={closeMenu}>View all <span>→</span></a>
          </div>
          <div className="mobile-service-cards">
            {visibleServices.slice(0, 4).map((service, index) => (
              <a href={sitePath(`/${service.slug}`)} key={service.slug} onClick={closeMenu}>
                <span className="mobile-service-number">0{index + 1}</span>
                <span><strong>{service.title}</strong><small>{service.category} support</small></span>
                <i aria-hidden="true">↗︎</i>
              </a>
            ))}
          </div>
        </section>

        <div className="mobile-menu-links mobile-menu-links-single">
          <a href={sitePath("/blog")} onClick={closeMenu}><span>Ideas &amp; guidance</span><strong>Blog</strong><i>↗︎</i></a>
        </div>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-contact">
            <a href="tel:01182077207"><span>Call</span><strong>0118 207 7207</strong></a>
            <a href="mailto:info@accountantservices.org.uk"><span>Email</span><strong>info@accountantservices.org.uk</strong></a>
          </div>
          <QuotationLink className="button button-accent" onNavigate={closeMenu}>Request a tailored quotation <span>↗︎</span></QuotationLink>
          <small><i /> Clear scope · Secure contact</small>
        </div>
      </nav>
    </details>
  );
}

const shopProducts = [
  {
    title: "Monthly Budgeting Spreadsheet",
    description: "A practical monthly planner for tracking income, spending and the numbers that matter.",
    price: 4.99,
    previousPrice: 9.99,
    href: "/shop/monthly-budget",
    date: 1,
  },
];

export function BudgetProductArt({ sale = true }: { sale?: boolean }) {
  return (
    <div className="product-art" aria-hidden="true">
      {sale && <span className="sale-pill">Sale</span>}
      <div className="spreadsheet-window">
        <div className="sheet-top"><span /><span /><span /></div>
        <div className="sheet-title">MONTHLY BUDGET</div>
        <div className="sheet-content">
          <span /><span /><span /><span />
          <i /><i /><i />
        </div>
        <div className="sheet-total"><span>TOTAL</span><strong>£</strong></div>
      </div>
      <div className="product-orbit" />
    </div>
  );
}

export function ShopCatalogue() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");

  const products = shopProducts
    .filter((product) => product.title.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => {
      if (sort === "oldest") return a.date - b.date;
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "za") return b.title.localeCompare(a.title);
      if (sort === "price-low") return a.price - b.price;
      if (sort === "price-high") return b.price - a.price;
      return b.date - a.date;
    });

  return (
    <div className="shop-catalogue">
      <div className="shop-toolbar">
        <label className="shop-search">
          <span className="sr-only">Search shop</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the shop"
          />
          <i aria-hidden="true">⌕</i>
        </label>
        <label className="shop-sort">
          <span>Sort by</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="az">Alphabetical, A–Z</option>
            <option value="za">Alphabetical, Z–A</option>
            <option value="price-low">Price, low to high</option>
            <option value="price-high">Price, high to low</option>
          </select>
        </label>
      </div>

      <p className="shop-count">{products.length} {products.length === 1 ? "product" : "products"}</p>
      {products.length > 0 ? (
        <div className="shop-grid">
          {products.map((product) => (
            <a className="shop-product" href={product.href} key={product.title}>
              <BudgetProductArt />
              <div className="product-copy">
                <p>Digital download</p>
                <h2>{product.title}</h2>
                <span>{product.description}</span>
                <div>
                  <p><del>£{product.previousPrice.toFixed(2)}</del><strong>£{product.price.toFixed(2)}</strong></p>
                  <b>View product <i>↗︎</i></b>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="shop-empty">
          <span>⌕</span>
          <h2>No products found</h2>
          <p>Try a different search term.</p>
        </div>
      )}
      <p className="shop-checkout-note">Product details, payment and order confirmation all stay within this website.</p>
    </div>
  );
}

export function ProductPurchase() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-purchase">
      <div className="purchase-quantity">
        <span>Quantity</span>
        <div>
          <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} disabled={quantity === 1} aria-label="Decrease quantity">−</button>
          <output aria-live="polite" aria-label="Quantity">{quantity}</output>
          <button type="button" onClick={() => setQuantity((value) => Math.min(10, value + 1))} disabled={quantity === 10} aria-label="Increase quantity">+</button>
        </div>
      </div>
      <a className="button button-primary full-button" href={`/shop/checkout?quantity=${quantity}`}>Buy now securely <span>→</span></a>
      <p><span>✓</span> Secure payment <span>✓</span> Instant digital delivery</p>
    </div>
  );
}

const quotationServices = [
  ...visibleServices.map((service) => service.title),
  "Something else / not sure yet",
];

export function QuotationForm({ compact = false }: { compact?: boolean }) {
  const [prepared, setPrepared] = useState(false);
  const [formError, setFormError] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [contactReady, setContactReady] = useState(false);
  const [detailsLength, setDetailsLength] = useState(0);

  const completedSteps = Number(selectedServices.length > 0) + Number(contactReady) + Number(detailsLength >= 20);

  function updateProgress(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const details = String(data.get("details") ?? "");

    setContactReady(name.length > 1 && email.includes("@"));
    setDetailsLength(details.length);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selectedServices = data.getAll("services").map(String);

    if (selectedServices.length === 0) {
      setFormError("Please choose at least one service.");
      event.currentTarget.querySelector<HTMLDetailsElement>(".quote-service-picker")?.setAttribute("open", "");
      return;
    }

    setFormError("");
    const name = String(data.get("name") ?? "").trim();
    const businessName = String(data.get("businessName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim() || "Not provided";
    const businessStage = String(data.get("businessStage") ?? "Not specified");
    const preferredContact = String(data.get("preferredContact") ?? "Email");
    const details = String(data.get("details") ?? "").trim() || "No additional details provided.";
    const subject = `Quotation request from ${businessName || name}`;
    const body = [
      "Hello Accountant Services,",
      "",
      "I would like a tailored quotation for:",
      ...selectedServices.map((service) => `• ${service}`),
      "",
      `Name: ${name}`,
      `Business: ${businessName || "Not provided"}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Business stage: ${businessStage}`,
      `Preferred contact: ${preferredContact}`,
      "",
      "What I need:",
      details,
    ].join("\n");

    setPrepared(true);
    window.location.href = `mailto:info@accountantservices.org.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={`quotation-form ${compact ? "quotation-form-compact" : ""}`} onInput={updateProgress} onSubmit={submit}>
      <div className="quote-form-progress" aria-label={`${completedSteps} of 3 sections complete`}>
        <div className="quote-progress-meta"><span>Quick quotation request</span><strong>{completedSteps}/3 complete</strong></div>
        <div className="quote-progress-track"><span style={{ width: `${(completedSteps / 3) * 100}%` }} /></div>
        <ol>
          <li className={selectedServices.length > 0 ? "complete" : "current"}><i>{selectedServices.length > 0 ? "✓" : "1"}</i><span>Services</span></li>
          <li className={contactReady ? "complete" : selectedServices.length > 0 ? "current" : ""}><i>{contactReady ? "✓" : "2"}</i><span>Contact</span></li>
          <li className={detailsLength >= 20 ? "complete" : contactReady ? "current" : ""}><i>{detailsLength >= 20 ? "✓" : "3"}</i><span>Your brief</span></li>
        </ol>
      </div>

      <section className="quote-form-block quote-form-block-services">
        <div className="quote-form-block-head"><span>01</span><div><strong>Choose the support you need</strong><small>Select one service or build a tailored combination.</small></div></div>
        <fieldset className="quote-services">
          <legend className="sr-only">Which services do you need?</legend>
          <details className="quote-service-picker">
            <summary>
              <span><small>Service selection</small><strong>{selectedServices.length === 0 ? "Choose one or more services" : `${selectedServices.length} ${selectedServices.length === 1 ? "service" : "services"} selected`}</strong></span>
              <i aria-hidden="true">⌄</i>
            </summary>
            <div className="quote-service-panel">
              <p className="quote-services-note">Choose everything that applies. If the right fit is not listed, select “Something else” and tell us below.</p>
              <div className="quote-service-options">
                {quotationServices.map((service) => (
                  <label key={service}>
                    <input
                      checked={selectedServices.includes(service)}
                      type="checkbox"
                      name="services"
                      value={service}
                      onChange={(event) => setSelectedServices((current) => event.target.checked ? [...current, service] : current.filter((item) => item !== service))}
                    />
                    <span><i aria-hidden="true">✓</i>{service}</span>
                  </label>
                ))}
              </div>
            </div>
          </details>
          {selectedServices.length > 0 && <div className="quote-selected-services" aria-live="polite">{selectedServices.map((service) => <span key={service}>✓ {service}</span>)}</div>}
        </fieldset>
      </section>

      <section className="quote-form-block">
        <div className="quote-form-block-head"><span>02</span><div><strong>How should we reach you?</strong><small>Only the essentials—no marketing lists.</small></div></div>
        <div className="quote-field-grid quote-contact-grid">
          <label>Your name<input required name="name" autoComplete="name" placeholder="Your full name" /></label>
          <label>Business name <em>Optional</em><input name="businessName" autoComplete="organization" placeholder="Business or organisation" /></label>
          <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@business.co.uk" /></label>
          <label>Phone number <em>Optional</em><input type="tel" name="phone" autoComplete="tel" placeholder="Your best contact number" /></label>
        </div>
      </section>

      <section className="quote-form-block">
        <div className="quote-form-block-head"><span>03</span><div><strong>Give us the useful context</strong><small>A few practical details help us shape the right scope.</small></div></div>
        <div className="quote-field-grid quote-context-grid">
          <label>Business stage<select name="businessStage" defaultValue="Trading business">
            <option>New business or idea</option>
            <option>Trading business</option>
            <option>Growing business</option>
            <option>Dormant company</option>
          </select></label>
          <label>Preferred contact<select name="preferredContact" defaultValue="Email">
            <option>Email</option>
            <option>Phone</option>
            <option>Either is fine</option>
          </select></label>
        </div>
        <label className="quote-details">What would a good outcome look like?<textarea required name="details" rows={compact ? 4 : 5} maxLength={800} placeholder="Tell us what you need, what is happening now, and any deadline we should know about." /><span className="quote-character-count">{detailsLength}/800 · Aim for at least 20 characters</span></label>
      </section>

      {formError && <p className="quote-error" role="alert">{formError}</p>}
      {prepared && <p className="quote-ready" role="status">Your quotation request has been prepared in your email app. Review it, then press send.</p>}
      <div className="quote-submit-row">
        <button className="button button-accent" type="submit">Build my quotation request <span>↗︎</span></button>
        <p><span className="quote-secure-dot" /> Opens a private email to <strong>info@accountantservices.org.uk</strong>. No obligation.</p>
      </div>
    </form>
  );
}
