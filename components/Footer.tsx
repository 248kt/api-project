import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-base-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/40">
        <span>
          <span className="font-semibold text-base-content/70">API</span>
          <span className="font-semibold text-base-content/30">Yard</span>
          {" "}— browse, explore, and ship faster.
        </span>
        <div className="flex items-center gap-5">
          <Link href="/changelog" className="hover:text-base-content transition-colors">Changelog</Link>
          <Link href="/submit" className="hover:text-base-content transition-colors">Submit an API</Link>
          <span>© {new Date().getFullYear()} APIYard. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
