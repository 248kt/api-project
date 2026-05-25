export function Footer() {
  return (
    <footer className="border-t border-base-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/40">
        <span>
          <span className="font-semibold text-base-content/70">api</span>
          <span className="font-semibold text-base-content/30">vault</span>
          {" "}— browse, explore, and ship faster.
        </span>
        <span>Open source · MIT</span>
      </div>
    </footer>
  );
}
