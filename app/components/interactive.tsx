"use client";

import { FormEvent, useState } from "react";
import { visibleCategories, visibleServices } from "../lib/services";

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
            <a href="/additional-services" onClick={() => setOpen(false)}>
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
                    <a href={`/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>
                      {service.title}<span>↗</span>
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
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-nav">
      <button
        className="menu-button"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      {open && (
        <div className="mobile-panel">
          <details className="mobile-services">
            <summary>Services <span aria-hidden="true">+</span></summary>
            <div className="mobile-service-groups">
              {visibleCategories.map((category) => (
                <section key={category.name}>
                  <h3>{category.name}</h3>
                  {visibleServices.filter((service) => service.category === category.name).map((service) => (
                    <a href={`/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>
                      {service.title}<span>↗</span>
                    </a>
                  ))}
                </section>
              ))}
              <a className="mobile-all-services" href="/additional-services" onClick={() => setOpen(false)}>
                View all services <span>→</span>
              </a>
            </div>
          </details>
          <a href="/blog" onClick={() => setOpen(false)}>Blog</a>
          <a href="/contact" onClick={() => setOpen(false)}>Contact Us</a>
          <a className="button button-primary" href="/#quotation" onClick={() => setOpen(false)}>Get a tailored quotation <span>↗</span></a>
        </div>
      )}
    </div>
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
                  <b>View product <i>↗</i></b>
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
    <form className={`quotation-form ${compact ? "quotation-form-compact" : ""}`} onSubmit={submit}>
      <fieldset className="quote-services">
        <legend>Which services do you need?</legend>
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
      </fieldset>

      <div className="quote-field-grid">
        <label>Your name<input required name="name" autoComplete="name" placeholder="Your full name" /></label>
        <label>Business name<input name="businessName" autoComplete="organization" placeholder="Business or organisation" /></label>
        <label>Email address<input required type="email" name="email" autoComplete="email" placeholder="you@business.co.uk" /></label>
        <label>Phone number<input type="tel" name="phone" autoComplete="tel" placeholder="Optional" /></label>
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

      <label className="quote-details">Tell us what you need<textarea required name="details" rows={compact ? 4 : 5} maxLength={800} placeholder="Share your priorities, deadlines and anything you would like included in the quotation." /></label>
      {formError && <p className="quote-error" role="alert">{formError}</p>}
      {prepared && <p className="quote-ready" role="status">Your quotation request has been prepared in your email app. Review it, then press send.</p>}
      <div className="quote-submit-row">
        <button className="button button-accent" type="submit">Prepare quotation email <span>↗</span></button>
        <p>Opens a pre-addressed email to <strong>info@accountantservices.org.uk</strong>. No obligation.</p>
      </div>
    </form>
  );
}
