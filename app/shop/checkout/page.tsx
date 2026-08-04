import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/site-shell";

export const metadata: Metadata = {
  title: "Secure checkout",
  description: "Complete your Monthly Budgeting Spreadsheet purchase securely.",
};

type CheckoutProps = {
  searchParams: Promise<{ quantity?: string }>;
};

const sureCartPriceId = "e6360f96-0e5d-446e-bbcb-c99fcaa8b18e";

export default async function CheckoutPage({ searchParams }: CheckoutProps) {
  notFound();
  const { quantity: requestedQuantity } = await searchParams;
  const parsedQuantity = Number.parseInt(requestedQuantity ?? "1", 10);
  const quantity = Number.isFinite(parsedQuantity) ? Math.min(10, Math.max(1, parsedQuantity)) : 1;
  const checkoutUrl = new URL("https://accountantservices.org.uk/checkout/");
  checkoutUrl.searchParams.set("line_items[0][price_id]", sureCartPriceId);
  checkoutUrl.searchParams.set("line_items[0][quantity]", String(quantity));

  return (
    <SiteShell>
      <section className="embedded-checkout">
        <div className="page-shell">
          <div className="checkout-heading">
            <div>
              <div className="breadcrumb checkout-breadcrumb"><a href="/">Home</a><span>→</span><a href="/shop">Shop</a><span>→</span><span>Checkout</span></div>
              <div className="eyebrow"><span /> Secure checkout</div>
              <h1>Complete your purchase.</h1>
              <p>Your payment is processed securely by the existing Accountant Services checkout. You will stay on this page throughout.</p>
            </div>
            <aside>
              <span>Order summary</span>
              <strong>Monthly Budgeting Spreadsheet</strong>
              <div><span>Quantity</span><b>{quantity}</b></div>
              <div><span>Total</span><b>£{(4.99 * quantity).toFixed(2)}</b></div>
            </aside>
          </div>
          <div className="checkout-frame-wrap">
            <div className="checkout-frame-top">
              <span><i /> Secure payment</span>
              <a href="/shop/monthly-budget">← Return to product</a>
            </div>
            <iframe
              className="checkout-frame"
              src={checkoutUrl.toString()}
              title="Accountant Services secure payment checkout"
              allow="payment *"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <p className="checkout-support">Need help with your order? Call <a href="tel:01182077207">0118 207 7207</a> or email <a href="mailto:office@accountantservices.org.uk">office@accountantservices.org.uk</a>.</p>
        </div>
      </section>
    </SiteShell>
  );
}
