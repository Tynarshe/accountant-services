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
  assert.match(html, /href="\/ltd"/i);
  assert.match(html, /href="\/contact"/i);
});

test("server-renders the company formation journey", async () => {
  const response = await render("/ltd");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Limited company formation/i);
  assert.match(html, /Companies House/i);
  assert.match(html, /href="#get-started"/i);
});

test("server-renders the shop catalogue", async () => {
  const response = await render("/shop");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Monthly Budgeting Spreadsheet/i);
  assert.match(html, /4\.99/i);
  assert.match(html, /Search the shop/i);
  assert.match(html, /href="\/shop\/monthly-budget"/i);
});

test("server-renders the internal product page", async () => {
  const response = await render("/shop/monthly-budget");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Monthly Budgeting Spreadsheet/i);
  assert.match(html, /Buy now securely/i);
  assert.match(html, /href="\/shop\/checkout\?quantity=1"/i);
});

test("server-renders the embedded SureCart checkout", async () => {
  const response = await render("/shop/checkout?quantity=2");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Accountant Services secure payment checkout/i);
  assert.match(html, /e6360f96-0e5d-446e-bbcb-c99fcaa8b18e/i);
  assert.match(html, /9\.98/i);
});
