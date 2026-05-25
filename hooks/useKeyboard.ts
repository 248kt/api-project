"use client";

import { useEffect, useCallback } from "react";

interface Shortcut {
  key: string;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
  ignoreInInput?: boolean;
}

export function useKeyboard(shortcuts: Shortcut[]) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const inInput = ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);

      for (const s of shortcuts) {
        if (s.ignoreInInput && inInput) continue;
        if (s.meta !== undefined && s.meta !== (e.metaKey || e.ctrlKey)) continue;
        if (s.shift !== undefined && s.shift !== e.shiftKey) continue;
        if (s.alt !== undefined && s.alt !== e.altKey) continue;
        if (e.key.toLowerCase() === s.key.toLowerCase()) {
          e.preventDefault();
          s.handler();
          return;
        }
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
