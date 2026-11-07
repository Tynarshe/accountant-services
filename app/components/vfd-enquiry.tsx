"use client";

import { useState, type FormEvent } from "react";

export function VfdEnquiry() {
  const [prepared, setPrepared] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fields = [["name", "Name"], ["surname", "Surname"], ["email", "Email address"], ["phone", "Phone number"], ["company", "Company name"]];
    const body = ["I would like to discuss Virtual Finance Director support.", "", ...fields.map(([key, label]) => `${label}: ${String(data.get(key) ?? "").trim()}`)].join("\n");
    window.location.href = `mailto:info@accountantservices.org.uk?subject=${encodeURIComponent("Virtual Finance Director enquiry")}&body=${encodeURIComponent(body)}`;
    setPrepared(true);
  }
  return <section id="vfd-enquiry" className="vfd-enquiry section-space" aria-labelledby="vfd-enquiry-title">
    <div className="page-shell vfd-enquiry-grid">
      <div><div className="eyebrow"><span /> Start a conversation</div><h2 id="vfd-enquiry-title">Let’s talk about<br />your business.</h2><p>You don’t need to know which package you need. Share your contact details so we can discuss your priorities and the support that would help.</p><p>No detailed brief. No quotation to work through. Just a conversation about what comes next.</p><a className="text-link" href="https://calendly.com/accountantservices">Prefer to book a free 15-minute consultation?</a></div>
      <form className="vfd-enquiry-form" onSubmit={submit}>
        <h3>Your contact details</h3>
        <div className="vfd-enquiry-fields">
          <label htmlFor="vfd-name">Name<input id="vfd-name" name="name" autoComplete="given-name" maxLength={100} required /></label>
          <label htmlFor="vfd-surname">Surname<input id="vfd-surname" name="surname" autoComplete="family-name" maxLength={100} required /></label>
          <label htmlFor="vfd-email">Email address<input id="vfd-email" name="email" type="email" autoComplete="email" maxLength={254} required /></label>
          <label htmlFor="vfd-phone">Phone number<input id="vfd-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} required /></label>
          <label className="vfd-enquiry-wide" htmlFor="vfd-company">Company name<input id="vfd-company" name="company" autoComplete="organization" maxLength={160} required /></label>
        </div>
        <button className="button button-primary" type="submit">Let’s start a conversation</button>
        <p className="vfd-enquiry-note">Opens your email app with your enquiry ready to send to <a href="mailto:info@accountantservices.org.uk">info@accountantservices.org.uk</a>. We’ll use your details to respond to your enquiry. <a href="/privacy-policy">Privacy policy</a>.</p>
        {prepared && <p role="status">Your email draft is ready in your email app. Please send it to complete your enquiry. If no app opened, email info@accountantservices.org.uk or call 0118 207 7207.</p>}
      </form>
    </div>
  </section>;
}
