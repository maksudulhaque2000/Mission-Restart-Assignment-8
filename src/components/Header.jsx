import { NavLink, Link } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Apps", path: "/apps" },
  { name: "Installation", path: "/installation" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo-wrap" aria-label="Hero IO Home">
          <img src="/assets/logo.png" alt="Hero IO Logo" className="logo-img" />
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active-link" : ""}`.trim()
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <a
          href="https://github.com/maksudulhaque2000"
          target="_blank"
          rel="noreferrer"
          className="btn btn-contribute"
        >
          Contribute
        </a>
      </div>
    </header>
  );
}
