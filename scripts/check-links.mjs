import { access, readdir, readFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const docsRoot = join(projectRoot, "docs");
const pagesBasePath = "/accountant-services";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }));
  return nested.flat();
}

function localTarget(sourceFile, rawUrl) {
  if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(rawUrl)) return null;

  const [withoutHash, fragment = ""] = rawUrl.split("#", 2);
  const cleanUrl = withoutHash.split("?", 1)[0];

  if (!cleanUrl) return { file: sourceFile, fragment };

  let localPath;
  if (cleanUrl.startsWith(`${pagesBasePath}/`)) localPath = cleanUrl.slice(pagesBasePath.length + 1);
  else if (cleanUrl === pagesBasePath) localPath = "";
  else if (cleanUrl.startsWith("/")) localPath = cleanUrl.slice(1);
  else localPath = relative(docsRoot, resolve(dirname(sourceFile), cleanUrl));

  const file = extname(localPath)
    ? join(docsRoot, localPath)
    : join(docsRoot, localPath, "index.html");

  return { file, fragment };
}

const files = await walk(docsRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const errors = [];
let checkedLinks = 0;

for (const sourceFile of htmlFiles) {
  const html = await readFile(sourceFile, "utf8");
  const references = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)].map((match) => match[1]);

  for (const rawUrl of new Set(references)) {
    const target = localTarget(sourceFile, rawUrl);
    if (!target) continue;
    checkedLinks += 1;

    try {
      await access(target.file);
    } catch {
      errors.push(`${relative(docsRoot, sourceFile)} -> ${rawUrl} (missing ${relative(docsRoot, target.file)})`);
      continue;
    }

    if (target.fragment && target.file.endsWith(".html")) {
      const targetHtml = target.file === sourceFile ? html : await readFile(target.file, "utf8");
      const escapedFragment = target.fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      if (!new RegExp(`(?:id|name)="${escapedFragment}"`).test(targetHtml)) {
        errors.push(`${relative(docsRoot, sourceFile)} -> ${rawUrl} (missing anchor #${target.fragment})`);
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`Broken internal references (${errors.length}):\n${errors.join("\n")}`);
  process.exitCode = 1;
} else {
  console.log(`Checked ${checkedLinks} internal links, anchors and assets across ${htmlFiles.length} HTML files.`);
}
