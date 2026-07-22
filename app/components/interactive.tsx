"use client";

import { FormEvent, useState } from "react";
import { categories, services } from "../lib/services";

export function ServicesMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="services-menu"
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
        className="services-trigger"
        type="button"
        aria-expanded={open}
        aria-controls="services-mega-menu"
        onClick={() => setOpen((value) => !value)}
      >
        Services <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="services-mega-menu" id="services-mega-menu">
          <div className="mega-menu-head">
            <div>
              <p>Everything in one place</p>
              <h2>What does your business need?</h2>
            </div>
            <a href="/additional-services" onClick={() => setOpen(false)}>View all services <span>→</span></a>
          </div>
          <div className="mega-menu-grid">
            {categories.map((category, index) => (
              <section className="mega-menu-category" key={category.name}>
                <div className="mega-category-title"><span>0{index + 1}</span><h3>{category.name === "Start" ? "Create" : category.name}</h3></div>
                <p>{category.description}</p>
                <div className="mega-service-links">
                  {services.filter((service) => service.category === category.name).map((service) => (
                    <a href={`/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>{service.title}<span>↗</span></a>
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
              {categories.map((category) => (
                <section key={category.name}>
                  <h3>{category.name === "Start" ? "Create" : category.name}</h3>
                  {services.filter((service) => service.category === category.name).map((service) => (
                    <a href={`/${service.slug}`} key={service.slug} onClick={() => setOpen(false)}>{service.title}<span>↗</span></a>
                  ))}
                </section>
              ))}
              <a className="mobile-all-services" href="/additional-services" onClick={() => setOpen(false)}>View all services <span>→</span></a>
            </div>
          </details>
          <a href="/blog" onClick={() => setOpen(false)}>Insights</a>
          <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
          <a className="button button-primary" href="/ltd" onClick={() => setOpen(false)}>Start a company <span>↗</span></a>
        </div>
      )}
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
