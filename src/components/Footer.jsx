export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/assets/logo.png" alt="Hero IO Logo" className="logo-img" />
        </div>

        <p>Copyright © 2025 - All right reserved</p>

        <div className="social-links" aria-label="Social links">
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
          >
            X
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            G
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          >
            F
          </a>
        </div>
      </div>
    </footer>
  );
}
