"use client";

import { FormEvent, useState } from "react";

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
          <a href="/#services" onClick={() => setOpen(false)}>Services</a>
          <a href="/additional-services" onClick={() => setOpen(false)}>For growing businesses</a>
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
      action="https://find-and-update.company-information.service.gov.uk/search/companies"
      method="get"
      target="_blank"
    >
      <label htmlFor="company-name">Search Companies House</label>
      <div className="search-row">
        <input
          id="company-name"
          name="q"
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
