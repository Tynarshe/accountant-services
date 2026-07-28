import { MobileNav, Newsletter, ServicesMenu } from "./interactive";

export function Logo() {
  return (
    <a className="logo" href="/" aria-label="Accountant Services home">
      <span className="logo-mark" aria-hidden="true">A<span>.</span></span>
      <span className="logo-type">Accountant<br />Services</span>
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
            <a href="https://www.youtube.com/channel/UCahMS5YdXwK6caq8oL1s8Cw" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://www.tiktok.com/@accountantservices" target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Main navigation">
            <ServicesMenu />
            <a href="/blog">Blog</a>
            <a href="/shop">Shop</a>
            <a href="/contact">Contact Us</a>
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
          <p>One useful email each month. Practical updates, deadlines and ideas for UK business owners.</p>
          <Newsletter />
        </div>
        <div className="footer-links">
          <div>
            <h3>Start & run</h3>
            <a href="/ltd">Company formation</a>
            <a href="/confirmationstatement">Confirmation statement</a>
            <a href="/vatregistration">VAT registration</a>
            <a href="/book-keeping">Bookkeeping</a>
          </div>
          <div>
            <h3>Company</h3>
            <a href="/additional-services">All services</a>
            <a href="/blog">Blog</a>
            <a href="/shop">Shop</a>
            <a href="/contact">Contact</a>
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
