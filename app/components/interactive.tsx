"use client";

import { FormEvent, useState } from "react";
import { categories, services } from "../lib/services";

const navigationGroups = [
  {
    label: "Create",
    href: "/additional-services#create",
    slugs: ["ltd", "registeredoffice", "dormantcompany", "soletrader", "selfassessmentregistration"],
  },
  {
    label: "Compliance",
    href: "/additional-services#compliance",
    slugs: ["confirmationstatement", "vatregistration", "payeregistration", "selfassessmentfiling"],
  },
  {
    label: "Change",
    href: "/additional-services#change",
    slugs: ["changecompanyname", "changecompanyaddress", "changedirectordetails", "changecapitalshareholders", "changecompanyactivities", "changepscdetails"],
  },
  {
    label: "Additional Services",
    href: "/additional-services#additional-services",
    slugs: ["virtual-finance-director", "invoice-monitoring-and-tracking", "business-plan", "corporation-tax-filing", "book-keeping"],
  },
] as const;

export function HeaderDropdown({
  label,
  href,
  slugs,
}: {
  label: string;
  href: string;
  slugs: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const links = slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean);

  return (
    <div
      className="header-dropdown"
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
        {label} <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="header-dropdown-panel">
          <div className="header-dropdown-heading">{label}</div>
          <div className="header-dropdown-links">
            {links.map((service) => service && (
              <a href={`/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>
                {service.title}<span>↗</span>
              </a>
            ))}
          </div>
          <a className="header-dropdown-all" href={href} onClick={() => setOpen(false)}>
            View {label.toLowerCase()} services <span>→</span>
          </a>
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
          {navigationGroups.slice(0, 3).map((group) => (
            <details className="mobile-services" key={group.label}>
              <summary>{group.label} <span aria-hidden="true">+</span></summary>
              <div className="mobile-service-groups">
                <section>
                  {group.slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean).map((service) => service && (
                    <a href={`/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>{service.title}<span>↗</span></a>
                  ))}
                </section>
                <a className="mobile-all-services" href={group.href} onClick={() => setOpen(false)}>View {group.label.toLowerCase()} services <span>→</span></a>
              </div>
            </details>
          ))}
          <a href="/blog" onClick={() => setOpen(false)}>Blog</a>
          <details className="mobile-services">
            <summary>Additional Services <span aria-hidden="true">+</span></summary>
            <div className="mobile-service-groups">
              <section>
                {navigationGroups[3].slugs.map((slug) => services.find((service) => service.slug === slug)).filter(Boolean).map((service) => service && (
                  <a href={`/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>{service.title}<span>↗</span></a>
                ))}
              </section>
              <a className="mobile-all-services" href="/additional-services" onClick={() => setOpen(false)}>View all additional services <span>→</span></a>
            </div>
          </details>
          <a href="/shop" onClick={() => setOpen(false)}>Shop</a>
          <a href="/contact" onClick={() => setOpen(false)}>Contact Us</a>
          <a className="button button-primary" href="/ltd" onClick={() => setOpen(false)}>Start a company <span>↗</span></a>
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

export function CompanySearch() {
  return (
    <form
      className="company-search"
      action="/company/search"
      method="get"
    >
      <label htmlFor="company-name">Search Companies House</label>
      <div className="search-row">
        <input
          id="company-name"
          name="company"
          placeholder="Enter a company name"
          autoComplete="organization"
          aria-describedby="company-search-note"
          required
        />
        <button type="submit" aria-label="Search Companies House">Search <span>→</span></button>
      </div>
      <p className="form-note" id="company-search-note">
        Find an existing company or check a name to register. <a href="/ltd">Ready to register? Start here →</a>
      </p>
    </form>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <span>✓</span>
        <h3>Thanks — your message is ready.</h3>
        <p>This design demo keeps your details private. In the live build, this would connect securely to the enquiry team.</p>
        <button className="text-link" type="button" onClick={() => setSent(false)}>Send another enquiry →</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-grid">
        <label>First name<input required name="firstName" autoComplete="given-name" /></label>
        <label>Last name<input required name="lastName" autoComplete="family-name" /></label>
      </div>
      <label>Email address<input required type="email" name="email" autoComplete="email" /></label>
      <label>How can we help?<select name="topic" defaultValue="">
        <option value="" disabled>Choose a service</option>
        <option>Start a business</option>
        <option>File with Companies House or HMRC</option>
        <option>Make a company change</option>
        <option>Ongoing accounting support</option>
      </select></label>
      <label>Tell us a little more<textarea name="message" rows={5} /></label>
      <button className="button button-primary" type="submit">Send enquiry <span>↗</span></button>
      <p className="form-note">No jargon. No hard sell. Just a helpful reply from a real person.</p>
    </form>
  );
}

export function Newsletter() {
  const [joined, setJoined] = useState(false);

  return (
    <form
      className="newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setJoined(true);
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input id="newsletter-email" type="email" placeholder="Work email" required />
      <button type="submit">{joined ? "You’re on the list ✓" : "Get the good stuff →"}</button>
    </form>
  );
}
