const COMPANIES_HOUSE = "https://find-and-update.company-information.service.gov.uk";

export type CompanyMatch = {
  name: string;
  number: string;
  status: string;
  address: string;
  activity: string;
  confirmationDue: string;
  director: string;
};

export type CompanyLookup =
  | { state: "empty" }
  | { state: "available"; query: string }
  | { state: "registered"; query: string; company: CompanyMatch }
  | { state: "error"; query: string };

function decode(value: string) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&pound;/g, "£")
    .replace(/\s+/g, " ")
    .trim();
}

function between(text: string, start: string, endings: string[]) {
  const startAt = text.indexOf(start);
  if (startAt < 0) return "";
  const valueStart = startAt + start.length;
  const possibleEnds = endings
    .map((ending) => text.indexOf(ending, valueStart))
    .filter((position) => position >= 0);
  const valueEnd = possibleEnds.length ? Math.min(...possibleEnds) : text.length;
  return text.slice(valueStart, valueEnd).trim();
}

function parseSearchResults(html: string) {
  const companies: Array<{ name: string; number: string; status: string; address: string }> = [];
  const pattern = /<a[^>]+href="\/company\/([A-Z0-9]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]{0,600}?<p[^>]*>([\s\S]*?)<\/p>[\s\S]{0,600}?<p[^>]*>([\s\S]*?)<\/p>/gi;

  for (const match of html.matchAll(pattern)) {
    const name = decode(match[2]);
    const summary = decode(match[3]);
    const address = decode(match[4]);
    if (!name || !summary || !address) continue;
    companies.push({
      name,
      number: match[1],
      status: summary.replace(new RegExp(`^${match[1]}\\s*-?\\s*`, "i"), ""),
      address,
    });
    if (companies.length >= 20) break;
  }

  return companies;
}

async function getDetails(company: { name: string; number: string; status: string; address: string }): Promise<CompanyMatch> {
  const [profileResponse, officersResponse] = await Promise.all([
    fetch(`${COMPANIES_HOUSE}/company/${encodeURIComponent(company.number)}`, { cache: "no-store" }),
    fetch(`${COMPANIES_HOUSE}/company/${encodeURIComponent(company.number)}/officers`, { cache: "no-store" }),
  ]);

  const profileText = profileResponse.ok ? decode(await profileResponse.text()) : "";
  const officersHtml = officersResponse.ok ? await officersResponse.text() : "";
  const officerMatch = officersHtml.match(/<a[^>]+href="\/officers\/[^\"]+\/appointments"[^>]*>([\s\S]*?)<\/a>/i);
  const confirmationSection = between(profileText, "Confirmation statement", ["Nature of business (SIC)", "Tell us what you think"]);
  const dueMatch = confirmationSection.match(/due by\s+(\d{1,2}\s+[A-Za-z]+\s+\d{4})/i);
  const activitySection = between(profileText, "Nature of business (SIC)", ["Tell us what you think", "Is there anything wrong"]);
  const activityMatch = activitySection.match(/\d{5}\s*-\s*(.+)/);

  return {
    ...company,
    status: between(profileText, "Company status", ["Company type", "Incorporated on"]) || company.status,
    address: between(profileText, "Registered office address", ["Company status", "Company type"]) || company.address,
    activity: activityMatch?.[1]?.trim() || "Company information available",
    confirmationDue: dueMatch?.[1]?.trim() || "See the company profile",
    director: officerMatch ? decode(officerMatch[1]) : "See the company profile",
  };
}

export async function lookupCompany(rawQuery: string): Promise<CompanyLookup> {
  const query = rawQuery.trim().replace(/\s+/g, " ").slice(0, 160);
  if (!query) return { state: "empty" };

  try {
    const response = await fetch(
      `${COMPANIES_HOUSE}/search/companies?q=${encodeURIComponent(query)}`,
      { cache: "no-store" },
    );
    if (!response.ok) return { state: "error", query };

    const matches = parseSearchResults(await response.text());
    if (!matches.length) return { state: "available", query };

    const normalizedQuery = query.toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
    const relevantMatches = matches.filter((match) =>
      match.name.toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim().includes(normalizedQuery),
    );
    if (!relevantMatches.length) return { state: "available", query };

    const company = relevantMatches.find((match) => !/dissolved/i.test(match.status)) || relevantMatches[0];
    return { state: "registered", query, company: await getDetails(company) };
  } catch {
    return { state: "error", query };
  }
}
