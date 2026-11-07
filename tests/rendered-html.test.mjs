import assert from "node:assert/strict";
import test from "node:test";

test("navigation uses service lists and the office email", async () => {
  for (const route of ["/", "/contact", "/virtual-finance-director"]) {
    const html = await (await render(route)).text();
    assert.doesNotMatch(html, /info@accountantservices/);
    assert.match(html, /mailto:office@accountantservices\.org\.uk/);
    assert.match(html, /class="mobile-service-list"/);
    assert.match(html, /class="mobile-quick-links"/);
    const quickLinks = html.match(/<nav class="mobile-quick-links"[\s\S]*?<\/nav>/)?.[0];
    assert.match(quickLinks ?? "", /href="\/who-we-help"/);
    assert.match(quickLinks ?? "", /href="\/blog"/);
    const mobilePanel = html.match(/<nav class="mobile-panel"[\s\S]*?<\/nav>/)?.[0];
    assert.doesNotMatch(mobilePanel ?? "", /href="\/(?:who-we-help|blog)"/);
    assert.doesNotMatch(html, /class="mobile-service-cards"|View all services|View all <span>/);
  }
});

test("VFD enquiries stay on the page with five simple contact fields", async () => {
  const html = await (await render("/virtual-finance-director")).text();
  assert.match(html, /id="vfd-enquiry"/);
  assert.equal((html.match(/href="#vfd-enquiry"/g) ?? []).length, 5);
  const form = html.match(/<form class="vfd-enquiry-form"[\s\S]*?<\/form>/)?.[0];
  assert.ok(form);
  for (const name of ["name", "surname", "email", "phone", "company"]) assert.match(form, new RegExp(`name="${name}"`));
  assert.equal((form.match(/<input\b/g) ?? []).length, 5);
  assert.match(form, /autoComplete="given-name"/i);
  assert.match(form, /autoComplete="family-name"/i);
  assert.doesNotMatch(form, /<textarea|<select/);
  assert.match(form, /Opens your email app/);
});

test("shared shell has keyboard access and a motion control", async () => {
  for (const route of ["/", "/contact", "/virtual-finance-director", "/who-we-help"]) {
    const html = await (await render(route)).text();
    assert.match(html, /href="#main-content"/);
    assert.match(html, /id="main-content"/);
    assert.match(html, /class="motion-control"/);
    assert.match(html, /Pause motion/);
    assert.match(html, /name="referrer" content="strict-origin-when-cross-origin"/);
  }
});

test("legal pages do not expose internal design notes", async () => {
  for (const route of ["/privacy-policy", "/terms-conditions"]) {
    const response = await render(route);
    assert.equal(response.status, 200);
    assert.doesNotMatch(await response.text(), /Design note|solicitor-reviewed|before production launch/i);
  }
});

test("article navigation keeps root-relative local destinations", async () => {
  const html = await (await render("/accountant-services")).text();
  assert.match(html, /href="\/additional-services"/);
  assert.doesNotMatch(html, /href="\/accountant-services\/(?:additional-services|book-keeping|contact)/);
});

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
    /<title>Clearer numbers\. Stronger decisions \| Accountant Services<\/title>/i,
  );
  assert.doesNotMatch(html, /Search Companies House/i);
  assert.match(html, /Request your quotation/i);
  assert.match(html, /href="#services"/i);
  assert.match(html, /<details class="mobile-nav"/i);
  assert.match(html, /<summary class="menu-button" aria-label="Toggle navigation menu"/i);
  assert.match(html, /<nav class="mobile-panel" id="mobile-navigation"/i);
  assert.match(html, /Clearer numbers\./i);
  assert.match(html, /Stronger decisions\./i);
  assert.match(html, /class="credibility-marquee"/i);
  assert.match(html, /class="credibility-track"/i);
  assert.match(html, /Bookkeeping/i);
  assert.match(html, /Payroll Services/i);
  assert.match(html, /Year-End Accounts &amp; Corporation Tax/i);
  assert.match(html, /Self-Assessment Tax Returns/i);
  assert.doesNotMatch(html, /Business Plan/i);
  assert.match(html, /Virtual Finance Director/i);
  assert.match(html, /Dormant Company Filing/i);
  assert.match(html, /Company Secretarial/i);
  assert.match(html, /VAT Returns/i);
  assert.equal((html.match(/class="service-showcase-card"/g) ?? []).length, 3);
  assert.match(html, /More ways to support your business/i);
  assert.match(html, /See all services/i);
  assert.match(html, /class="service-discovery" href="\/additional-services"/i);
  assert.doesNotMatch(html, /Four focused services/i);
  assert.match(html, /4\.9/i);
  assert.match(html, /Client rating/i);
  assert.match(html, /<strong>Tailored<\/strong><small>Built around your priorities<\/small>/i);
  assert.match(html, /Spring Raise Ltd/i);
  assert.match(html, /Recruitment Agency/i);
  assert.match(html, /We’ve had a fantastic experience working with our accountant\./);
  assert.match(html, /reliable, knowledgeable and supportive accountant\./);
  assert.doesNotMatch(html, /Natalie D\.|quietly take care of everything/);
  assert.doesNotMatch(html, /class="quotation-form/i);
  assert.match(html, /href="\/contact#quotation"/i);
  assert.match(html, />Blog<\/a>/i);
  assert.match(html, />Services/i);
  assert.doesNotMatch(html, />Contact Us<\/a>/i);
  assert.doesNotMatch(html, /href="\/contact"/i);
  assert.match(html, />Get a quotation/i);
  assert.doesNotMatch(html, /newsletter/i);
  assert.doesNotMatch(html, /href="\/shop"/i);
  assert.doesNotMatch(html, /href="\/ltd"/i);
  assert.doesNotMatch(html, /href="\/confirmationstatement"/i);
  assert.doesNotMatch(html, /VAT registration/i);
  assert.match(html, /Practical guidance/i);
  assert.doesNotMatch(html, /What is a Confirmation Statement\?/i);
});

