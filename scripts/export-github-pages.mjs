import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const outputRoot = join(projectRoot, "docs");
const pagesBasePath = "/accountant-services";

const serviceSlugs = [
  "ltd",
  "registeredoffice",
  "dormantcompany",
  "soletrader",
  "selfassessmentregistration",
  "confirmationstatement",
  "vatregistration",
  "payeregistration",
  "selfassessmentfiling",
  "changecompanyname",
  "changecompanyaddress",
  "changedirectordetails",
  "changecapitalshareholders",
  "changecompanyactivities",
  "changepscdetails",
  "virtual-finance-director",
  "invoice-monitoring-and-tracking",
  "business-plan",
  "corporation-tax-filing",
  "book-keeping",
];

const articleSlugs = [
  "wrapping-up-your-year-end-accounts",
  "accountant-services",
  "low-cost-business-accountant",
];

const routes = [
  "/",
  ...serviceSlugs.map((slug) => `/${slug}`),
  ...articleSlugs.map((slug) => `/${slug}`),
  "/additional-services",
  "/blog",
  "/contact",
  "/privacy-policy",
  "/terms-conditions",
  "/company/search",
  "/ltd/ltd-pricing",
];

function addPagesBasePath(html) {
  return html
    .replaceAll('href="/', `href="${pagesBasePath}/`)
    .replaceAll('src="/', `src="${pagesBasePath}/`)
    .replaceAll('action="/', `action="${pagesBasePath}/`)
    .replaceAll('import("/assets/', `import("${pagesBasePath}/assets/`)
    .replaceAll('\\"/assets/', `\\"${pagesBasePath}/assets/`)
    .replaceAll(
      "https://accountantservices.org.uk/og.png",
      "https://tynarshe.github.io/accountant-services/og.png",
    );
}

function routeOutputPath(route) {
  return route === "/"
    ? join(outputRoot, "index.html")
    : join(outputRoot, route.slice(1), "index.html");
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });
await cp(join(projectRoot, "dist/client"), outputRoot, { recursive: true });
await Promise.all([
  rm(join(outputRoot, ".assetsignore"), { force: true }),
  rm(join(outputRoot, ".vite"), { recursive: true, force: true }),
  rm(join(outputRoot, "_headers"), { force: true }),
]);

const workerUrl = pathToFileURL(join(projectRoot, "dist/server/index.js"));
workerUrl.searchParams.set("github-pages-export", Date.now().toString());
const { default: worker } = await import(workerUrl.href);

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://tynarshe.github.io${route}`, {
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

  if (!response.ok) {
    throw new Error(`Could not export ${route}: HTTP ${response.status}`);
  }

  const outputPath = routeOutputPath(route);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, addPagesBasePath(await response.text()));
}

await writeFile(join(outputRoot, ".nojekyll"), "");
await cp(join(outputRoot, "index.html"), join(outputRoot, "404.html"));

console.log(`Exported ${routes.length} routes to docs/ for GitHub Pages.`);
