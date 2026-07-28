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
    /<title>Business, made brilliantly simple \| Accountant Services<\/title>/i,
  );
  assert.match(html, /Search Companies House/i);
  assert.match(html, /One expert team/i);
  assert.match(html, /href="\/contact"/i);
  assert.match(html, />Blog<\/a>/i);
  assert.match(html, />Services/i);
  assert.match(html, />Contact Us<\/a>/i);
  assert.doesNotMatch(html, /href="\/shop"/i);
  assert.doesNotMatch(html, /href="\/ltd"/i);
  assert.doesNotMatch(html, /Confirmation statement/i);
  assert.doesNotMatch(html, /VAT registration/i);
  assert.match(html, /Three useful reads/i);
  assert.doesNotMatch(html, /What is a Confirmation Statement\?/i);
});

test("hides the company formation journey", async () => {
  const response = await render("/ltd");
  assert.equal(response.status, 404);
});

test("hides create and compliance service pages", async () => {
  const createResponse = await render("/registeredoffice");
  const complianceResponse = await render("/confirmationstatement");

  assert.equal(createResponse.status, 404);
  assert.equal(complianceResponse.status, 404);
});

test("keeps Companies House search available without formation links", async () => {
  const response = await render("/company/search?company=Example");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Companies House search/i);
  assert.doesNotMatch(html, /href="\/ltd/i);
  assert.doesNotMatch(html, /Register now/i);
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
