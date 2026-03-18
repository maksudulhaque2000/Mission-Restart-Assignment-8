export default function PageLoader({ text = "Loading page" }) {
  return (
    <section className="loader-wrap" aria-live="polite" aria-busy="true">
      <div className="loader-ring" />
      <p>{text}</p>
    </section>
  );
}
