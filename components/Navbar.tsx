"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Keyboard, PlusCircle, ScrollText, GitCompareArrows } from "lucide-react";
import { useState, useCallback } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { KeyboardShortcutsModal } from "./KeyboardShortcutsModal";
import { useKeyboard } from "@/hooks/useKeyboard";

export function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  // Chord state for "g h" and "g a"
  const [gPressed, setGPressed] = useState(false);

  const triggerG = useCallback(() => {
    setGPressed(true);
    setTimeout(() => setGPressed(false), 1000);
  }, []);

  useKeyboard([
    {
      key: "g",
      handler: triggerG,
      ignoreInInput: true,
    },
    {
      key: "h",
      handler: () => { if (gPressed) { router.push("/"); setGPressed(false); } },
      ignoreInInput: true,
    },
    {
      key: "a",
      handler: () => { if (gPressed) { router.push("/ai-creator"); setGPressed(false); } },
      ignoreInInput: true,
    },
    {
      key: "s",
      handler: () => { if (gPressed) { router.push("/submit"); setGPressed(false); } },
      ignoreInInput: true,
    },
    {
      key: "c",
      handler: () => { if (gPressed) { router.push("/compare"); setGPressed(false); } },
      ignoreInInput: true,
    },
    {
      key: "t",
      handler: () => setTheme(theme === "apidark" ? "apilight" : "apidark"),
      ignoreInInput: true,
    },
    {
      key: "?",
      handler: () => setShortcutsOpen(true),
      ignoreInInput: true,
    },
  ]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-base-300 bg-base-100/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <span className="font-bold text-lg tracking-tight">API</span><span className="font-bold text-lg tracking-tight text-base-content/40">Yard</span>
          </Link>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <Link
              href="/changelog"
              className="btn btn-ghost btn-sm gap-1.5 text-base-content/60 hover:text-base-content hidden sm:inline-flex"
              title="Changelog"
            >
              <ScrollText size={14} />
              Changelog
            </Link>
            <Link
              href="/submit"
              className="btn btn-ghost btn-sm gap-1.5 text-base-content/60 hover:text-base-content hidden sm:inline-flex"
              title="Submit an API (g s)"
            >
              <PlusCircle size={14} />
              Submit API
            </Link>
            <Link
              href="/compare"
              className="btn btn-ghost btn-sm gap-1.5 text-base-content/60 hover:text-base-content hidden sm:inline-flex"
              title="Compare APIs (g c)"
            >
              <GitCompareArrows size={14} />
              Compare
            </Link>
            <Link
              href="/submit"
              className="btn btn-ghost btn-sm btn-square sm:hidden text-base-content/60"
              title="Submit an API"
              aria-label="Submit an API"
            >
              <PlusCircle size={16} />
            </Link>
            <Link
              href="/compare"
              className="btn btn-ghost btn-sm btn-square sm:hidden text-base-content/60"
              title="Compare APIs"
              aria-label="Compare APIs"
            >
              <GitCompareArrows size={16} />
            </Link>
            <button
              onClick={() => setShortcutsOpen(true)}
              className="btn btn-ghost btn-sm btn-square"
              title="Keyboard shortcuts (?)"
              aria-label="Keyboard shortcuts"
            >
              <Keyboard size={16} />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <KeyboardShortcutsModal
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </>
  );
}