test("hides the company formation journey", async () => {
  const response = await render("/ltd");
  assert.equal(response.status, 404);
});

test("keeps the currently supported service pages", async () => {
  const keptPaths = ["/book-keeping", "/payroll-services", "/year-end-accounts-corporation-tax", "/self-assessment-tax-returns", "/virtual-finance-director", "/dormantcompany", "/company-secretarial", "/vat-returns"];
  for (const path of keptPaths) {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /href="\/contact#quotation"/i);
    assert.match(html, path === "/virtual-finance-director" ? /Book a free 15-minute consultation/ : /Enquire Now/);
    assert.doesNotMatch(html, /Ask a question/i);
  }

  const createResponse = await render("/registeredoffice");
  const complianceResponse = await render("/confirmationstatement");

  assert.equal(createResponse.status, 404);
  assert.equal(complianceResponse.status, 404);
});

test("combines contact and quotation on one professional page", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Contact &amp; quotations/i);
  assert.match(html, /One place to ask, scope and quote/i);
  assert.match(html, /Tell us where you are\. We’ll shape what comes next/i);
  assert.match(html, /Direct to our team/i);
  assert.match(html, /Human reviewed/i);
  assert.match(html, /id="quotation"/i);
  assert.match(html, /href="#quotation"/i);
  assert.match(html, /class="quotation-form/i);
  assert.match(html, /class="quote-exit-link" href="\/"/i);
  assert.match(html, /Return home/i);
  assert.match(html, /office@accountantservices\.org\.uk/i);
  assert.match(html, /Something else \/ not sure yet/i);
  for (const service of ["Bookkeeping", "Payroll Services", "Year-End Accounts &amp; Corporation Tax", "Self-Assessment Tax Returns", "Virtual Finance Director", "Dormant Company Filing", "Company Secretarial Services", "VAT Returns &amp; HMRC Filing"]) {
    assert.ok(html.includes(`value="${service}"`), `Quotation option missing: ${service}`);
  }
  assert.match(html, /class="location-map"/i);
  assert.match(html, /google\.com\/maps\?q=Building\+220/i);
  assert.match(html, /Map showing Accountant Services in Wokingham/i);
});

test("shows the agreed pricing on the service directory", async () => {
  const response = await render("/additional-services");
  const html = await response.text();
  assert.equal(response.status, 200);
  assert.match(html, /Main services/);
  assert.match(html, /Additional services/);
  assert.match(html, /£6\.50 \+ VAT per payslip/);
  assert.equal((html.match(/<span>Fixed fee<\/span>/g) ?? []).length, 2);
  assert.match(html, /Fixed fee from £150 \+ VAT/);
  assert.equal((html.match(/<span>Tailored quote<\/span>/g) ?? []).length, 4);
});

test("renders Who We Help with audience sections and service destinations", async () => {
  const response = await render("/who-we-help");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const id of ["small-businesses", "limited-companies", "sole-traders", "freelancers", "start-ups", "growing-businesses", "landlords"]) {
    assert.ok(html.includes(`id="${id}"`));
    assert.ok(html.includes(`href="#${id}"`));
  }
  assert.match(html, /href="\/virtual-finance-director"/);
  assert.match(html, /href="\/self-assessment-tax-returns"/);
  assert.match(html, /Starting price from £150 plus VAT/);
  assert.match(html, /<h1>Accounting Solutions Tailored to You and Your Business<\/h1>/);
  const home = await render("/");
  assert.match(await home.text(), /href="\/who-we-help"/);
});

test("does not expose a separate quotation route", async () => {
  const response = await render("/quotation");
  assert.equal(response.status, 404);
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
