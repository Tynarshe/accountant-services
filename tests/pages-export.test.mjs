import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("published homepage stylesheet includes the three-column mobile trust layout", async () => {
  const html = await readFile(new URL("../docs/index.html", import.meta.url), "utf8");
  const stylesheets = [...html.matchAll(/href="(\/accountant-services\/assets\/[^"?]+\.css)"/g)];
  assert.ok(stylesheets.length, "Exported homepage must load a stylesheet");
  const css = (await Promise.all(stylesheets.map(([, href]) =>
    readFile(new URL(`../docs${href.slice("/accountant-services".length)}`, import.meta.url), "utf8")
  ))).join("\n");
  assert.match(css, /\.hero-refined \.trust-row\{[^}]*grid-template-columns:repeat\(3,minmax\(0,1fr\)\)/,
    "Rebuild and export docs/ before publishing: mobile trust layout is missing");
});
