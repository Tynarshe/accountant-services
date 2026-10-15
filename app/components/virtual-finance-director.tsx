import { UpRightArrow } from "./arrow";

const pillars = [
  { number: "01", title: "Strategic financial leadership", intro: "A clearer view of today. A considered plan for tomorrow.", items: ["Cash flow planning & forecasting", "Business growth advice & financial strategy", "Management accounts with clear, actionable insights"] },
  { number: "02", title: "Compliance made simple", intro: "Keep the important details moving, with experienced support.", items: ["Year-end accounts & tax planning", "Personal tax return preparation & filing", "Corporation Tax handling", "VAT preparation & submission"] },
  { number: "03", title: "Fully managed finance operations", intro: "Reliable day-to-day foundations for a stronger business.", items: ["Bookkeeping", "Payroll processing & RTI submissions", "Pension uploads", "Audit support & working papers"] },
  { number: "04", title: "Virtual CFO & director-level access", intro: "Financial expertise you can turn to when decisions matter.", items: ["The insight, clarity and control of an in-house CFO", "Remote, flexible support", "A tailored advisory package built around your priorities"] },
];

function ConsultationLink({ light = false }: { light?: boolean }) {
  return <a className={`button ${light ? "button-accent" : "button-primary"}`} href="https://calendly.com/accountantservices">Book a free 15-minute consultation <UpRightArrow /></a>;
}

export function VirtualFinanceDirectorPage() {
  return <div className="vfd-page">
    <section className="vfd-hero">
      <div className="page-shell">
        <div className="breadcrumb"><a href="/">Home</a><span>→</span><span>Virtual Finance Director</span></div>
        <div className="vfd-hero-grid">
          <div>
            <div className="eyebrow light"><span /> Virtual Finance Director · Tailored advisory packages</div>
            <h1>Financial leadership.<br /><em>Without the overhead.</em></h1>
            <p className="vfd-lede">Running a business is hard enough without chasing invoices, worrying about cash flow or scrambling at year-end. Our Virtual Finance Director service brings experienced financial leadership to your business, without the overhead.</p>
            <ConsultationLink light />
            <p className="vfd-caption">A conversation about your business. A clear next step.</p>
          </div>
          <aside className="vfd-brief" aria-label="Your financial leadership plan">
            <div className="vfd-brief-top"><span>YOUR FINANCIAL PICTURE</span><span className="vfd-live-dot" /></div>
            <h2>Know where you stand.<br /><em>See where you can go.</em></h2>
            <div className="vfd-plan-row"><span>01</span><div><strong>Clarity</strong><p>Understand performance and the numbers behind it.</p></div></div>
            <div className="vfd-plan-row"><span>02</span><div><strong>Control</strong><p>Plan cash flow, priorities and upcoming commitments.</p></div></div>
            <div className="vfd-plan-row"><span>03</span><div><strong>Direction</strong><p>Make your next decision with experienced advice.</p></div></div>
            <div className="vfd-brief-foot">One joined-up view. Support shaped around you.</div>
          </aside>
        </div>
      </div>
    </section>

    <section className="vfd-offer section-space">
      <div className="page-shell">
        <div className="vfd-section-intro"><div><div className="eyebrow"><span /> More than the numbers</div><h2>A finance team by your side.<br /><em>A bigger picture in view.</em></h2></div><div><p>From daily bookkeeping to board-level insight, get a complete finance team by your side—fully online, fully flexible and ready to grow with you.</p><a className="text-link" href="/contact#quotation">Build your advisory package <UpRightArrow /></a></div></div>
        <div className="vfd-pillars">{pillars.map((pillar) => <article className="vfd-pillar" key={pillar.number}>
          <span className="vfd-pillar-number">{pillar.number} /</span><h3>{pillar.title}</h3><p>{pillar.intro}</p>
          <ul>{pillar.items.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}</ul>
          <a className="text-link" href="/contact#quotation">Let’s talk about your needs <UpRightArrow /></a>
        </article>)}</div>
      </div>
    </section>

    <section className="vfd-package section-space"><div className="page-shell vfd-package-grid">
      <div><div className="eyebrow light"><span /> Your business. Your priorities.</div><h2>The right expertise.<br /><em>The right level of support.</em></h2><p>Choose a tailored advisory package that fits where you are now and where you want to go. We agree the scope, rhythm and fee with you before work begins.</p><ConsultationLink light /></div>
      <div className="vfd-package-steps"><div><span>01</span><h3>Start with a conversation</h3><p>Tell us about your business, challenges and the decisions ahead.</p></div><div><span>02</span><h3>Shape your support</h3><p>Bring together the day-to-day services and financial guidance you need.</p></div><div><span>03</span><h3>Move forward with clarity</h3><p>Work with a finance partner who helps you see the detail and the direction.</p></div></div>
    </div></section>

    <section className="vfd-close section-space"><div className="page-shell"><div className="eyebrow"><span /> Let’s talk</div><h2>Your next chapter starts<br />with a clearer financial picture.</h2><p>Take 15 minutes to talk through what your business needs. We’ll help you find a practical starting point.</p><ConsultationLink /><a className="vfd-phone" href="tel:01182077207">Prefer to call? 0118 207 7207</a></div></section>
  </div>;
}
