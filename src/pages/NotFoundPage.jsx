import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="container not-found-page page-spacing">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="404 not found"
      />
      <h2>Oops, page not found!</h2>
      <p>The page you are looking for is not available.</p>
      <Link to="/" className="btn">
        Go Back
      </Link>
    </section>
  );
}
