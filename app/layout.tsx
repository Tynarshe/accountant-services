import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://accountantservices.org.uk"),
  title: {
    default: "Accountant Services | Support shaped around your business",
    template: "%s | Accountant Services",
  },
  description:
    "Bookkeeping, payroll, year-end accounts, Corporation Tax and Self-Assessment tax returns for UK businesses and individuals.",
  openGraph: {
    title: "Accountant Services | Support shaped around your business",
    description:
      "Focused accounting and company services, combined around what your business needs.",
    type: "website",
    locale: "en_GB",
    siteName: "Accountant Services",
    images: [
      {
        url: "/og.png",
        width: 1728,
        height: 907,
        alt: "Accountant Services — support shaped around your business.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accountant Services | Support shaped around your business",
    description:
      "Bookkeeping, payroll, year-end accounts, Corporation Tax and Self-Assessment tax returns.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
