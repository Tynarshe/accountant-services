import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://accountantservices.org.uk"),
  title: {
    default: "Accountant Services | Change and grow with confidence",
    template: "%s | Accountant Services",
  },
  description:
    "Straightforward company changes and ongoing finance support for ambitious UK businesses.",
  openGraph: {
    title: "Accountant Services | Business, made brilliantly simple",
    description:
      "Change and grow your UK business with expert-backed online support and human guidance.",
    type: "website",
    locale: "en_GB",
    siteName: "Accountant Services",
    images: [
      {
        url: "/og.png",
        width: 1728,
        height: 907,
        alt: "Accountant Services — Business, made brilliantly simple.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accountant Services | Business, made brilliantly simple",
    description:
      "Expert-backed company changes and finance support for UK businesses.",
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
