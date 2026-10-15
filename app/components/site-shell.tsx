import { MobileNav, QuotationLink, ServicesMenu } from "./interactive";
import { UpRightArrow } from "./arrow";
import { visibleServices } from "../lib/services";

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="Accountant Services home">
      <img className="logo-image" src="/accountant-services-logo.png" alt="Accountant Services Ltd." width={723} height={198} />
    </a>
  );
}

export function Header() {
  return (
    <>
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="utility-contact">
            <a href="tel:01182077207">0118 207 7207</a>
            <a href="mailto:office@accountantservices.org.uk">office@accountantservices.org.uk</a>
          </div>
          <div className="utility-social" aria-label="Social media">
            <a href="https://www.instagram.com/accountantservices_/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.tiktok.com/@accountantservices" target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            <ServicesMenu />
            <a href="/who-we-help">Who We Help</a>
            <a href="/blog">Blog</a>
            <QuotationLink className="header-quote-link">Get a quotation <UpRightArrow /></QuotationLink>
          </nav>
          <MobileNav />
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top page-shell">
        <div className="footer-intro">
          <Logo />
          <h2>Good business starts with clearer numbers.</h2>
          <p>Focused accounting and company support, tailored to what your business needs now.</p>
          <a className="footer-quote-link" href="/contact#quotation">Request a tailored quotation <UpRightArrow /></a>
        </div>
        <div className="footer-links">
          <div>
            <h3>Services</h3>
            {visibleServices.map((service) => <a key={service.slug} href={`/${service.slug}`}>{service.title}</a>)}
          </div>
          <div>
            <h3>Company</h3>
            <a href="/who-we-help">Who We Help</a>
            <a href="/additional-services">All services</a>
            <a href="/blog">Blog</a>
            <a href="/privacy-policy">Privacy</a>
          </div>
          <div>
            <h3>Talk to us</h3>
            <a href="tel:01182077207">0118 207 7207</a>
            <a href="mailto:office@accountantservices.org.uk">office@accountantservices.org.uk</a>
            <p>Building 220, Wharfedale Road<br />Wokingham, RG41 5TP</p>
          </div>
        </div>
      </div>
      <div className="footer-bottom page-shell">
        <p>© 2026 Accountant Services Ltd.</p>
        <div><a href="/privacy-policy">Privacy policy</a><a href="/terms-conditions">Terms & conditions</a></div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
