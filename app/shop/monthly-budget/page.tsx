import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BudgetProductArt, ProductPurchase } from "../../components/interactive";
import { SiteShell } from "../../components/site-shell";

export const metadata: Metadata = {
  title: "Monthly Budgeting Spreadsheet",
  description: "Track income, expenses and savings with a practical monthly budgeting spreadsheet.",
};

export default function MonthlyBudgetPage() {
  notFound();
  return (
    <SiteShell>
      <section className="product-detail">
        <div className="page-shell">
          <div className="breadcrumb product-breadcrumb">
            <a href="/">Home</a><span>→</span><a href="/shop">Shop</a><span>→</span><span>Monthly Budgeting Spreadsheet</span>
          </div>
          <div className="product-detail-grid">
            <div className="product-detail-art reveal-up">
              <BudgetProductArt />
              <div className="product-preview-note"><span>XL</span><p><strong>Excel-ready download</strong><small>Start using it straight away</small></p></div>
            </div>
            <div className="product-detail-copy reveal-up delay-one">
              <div className="eyebrow"><span /> Digital download</div>
              <h1>Monthly Budgeting Spreadsheet</h1>
              <div className="detail-price"><del>£9.99</del><strong>£4.99</strong><span>One-time payment</span></div>
              <p className="detail-lede">Take control of your finances with an easy-to-use monthly planner. Track income, expenses and savings in one place, set financial goals, and gain a clear overview of your spending habits.</p>
              <ul className="product-benefits">
                <li><span>✓</span><div><strong>See the whole month clearly</strong><p>Bring income, regular costs and day-to-day spending into one organised view.</p></div></li>
                <li><span>✓</span><div><strong>Track progress towards savings goals</strong><p>Make your targets visible and see how each month is moving you forward.</p></div></li>
                <li><span>✓</span><div><strong>Make smarter financial decisions</strong><p>Spot patterns quickly and understand where small changes can have the most impact.</p></div></li>
              </ul>
              <ProductPurchase />
            </div>
          </div>
        </div>
      </section>
      <section className="product-confidence section-space">
        <div className="page-shell confidence-grid">
          <div><span>01</span><h2>Simple to start</h2><p>Download the spreadsheet after purchase and begin with the month you are in.</p></div>
          <div><span>02</span><h2>Easy to maintain</h2><p>A clear structure makes keeping your budget up to date feel manageable.</p></div>
          <div><span>03</span><h2>Yours to keep</h2><p>One purchase gives you a reusable financial planning tool for every month ahead.</p></div>
        </div>
      </section>
    </SiteShell>
  );
}
