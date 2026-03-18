import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="container not-found-page page-spacing">
      <img src="/assets/error-404.png" alt="404 not found" />
      <h2>Oops, page not found!</h2>
      <p>The page you are looking for is not available.</p>
      <Link to="/" className="btn">
        Go Back
      </Link>
    </section>
  );
}
