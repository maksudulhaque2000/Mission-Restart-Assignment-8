export default function SearchLoader() {
  return (
    <div className="search-loader" aria-live="polite" aria-busy="true">
      <span className="dot" />
      <span>Searching apps...</span>
    </div>
  );
}
