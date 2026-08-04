import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Accountant Services homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Accounting support, shaped around your business \| Accountant Services<\/title>/i,
  );
  assert.doesNotMatch(html, /Search Companies House/i);
  assert.match(html, /Get a tailored quotation/i);
  assert.match(html, /class="credibility-marquee"/i);
  assert.match(html, /class="credibility-track"/i);
  assert.match(html, /Business Plan/i);
  assert.match(html, /Book Keeping/i);
  assert.match(html, /Dormant Company Filing/i);
  assert.match(html, /Company Secretarial/i);
  assert.equal((html.match(/class="service-showcase-card"/g) ?? []).length, 2);
  assert.match(html, /A growing range of support/i);
  assert.match(html, /Explore more services/i);
  assert.match(html, /class="service-discovery" href="\/additional-services"/i);
  assert.doesNotMatch(html, /Four focused services/i);
  assert.match(html, /4\.9/i);
  assert.match(html, /Client rating/i);
  assert.match(html, /<strong>Tailored<\/strong><small>Support shaped around your business<\/small>/i);
  assert.match(html, /Natalie D\./i);
  assert.match(html, /having someone capable quietly take care of everything/i);
  assert.match(html, /info@accountantservices\.org\.uk/i);
  assert.match(html, /Something else \/ not sure yet/i);
  assert.match(html, /If the right fit is not listed/i);
  assert.match(html, /class="quote-service-picker"/i);
  assert.match(html, /Choose one or more services/i);
  assert.match(html, /href="\/contact"/i);
  assert.match(html, />Blog<\/a>/i);
  assert.match(html, />Services/i);
  assert.match(html, />Contact Us<\/a>/i);
  assert.doesNotMatch(html, /newsletter/i);
  assert.doesNotMatch(html, /href="\/shop"/i);
  assert.doesNotMatch(html, /href="\/ltd"/i);
  assert.doesNotMatch(html, /href="\/confirmationstatement"/i);
  assert.doesNotMatch(html, /VAT registration/i);
  assert.match(html, /Useful thinking/i);
  assert.doesNotMatch(html, /What is a Confirmation Statement\?/i);
});

test("hides the company formation journey", async () => {
  const response = await render("/ltd");
  assert.equal(response.status, 404);
});

test("keeps the currently supported service pages", async () => {
  const keptPaths = ["/business-plan", "/book-keeping", "/dormantcompany", "/company-secretarial"];
  for (const path of keptPaths) {
    const response = await render(path);
    assert.equal(response.status, 200);
  }

  const createResponse = await render("/registeredoffice");
  const complianceResponse = await render("/confirmationstatement");

  assert.equal(createResponse.status, 404);
  assert.equal(complianceResponse.status, 404);
});

test("renders the quotation form on the contact page", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Request a quotation/i);
  assert.match(html, /info@accountantservices\.org\.uk/i);
  assert.match(html, /Something else \/ not sure yet/i);
  assert.match(html, /class="location-map"/i);
  assert.match(html, /google\.com\/maps\?q=Building\+220/i);
  assert.match(html, /Map showing Accountant Services in Wokingham/i);
});

test("hides the shop catalogue", async () => {
  const response = await render("/shop");
  assert.equal(response.status, 404);
});

test("hides the internal product page", async () => {
  const response = await render("/shop/monthly-budget");
  assert.equal(response.status, 404);
});

test("hides the embedded checkout", async () => {
  const response = await render("/shop/checkout?quantity=2");
  assert.equal(response.status, 404);
});

test("server-renders the full blog destination", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Clear thinking for busy business owners/i);
  assert.match(html, /What is a Confirmation Statement/i);
  assert.match(html, /Making Tax Digital for VAT/i);
  assert.match(html, /href="\/wrapping-up-your-year-end-accounts"/i);
});
