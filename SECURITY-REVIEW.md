# Local UI and security review

## Completed

- Mobile hero calls to action share a row at 320–540px with at least 48px target height.
- Restored the bottom-of-page pause/resume motion control at the user's request. Decorative motion no longer stops on a timer; OS reduced-motion preferences remain supported.
- Added a keyboard skip link, visible navigation focus outlines, and focus on the service selector when service selection is missing.
- Limited contact-field lengths and stripped newlines from email subjects. Quotation details remain URL-encoded and are not inserted as HTML. Requests still open an email draft; they are not sent automatically.
- Added a strict-origin-when-cross-origin referrer policy.
- Updated compatible dependencies, including Next, React, React DOM, React Server DOM, Vite and Cloudflare tooling. Build and 14 rendering tests pass; static export checks 775 internal links, anchors and assets.
- Production-only npm audit: zero reported vulnerabilities at the time of this review.

## Remaining security work

The full dependency audit reports 13 entries (9 high, 4 moderate), including inherited dependency findings, rooted in three development/build dependencies:

- `braces`: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
- `esbuild` through Drizzle tooling: https://github.com/advisories/GHSA-67mh-4wv8-2f99
- `image-size` through Vinext: https://github.com/advisories/GHSA-5p2g-fcmc-qvqq and https://github.com/advisories/GHSA-w3rx-r6r6-pgpr

npm proposes breaking framework/tooling changes for the remaining dependency chains. These were not force-applied. They need a separately tested migration, not a claim of a clean full audit. The preview is bound to loopback; do not expose it publicly or process untrusted build inputs.

GitHub Pages serves the exported static files, not the local development server. This lowers exposure to server-side tooling issues but is not proof of immunity. Hosting headers, third-party services, email delivery, legal wording, physical-device/browser coverage and penetration testing were not certified by this review. Removing the legal-page design note did not constitute a legal review.

Nothing was pushed or deployed as part of this review.
